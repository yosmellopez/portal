<?php

namespace App\Http\Controllers;

use App\Entity\Documento;
use App\Exceptions\GeneralAPIException;
use App\Mail\DocumentoMail;
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

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public
    function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public
    function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public
    function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public
    function destroy($id)
    {
        //
    }
}
