<?php

namespace App\Http\Controllers;

use App\Entity\Documento;
use App\Entity\SystemJobs;
use App\Entity\Usuario;
use App\Entity\UsuarioToken;
use App\Exceptions\GeneralAPIException;
use App\Mail\DocumentoMail;
use App\Mail\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendEmail($idDocumento)
    {
        $documento = Documento::find($idDocumento);
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        try {
            Mail::to("ylopez@vsperu.com")->later(SystemJobs::addSecondsToQueue(), new DocumentoMail($documento, $userEmail));
            sleep(5);
            if (Mail::failures()) {
                return response()->json(array("message" => "No se ha enviado el correo, por favor intente de nuevo."));
            } else {
                return response()->json(array("message" => "Se ha enviado el correo exitosamente."));
            }
        } catch (\Exception $e) {
            $code = $e->getCode();
            if ($code == 552) {
                throw new GeneralAPIException("No se pudo enviar el correo porque el contenido es potencialmente dañino. Pongase en contacto con su administrador." . $e->getMessage());
            }
            throw new GeneralAPIException("No se pudo enviar el correo. Pongase en contacto con su administrador. " . $e->getMessage());
        }
    }

    public function sendEmailToUser(Usuario $usuario, UsuarioToken $usuarioToken)
    {
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        try {
            Mail::to($usuario->email)->later(SystemJobs::addSecondsToQueue(), new ResetPassword($usuario, $usuarioToken, $userEmail));
            sleep(5);
            if (Mail::failures()) {
                return response()->json(array("message" => "No se ha enviado el correo, por favor intente de nuevo."));
            } else {
                return response()->json(array("message" => "Se ha enviado el correo exitosamente."));
            }
        } catch (\Exception $e) {
            $mensaje = $e->getMessage();
            $code = $e->getCode();
            if ($code == 552) {
                throw new GeneralAPIException("No se pudo enviar el correo porque el contenido es potencialmente dañino. Pongase en contacto con su administrador.");
            }
            throw new GeneralAPIException("No se pudo enviar el correo. Pongase en contacto con su administrador." . $mensaje);
        }
    }
}
