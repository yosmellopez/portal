<?php

namespace App\Http\Controllers;

use App\Entity\Documento;
use App\Entity\Usuario;
use App\Entity\UsuarioToken;
use App\Exceptions\GeneralAPIException;
use App\Libs\GmailAPI\Mailer;
use App\Mail\DocumentoMail;
use App\Mail\RegisterUser;
use App\Mail\ResetPassword;
use App\Mail\RestorePassword;
use Carbon\Carbon;
use Dacastro4\LaravelGmail\Facade\LaravelGmail;
use Illuminate\Support\Facades\Mail;
use PHPMailer\PHPMailer\Exception;
use Swift_Message;

class EmailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws GeneralAPIException
     */
    public function sendEmail($idDocumento, $isFromView)
    {
        $usePHPMailer = config('app.use_phpmailer');
        $useGmailApi = env("USE_GMAIL_API", false);
        //dd($usePHPMailer);
        if ($useGmailApi) {
            $controller = new GmailMailerController();
            return $controller->sendEmail($idDocumento, $isFromView);
        } else if ($usePHPMailer) {
            $documentoController = new PHPMailerController();
            return $documentoController->sendEmail($idDocumento, $isFromView);
        } else {
            $documento = Documento::find($idDocumento);
            $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
            try {
                $emailEmisor = $documento->emailEmisor;
                $emailSecundario = $documento->correoSecundario;
                if (isset($documento->email)) {
                    $correo = $documento->email;
                } else {
                    $correo = $documento->cliente->email;
                }
                $correos = preg_split("/([,;])/", $correo);
                foreach ($correos as $email) {
                    $correo = $email;
                    break;
                }
                Mail::to($correo)->send(new DocumentoMail($documento, $userEmail));
                if (Mail::failures()) {
                    $mensaje = $isFromView ? "No se pudo enviar el correo al destinatario" : "Documento [" . $documento->numSerie . "] registrado correctamente. Pero no se pudo enviar el correo al cliente, por favor intente de nuevo.";
                    return response()->json(array("mensaje" => $mensaje), 201);
                } else {
                    $correosSecundarios = explode(',', $emailSecundario);
                    $correos = join("\n", $correosSecundarios);
                    $mensajeSatisfactorio = "Se ha enviado el correo exitosamente al cliente: [" . $emailEmisor . ", " . $correo . (empty($emailSecundario) ? "" : ", " . $correos) . "]";
                    $mensaje = $isFromView ? $mensajeSatisfactorio : "Documento [" . $documento->numSerie . "] registrado correctamente. " . $mensajeSatisfactorio;
                    return response()->json(array("mensaje" => $mensaje), 201);
                }
            } catch (\Exception $e) {
                $code = $e->getCode();
                if ($code == 552) {
                    throw new GeneralAPIException("No se pudo enviar el correo porque el contenido es potencialmente dañino. Por favor comuníquese con su administrador de sistemas." . $e->getMessage());
                }
                throw new GeneralAPIException("No se pudo enviar el correo. Por favor comuníquese con su administrador de sistemas. " . $e->getMessage());
            }
        }
    }

    public function sendEmailToUser(Usuario $usuario, UsuarioToken $usuarioToken)
    {
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        try {
            Mail::to($usuario->email)->send(new ResetPassword($usuario, $usuarioToken, $userEmail));
            if (Mail::failures()) {
                return response()->json(array("mensaje" => "No se ha enviado el correo, por favor intente de nuevo."));
            } else {
                return response()->json(array("mensaje" => "Se ha enviado el correo exitosamente."));
            }
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
            $code = $e->getCode();
            if ($code == 552) {
                throw new GeneralAPIException("No se pudo enviar el correo porque el contenido es potencialmente dañino. Póngase en contacto con su administrador.");
            }
            throw new GeneralAPIException("No se pudo enviar el correo. Por favor comuníquese con su administrador de sistemas." . $mensaje);
        }
    }

    public function sendRegisterEmail(Usuario $usuario, $password)
    {
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        try {
            Mail::to($usuario->email)->send(new RegisterUser($usuario, $userEmail, $password));
            if (Mail::failures()) {
                return response()->json(array("mensaje" => "No se ha enviado el correo, por favor intente de nuevo."));
            } else {
                return response()->json(array("mensaje" => "Se ha enviado el correo exitosamente."));
            }
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
            $code = $e->getCode();
            if ($code == 552) {
                throw new GeneralAPIException("No se pudo enviar el correo porque el contenido es potencialmente dañino. Póngase en contacto con su administrador.");
            }
            throw new GeneralAPIException("No se pudo enviar el correo. Por favor comuníquese con su administrador de sistemas." . $mensaje);
        }
    }

    public function sendRestorePasswordEmail(Usuario $usuario, $password)
    {
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        try {
            Mail::to($usuario->email)->send(new RestorePassword($usuario, $userEmail, $password));
            if (Mail::failures()) {
                return response()->json(array("mensaje" => "No se ha enviado el correo, por favor intente de nuevo."));
            } else {
                return response()->json(array("mensaje" => "Se ha enviado el correo exitosamente."));
            }
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
            $code = $e->getCode();
            if ($code == 552) {
                throw new GeneralAPIException("No se pudo enviar el correo porque el contenido es potencialmente dañino. Póngase en contacto con su administrador.");
            }
            throw new GeneralAPIException("No se pudo enviar el correo. Por favor comuníquese con su administrador de sistemas." . $mensaje);
        }
    }

    public function sendGmailEmail()
    {
        $check = LaravelGmail::check();
        if (!$check) {
            LaravelGmail::fetchAccessTokenWithRefreshToken("1//0417MeZearVLiCgYIARAAGAQSNwF-L9IrKkW6qgDL8ZOXafs3jgpdEJjxLbhbE8evqObtoVnqEBF6PAYWLwP-ZyenHy1W9zhlN4U");
            $token = LaravelGmail::getAccessToken();
            LaravelGmail::setBothAccessToken($token);
        }
        $dataArray = [
            "rucCliente" => "10160208541",
            "nombreCliente" => "Yosmel Lopez Pimentel",
            "numSerie" => "F22-12345678",
            "docPdf" => "",
            "docXml" => "",
            "docCdr" => "",
            "total" => "1000",
            "moneda" => "Soles",
            "tipoDocumento" => "Boleta De Venta",
            "serieNumero" => "F22-86872345",
            "fechaEmision" => "25/05/2022",
            "estadoDocumento" => "Publicado",
            "fecha" => Carbon::now(),
        ];
        $mail = new Mailer();
        $mail->to("yosmellopez@gmail.com", $name = null);
        $mail->from("yosmellopez@gmail.com", $name = null);
        $mail->view('phpmail.documento', $dataArray);
        $appLogoPath = public_path() . config('app.logo');
        $appLogoCorreoPath = public_path() . config('app.logo_correo');
        $appOkPath = public_path() . '/content/images/okok.gif';
        $appFacebookPath = public_path() . '/content/images/facebook2x.png';
        $appTwitterPath = public_path() . '/content/images/twitter2x.png';
        $appGooglePath = public_path() . '/content/images/googleplus2x.png';
        $mail->addEmbeddedImage($appLogoPath, "app-logo");
//        $mail->addEmbeddedImage($appLogoCorreoPath, "app-logo-correo");
//        $mail->addEmbeddedImage($appOkPath, "app-ok");
        $mail->addEmbeddedImage($appFacebookPath, "facebook");
        $mail->addEmbeddedImage($appTwitterPath, "twitter");
        $mail->addEmbeddedImage($appGooglePath, "google");
        $mail->subject("Prueba de Gmail con Laravel");
        $mail->send();
    }
}
