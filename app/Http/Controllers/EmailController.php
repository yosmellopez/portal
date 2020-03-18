<?php

namespace App\Http\Controllers;

use App\Entity\Documento;
use App\Entity\SystemJobs;
use App\Entity\Usuario;
use App\Entity\UsuarioToken;
use App\Exceptions\GeneralAPIException;
use App\Mail\DocumentoMail;
use App\Mail\RegisterUser;
use App\Mail\ResetPassword;
use App\Mail\RestorePassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws GeneralAPIException
     */
    public function sendEmail($idDocumento)
    {
        $usePHPMailer = config('app.use_phpmailer');
        if ($usePHPMailer) {
            $documentoController = new PHPMailerController();
            return $documentoController->sendEmail($idDocumento);
        } else {
            $documento = Documento::find($idDocumento);
            $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
            try {
                $correo = $documento->cliente->email;
                Mail::to($correo)->send(new DocumentoMail($documento, $userEmail));
                if (Mail::failures()) {
                    return response()->json(array("message" => "No se ha enviado el correo, por favor intente de nuevo."));
                } else {
                    return response()->json(array("message" => "Se ha enviado el correo exitosamente."));
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
                return response()->json(array("message" => "No se ha enviado el correo, por favor intente de nuevo."));
            } else {
                return response()->json(array("message" => "Se ha enviado el correo exitosamente."));
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
                return response()->json(array("message" => "No se ha enviado el correo, por favor intente de nuevo."));
            } else {
                return response()->json(array("message" => "Se ha enviado el correo exitosamente."));
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
                return response()->json(array("message" => "No se ha enviado el correo, por favor intente de nuevo."));
            } else {
                return response()->json(array("message" => "Se ha enviado el correo exitosamente."));
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
}
