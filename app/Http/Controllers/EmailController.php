<?php

namespace App\Http\Controllers;

use App\Entity\Documento;
use App\Entity\Usuario;
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
     * @return \Illuminate\Http\Response
     */
    public function sendEmail(Request $request, $idDocumento)
    {
        $documento = Documento::find($idDocumento);
//        $userEmail = env("MAIL_USERNAME","yosmellopez@gmail.com");
//        var_dump($userEmail);
//        $mailSender = env("MAIL_SENDER");
        try {
            Mail::to("ylopez@vsperu.com")->send(new DocumentoMail($documento));
            if (Mail::failures()) {
                return response()->json(array("message" => "No se ha enviado el correo, por favor intente de nuevo."));
            } else {
                return response()->json(array("message" => "Se ha enviado el correo exitosamente."));
            }
        } catch (\Exception $e) {
            $code = $e->getCode();
            if ($code == 552) {
                throw new GeneralAPIException("No se pudo enviar el correo porque el contenido es potencialmente dañino. Pongase en contacto con su administrador.");
            }
            throw new GeneralAPIException("No se pudo enviar el correo. Pongase en contacto con su administrador.");
        }
    }

    public function sendEmailToUser(Request $request, Usuario $usuario)
    {
//        $userEmail = env("MAIL_USERNAME","yosmellopez@gmail.com");
//        var_dump($userEmail);
//        $mailSender = env("MAIL_SENDER");
        try {
            Mail::to($usuario->email)->send(new ResetPassword($usuario));
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
