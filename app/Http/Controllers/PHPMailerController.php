<?php

namespace App\Http\Controllers;

use App\Entity\Documento;
use App\Entity\Usuario;
use App\Entity\UsuarioToken;
use App\Exceptions\GeneralAPIException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

class PHPMailerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws GeneralAPIException
     */
    public function sendEmail($idDocumento)
    {
        $documento = Documento::find($idDocumento);
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        $mail = new PHPMailer(true);
        try {
            $nombreCliente = $documento->cliente->nombreClient;
            $tipoDocumento = $this->findTipoDoc($documento->tipoDoc);
            $estadoDocumento = $this->findEstado($documento->estadoSunat);
            $numeroSerie = $documento->numSerie;
            $view = View::make('emails.documento', [
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
            $mail->setFrom($userEmail, config('app.name'));
            $mail->SMTPKeepAlive = true;
            $mail->Subject = $tipoDocumento . " [$numeroSerie] $estadoDocumento";
            $mail->MsgHTML($html);
            $mail->addAddress($documento->cliente->email);
            $mail->isSendmail();
            $prefixPath = Storage::disk("custom")->getDriver()->getAdapter()->getPathPrefix();
            $docPdf = join(DIRECTORY_SEPARATOR, array($prefixPath, $documento->docPdf));
            $docXml = join(DIRECTORY_SEPARATOR, array($prefixPath, $documento->docXml));
            $docCdr = join(DIRECTORY_SEPARATOR, array($prefixPath, $documento->docCdr));

            $mail->addAttachment($docPdf, $documento->numSerie . '.pdf', PHPMailer::ENCODING_BASE64, 'application/pdf');
            $mail->addAttachment($docXml, $documento->numSerie . '.xml', PHPMailer::ENCODING_BASE64, 'application/vnd.mozilla.xul+xml');
            $mail->addAttachment($docCdr, $documento->numSerie . '.zip', PHPMailer::ENCODING_BASE64, 'application/zip');
            $mail->send();
            return response()->json(array("message" => "Se ha enviado el correo exitosamente."));
        } catch (Exception $e) {
            dd($e);
        }
    }

    public function sendEmailToUser(Usuario $usuario, UsuarioToken $usuarioToken)
    {
        $userEmail = env("MAIL_USERNAME", "ylopez@vsperu.com");
        $mail = new PHPMailer(true);
        try {
            $cliente = $usuario->cliente;
            $view = View::make('emails.reset-password', [
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
            $mail->setFrom($userEmail, config('app.name'));
            $mail->SMTPKeepAlive = true;
            $mail->Subject = 'Reinicio de Contraseña';
            $mail->MsgHTML($html);
            $mail->addAddress($usuario->email);
            $mail->isSendmail();
        } catch (Exception $e) {
            throw $e;
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
//            case "03":
//                return "Resumen Boleta";
            default:
                return "01";
        }
    }

    private function findEstado($estado = "R")
    {
        switch ($estado) {
            case 'R':
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
