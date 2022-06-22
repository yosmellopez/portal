<?php

namespace App\Http\Controllers;

use App\Entity\Documento;
use App\Entity\Usuario;
use App\Entity\UsuarioToken;
use App\Exceptions\GeneralAPIException;
use App\Libs\GmailAPI\Mailer;
use Carbon\Carbon;
use Dacastro4\LaravelGmail\Facade\LaravelGmail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\View;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

class GmailMailerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws GeneralAPIException
     */
    public function sendEmail($idDocumento, $isFromView)
    {
        $this->resolveTokenIfExpired();
        setlocale(LC_TIME, 'Spanish');
        $fechaActual = Carbon::now();
        $fechaActual = ucfirst($fechaActual->formatLocalized('%B, %Y'));
        $documento = Documento::find($idDocumento);
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        $mail = new Mailer();
        try {
            $nombreCliente = $documento->cliente->nombreClient;
            $tipoDocumento = $this->findTipoDoc($documento->tipoDoc);
            $estadoDocumento = $this->findEstado($documento->estadoSunat);
            $numeroSerie = $documento->numSerie;
            $dataArray = [
                "rucCliente" => $documento->rucClient,
                "nombreCliente" => $nombreCliente,
                "numSerie" => $numeroSerie,
                "docPdf" => $documento->docPdf,
                "docXml" => $documento->docXml,
                "docCdr" => $documento->docCdr,
                "total" => $documento->total,
                "moneda" => $documento->monedaTransaccion,
                "tipoDocumento" => $tipoDocumento,
                "serieNumero" => $numeroSerie,
                "fechaEmision" => $documento->fecEmisionDoc,
                "estadoDocumento" => $estadoDocumento,
                "fecha" => $fechaActual,
            ];
            $mail->view('phpmail.documento', $dataArray);
            $mail->from($userEmail, config("app.mail_sender_name"));
            $mail->subject($tipoDocumento . " [$numeroSerie] $estadoDocumento");
            if (isset($documento->email)) {
                Log::info($documento->email);
                $correoCliente = $documento->email;
                $correos = preg_split("/([,;])/", $correoCliente);
                foreach ($correos as $email) {
                    $correoCliente = $email;
                    break;
                }
                $mail->to($correoCliente);
            } else {
                Log::info($documento->cliente->email);
                $correoCliente = $documento->cliente->email;
                $correos = preg_split("/([,;])/", $correoCliente);
                foreach ($correos as $email) {
                    $correoCliente = $email;
                    break;
                }
                $mail->to($correoCliente);
            }
            $emailEmisor = $documento->emailEmisor;
            if (!empty($emailEmisor)) {
                $mail->cc(trim($emailEmisor));
            }
            $isEnvioCorreoProveedor = env("APP_ENVIO_CORREO_PROVEEDOR", false);
            if ($isEnvioCorreoProveedor) {
                $correoProvedor = trim(config("mail.username"));
                if (!empty($correoProvedor))
                    $mail->cc($correoProvedor);
            }
            $emailSecundario = $documento->correoSecundario;
            if (!empty($emailSecundario)) {
                $correos = preg_split("/([,;])/", $emailSecundario);
                foreach ($correos as $correo) {
                    if (!empty($correo))
                        $mail->cc(trim($correo));
                }
            }
            $appLogoPath = public_path() . config('app.logo');
            $appLogoCorreoPath = public_path() . config('app.logo_correo');
            $appOkPath = public_path() . '/content/images/okok.png';
            $appFacebookPath = public_path() . '/content/images/facebook2x.png';
            $appTwitterPath = public_path() . '/content/images/twitter2x.png';
            $appGooglePath = public_path() . '/content/images/googleplus2x.png';
            $mail->addEmbeddedImage($appLogoPath, "app-logo");
            $mail->addEmbeddedImage($appLogoCorreoPath, "app-logo-correo");
            $mail->addEmbeddedImage($appOkPath, "app-ok");
            $mail->addEmbeddedImage($appFacebookPath, "facebook");
            $mail->addEmbeddedImage($appTwitterPath, "twitter");
            $mail->addEmbeddedImage($appGooglePath, "google");
            $typeFilesystem = config("filesystems.default");
            $prefixPath = Storage::disk($typeFilesystem)->getDriver()->getAdapter()->getPathPrefix();

            $docPdf = "";
            if ($documento->tipoTransaccion == 'E') {
                $docPdf = $prefixPath . $documento->docPdf;
            }
            $docXml = $prefixPath . $documento->docXml;
            $docCdr = $prefixPath . $documento->docCdr;
            if ($documento->tipoTransaccion == 'E') {
                $mail->attach($docPdf, $documento->numSerie . '.pdf', PHPMailer::ENCODING_BASE64, 'application/pdf');
            }
            $mail->attach($docXml, $documento->numSerie . '.xml', PHPMailer::ENCODING_BASE64, 'application/vnd.mozilla.xul+xml');
            $mail->attach($docCdr, $documento->numSerie . '.zip', PHPMailer::ENCODING_BASE64, 'application/zip');
            $mail->send();

            $correosSecundarios = preg_split("/([,;])/", $emailSecundario);
            $correos = join(", ", $correosSecundarios);
            $mensajeSatisfactorio = "Se ha enviado el correo exitosamente al cliente: [" . $emailEmisor . ", " . $correoCliente . (empty($emailSecundario) ? "" : ", " . $correos) . "]";
            $mensaje = $isFromView ? $mensajeSatisfactorio : "Documento [" . $documento->numSerie . "] registrado correctamente. " . $mensajeSatisfactorio;
            return response()->json(array("mensaje" => $mensaje), 201);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            throw $e;
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw $e;
        }
    }

    public function sendEmailToUser(Usuario $usuario, UsuarioToken $usuarioToken)
    {
        $this->resolveTokenIfExpired();
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        $mail = new Mailer();
        try {
            $cliente = $usuario->cliente;
            $dataArray = [
                "nombreUsuario" => $usuario->nombUsuario,
                "usuarioToken" => $usuarioToken->token,
                "direccion" => $cliente->direccionClient
            ];
            $mail->view('phpmail.reset-password', $dataArray);
            $mail->from($userEmail, config("app.mail_sender_name"));
            $mail->subject('Reinicio de Contraseña de Usuario - ' . $usuario->nombUsuario);
            $mail->to($usuario->email);
            $appLogoPath = public_path() . config('app.logo');
            $appOkPath = public_path() . '/content/images/illo.png';
            $appFondoPath = public_path() . '/content/images/bg_password.gif';
            $appFacebookPath = public_path() . '/content/images/facebook2x.png';
            $appTwitterPath = public_path() . '/content/images/twitter2x.png';
            $appGooglePath = public_path() . '/content/images/googleplus2x.png';
            $mail->addEmbeddedImage($appLogoPath, "logo-aplicacion");
            $mail->addEmbeddedImage($appOkPath, "fondo-aplicacion");
            $mail->addEmbeddedImage($appFacebookPath, "facebook");
            $mail->addEmbeddedImage($appTwitterPath, "twitter");
            $mail->addEmbeddedImage($appGooglePath, "google");
            $mail->addEmbeddedImage($appFondoPath, "logo-fondo");
            $mail->send();
            return response()->json(array("mensaje" => "Se ha enviado el correo exitosamente a: " . $userEmail));
        } catch (Exception $e) {
            return response()->json(array("error" => $e->errorMessage()), 500);
        }
    }

    public function sendRegisterEmail(Usuario $usuario, $password)
    {
        $this->resolveTokenIfExpired();
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        $mail = new Mailer();
        try {
            $cliente = $usuario->cliente;
            $dataArray = [
                "nombreUsuario" => $usuario->nombUsuario,
                "password" => $password,
                "direccion" => $cliente->direccionClient,
            ];
            $mail->view('phpmail.user-register', $dataArray);
            $mail->from($userEmail, config('app.mail_sender_name'));
            $mail->subject(config('app.name') . ' te ha enviado el registro de un nuevo usuario - ' . $usuario->nombUsuario);
            $mail->to($usuario->email);
            $appLogoPath = public_path() . config('app.logo');
            $appOkPath = public_path() . '/content/images/illo.png';
            $appFacebookPath = public_path() . '/content/images/facebook2x.png';
            $appTwitterPath = public_path() . '/content/images/twitter2x.png';
            $appGooglePath = public_path() . '/content/images/googleplus2x.png';
            $mail->addEmbeddedImage($appLogoPath, "logo-aplicacion");
            $mail->addEmbeddedImage($appOkPath, "fondo-aplicacion");
            $mail->addEmbeddedImage($appFacebookPath, "facebook");
            $mail->addEmbeddedImage($appTwitterPath, "twitter");
            $mail->addEmbeddedImage($appGooglePath, "google");
            $mail->send();
            return response()->json(array("mensaje" => "Se ha enviado el correo exitosamente a: " . $userEmail));
        } catch (Exception $e) {
            return response()->json(array("error" => $e->errorMessage()), 500);
        }
    }

    public function sendRestorePasswordEmail(Usuario $usuario, $password)
    {
        $this->resolveTokenIfExpired();
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        $mail = new Mailer();
        try {
            $nombreUsuario = $usuario->nombUsuario;
            $email = $usuario->email;
            $dataArray = [
                "nombreUsuario" => $nombreUsuario,
                "password" => $password,
                "direccion" => config('app.name')
            ];
            $mail->from($userEmail, config('app.mail_sender_name'));
            $mail->subject('Reinicio de Contraseña de Usuario - ' . $usuario->nombUsuario);
            $mail->to($email);
            $mail->view('phpmail.restore-password', $dataArray);
            $appLogoPath = public_path() . config('app.logo');
            $appOkPath = public_path() . '/content/images/illo.png';
            $appFondoPath = public_path() . '/content/images/bg_password.gif';
            $appFacebookPath = public_path() . '/content/images/facebook2x.png';
            $appTwitterPath = public_path() . '/content/images/twitter2x.png';
            $appGooglePath = public_path() . '/content/images/googleplus2x.png';
            $mail->addEmbeddedImage($appLogoPath, "logo-aplicacion", "Logo Aplicacion");
            $mail->addEmbeddedImage($appOkPath, "fondo-aplicacion", "Fondo Aplicacion");
            $mail->addEmbeddedImage($appFacebookPath, "facebook", "Facebook");
            $mail->addEmbeddedImage($appTwitterPath, "twitter", "Twitter");
            $mail->addEmbeddedImage($appGooglePath, "google", "Google");
            $mail->addEmbeddedImage($appFondoPath, "logo-fondo", "Fondo Imagen");
            $mail->send();
            return response()->json(array("mensaje" => "Se ha enviado el correo exitosamente a: " . $email));
        } catch (Exception $e) {
            return response()->json(array("error" => $e->errorMessage()), 500);
        }
    }

    private function resolveTokenIfExpired()
    {
        $check = LaravelGmail::check();
        if (!$check) {
            $refreshToken = env("GOOGLE_REFRESH_TOKEN", "");
            LaravelGmail::fetchAccessTokenWithRefreshToken($refreshToken);
            $token = LaravelGmail::getAccessToken();
            LaravelGmail::setBothAccessToken($token);
        }
    }

    private function findTipoDoc($tipo = "factura")
    {
        switch ($tipo) {
            case "01":
                return "Factura de Venta";
            case "03":
                return "Boleta de Venta";
            case "07":
                return "Nota de Crédito";
            case "08":
                return "Nota de Débito";
            case "40":
                return "Comprobante Percepción";
            case "20":
                return "Comprobante Retencion";
            case "09":
                return "Guía Remisión";
            case "RC":
                return "Resumen Diario de Boleta";
            default:
                return "01";
        }
    }

    private function findEstado($estado = "R")
    {
        switch ($estado) {
            case 'R':
            case 'V':
                return 'Aprobado';
            case 'Z':
                return 'Rechazado';
            case 'D':
                return 'Pendiente Respuesta';
            case 'P':
                return 'Baja Aprobada';
            case 'J':
                return 'Baja Rechazada';
        }
    }
}
