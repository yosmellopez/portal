<?php

namespace App\Http\Controllers;

use App\Entity\Documento;
use App\Entity\Usuario;
use App\Entity\UsuarioToken;
use App\Exceptions\GeneralAPIException;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\View;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

class PHPMailerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws GeneralAPIException
     */
    public function sendEmail($idDocumento, $isFromView)
    {
        setlocale(LC_TIME, 'Spanish');
        $fechaActual = Carbon::now();
        $fechaActual = ucfirst($fechaActual->formatLocalized('%B, %Y'));
        $documento = Documento::find($idDocumento);
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        $mail = new PHPMailer(true);
        try {
            $nombreCliente = $documento->cliente->nombreClient;
            $tipoDocumento = $this->findTipoDoc($documento->tipoDoc);
            $estadoDocumento = $this->findEstado($documento->estadoSunat);
            $numeroSerie = $documento->numSerie;
            $view = View::make('phpmail.documento', [
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
            ]);
            $html = $view->render();

            $mail->isSMTP();
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
            $mail->CharSet = 'utf-8';
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Host = config('mail.host'); //gmail has host > smtp.gmail.com
            $mail->Port = config('mail.port'); //gmail has port > 587 . without double quotes
            $mail->Username = config('mail.username'); //your username. actually your email
            $mail->Password = config('mail.password'); // your password. your mail password
            $mail->setFrom($userEmail, config("app.mail_sender_name"));
            $mail->SMTPKeepAlive = true;
            $mail->Subject = $tipoDocumento . " [$numeroSerie] $estadoDocumento";
            $mail->MsgHTML($html);
            if (isset($documento->email)) {
                Log::info($documento->email);
                $correoCliente = $documento->email;
                $correos = preg_split("/([,;])/", $correoCliente);
                foreach ($correos as $email) {
                    $correoCliente = $email;
                    break;
                }
                $mail->addAddress($correoCliente);
            } else {
                Log::info($documento->cliente->email);
                $correoCliente = $documento->cliente->email;
                $correos = preg_split("/([,;])/", $correoCliente);
                foreach ($correos as $email) {
                    $correoCliente = $email;
                    break;
                }
                $mail->addAddress($correoCliente);
            }
            $emailEmisor = $documento->emailEmisor;
            if (!empty($emailEmisor)) {
                $mail->addCC(trim($emailEmisor));
            }
            $isEnvioCorreoProveedor = env("APP_ENVIO_CORREO_PROVEEDOR", false);
            if ($isEnvioCorreoProveedor) {
                $correoProvedor = trim(config("mail.username"));
                if (!empty($correoProvedor))
                    $mail->addCC($correoProvedor);
            }
            $emailSecundario = $documento->correoSecundario;
            if (!empty($emailSecundario)) {
                $correos = preg_split("/([,;])/", $emailSecundario);
                foreach ($correos as $correo) {
                    if (!empty($correo))
                        $mail->addCC(trim($correo));
                }
            }
            $appLogoPath = public_path() . config('app.logo');
            $appLogoCorreoPath = public_path() . config('app.logo_correo');
            $appOkPath = public_path() . '/content/images/okok.png';
            $appFacebookPath = public_path() . '/content/images/facebook2x.png';
            $appTwitterPath = public_path() . '/content/images/twitter2x.png';
            $appGooglePath = public_path() . '/content/images/googleplus2x.png';
            $mail->addEmbeddedImage($appLogoPath, "app-logo", "Logo Aplicacion");
            $mail->addEmbeddedImage($appLogoCorreoPath, "app-logo-correo", "Logo Correo Aplicacion");
            $mail->addEmbeddedImage($appOkPath, "app-ok", "Fondo Aplicacion");
            $mail->addEmbeddedImage($appFacebookPath, "facebook", "Facebook");
            $mail->addEmbeddedImage($appTwitterPath, "twitter", "Twitter");
            $mail->addEmbeddedImage($appGooglePath, "google", "Google");
            $typeFilesystem = config("filesystems.default");
            $prefixPath = Storage::disk($typeFilesystem)->getDriver()->getAdapter()->getPathPrefix();

            $docPdf = "";
            if ($documento->tipoTransaccion == 'E') {
                $docPdf = $prefixPath . $documento->docPdf;
            }
            $docXml = $prefixPath . $documento->docXml;
            $docCdr = $prefixPath . $documento->docCdr;
            if ($documento->tipoTransaccion == 'E') {
                $mail->addAttachment($docPdf, $documento->numSerie . '.pdf', PHPMailer::ENCODING_BASE64, 'application/pdf');
            }
            $mail->addAttachment($docXml, $documento->numSerie . '.xml', PHPMailer::ENCODING_BASE64, 'application/vnd.mozilla.xul+xml');
            $mail->addAttachment($docCdr, $documento->numSerie . '.zip', PHPMailer::ENCODING_BASE64, 'application/zip');
            $mail->isSendmail();
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
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        $mail = new PHPMailer(true);
        try {
            $cliente = $usuario->cliente;
            $view = View::make('phpmail.reset-password', [
                "nombreUsuario" => $usuario->nombUsuario,
                "usuarioToken" => $usuarioToken->token,
                "direccion" => $cliente->direccionClient
            ]);
            $html = $view->render();
            $mail->isSMTP();
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
            $mail->CharSet = 'utf-8';
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = config('mail.encryption');
            $mail->Host = config('mail.host'); //gmail has host > smtp.gmail.com
            $mail->Port = config('mail.port'); //gmail has port > 587 . without double quotes
            $mail->Username = config('mail.username'); //your username. actually your email
            $mail->Password = config('mail.password'); // your password. your mail password
            $mail->setFrom($userEmail, config("app.mail_sender_name"));
            $mail->SMTPKeepAlive = true;
            $mail->Subject = 'Reinicio de Contraseña de Usuario - ' . $usuario->nombUsuario;
            $mail->MsgHTML($html);
            $mail->addAddress($usuario->email);

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

            $mail->isSendmail();
            $mail->send();
            return response()->json(array("mensaje" => "Se ha enviado el correo exitosamente a: " . $userEmail));
        } catch (Exception $e) {
            return response()->json(array("error" => $e->errorMessage()), 500);
        }
    }

    public function sendRegisterEmail(Usuario $usuario, $password)
    {
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        $mail = new PHPMailer(true);
        try {
            $cliente = $usuario->cliente;
            $view = View::make('phpmail.user-register', [
                "nombreUsuario" => $usuario->nombUsuario,
                "password" => $password,
                "direccion" => $cliente->direccionClient,
            ]);
            $html = $view->render();
            $mail->isSMTP();
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
            $mail->CharSet = 'utf-8';
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = config('mail.encryption');
            $mail->Host = config('mail.host'); //gmail has host > smtp.gmail.com
            $mail->Port = config('mail.port'); //gmail has port > 587 . without double quotes
            $mail->Username = config('mail.username'); //your username. actually your email
            $mail->Password = config('mail.password'); // your password. your mail password
            $mail->setFrom($userEmail, config('app.mail_sender_name'));
            $mail->SMTPKeepAlive = true;
            $mail->Subject = config('app.name') . ' te ha enviado el registro de un nuevo usuario - ' . $usuario->nombUsuario;
            $mail->MsgHTML($html);
            $mail->addAddress($usuario->email);

            $appLogoPath = public_path() . config('app.logo');
            $appOkPath = public_path() . '/content/images/illo.png';
            $appFacebookPath = public_path() . '/content/images/facebook2x.png';
            $appTwitterPath = public_path() . '/content/images/twitter2x.png';
            $appGooglePath = public_path() . '/content/images/googleplus2x.png';
            $mail->addEmbeddedImage($appLogoPath, "logo-aplicacion", "Logo Aplicacion");
            $mail->addEmbeddedImage($appOkPath, "fondo-aplicacion", "Fondo Aplicacion");
            $mail->addEmbeddedImage($appFacebookPath, "facebook", "Facebook");
            $mail->addEmbeddedImage($appTwitterPath, "twitter", "Twitter");
            $mail->addEmbeddedImage($appGooglePath, "google", "Google");

            $mail->isSendmail();
            $mail->send();
            return response()->json(array("mensaje" => "Se ha enviado el correo exitosamente a: " . $userEmail));
        } catch (Exception $e) {
            return response()->json(array("error" => $e->errorMessage()), 500);
        }
    }

    public function sendRestorePasswordEmail(Usuario $usuario, $password)
    {
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        $mail = new PHPMailer(true);
        try {
            $nombreUsuario = $usuario->nombUsuario;
            $email = $usuario->email;
            $view = View::make('phpmail.restore-password', [
                "nombreUsuario" => $nombreUsuario,
                "password" => $password,
                "direccion" => config('app.name')
            ]);
            $html = $view->render();
            $mail->isSMTP();
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;
            $mail->CharSet = 'utf-8';
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = config('mail.encryption');
            $mail->Host = config('mail.host'); //gmail has host > smtp.gmail.com
            $mail->Port = config('mail.port'); //gmail has port > 587 . without double quotes
            $mail->Username = config('mail.username'); //your username. actually your email
            $mail->Password = config('mail.password'); // your password. your mail password
            $mail->setFrom($userEmail, config('app.mail_sender_name'));
            $mail->SMTPKeepAlive = true;
            $mail->Subject = 'Reinicio de Contraseña de Usuario - ' . $usuario->nombUsuario;
            $mail->MsgHTML($html);
            $mail->addAddress($email);

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

            $mail->isSendmail();
            $mail->send();
            return response()->json(array("mensaje" => "Se ha enviado el correo exitosamente a: " . $email));
        } catch (Exception $e) {
            return response()->json(array("error" => $e->errorMessage()), 500);
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
