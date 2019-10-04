<?php

namespace App\Http\Controllers;

use App\Entity\Documento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FilesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request)
    {
        $this->validate($request, [
            'primero' => 'required',
            'segundo' => 'required',
        ]);
        if ($request->hasFile('primero')) {
            $file = $request->file('primero');
//            $filename = $file->getClientOriginalName();
//            $extension = $file->getClientOriginalExtension();
//dd($check);
//            foreach ($request->photos as $photo) {
            $filename = $file->store('documentos');
//                ItemDetail::create([
//                    'item_id' => $items->id,
//                    'filename' => $filename
//                ]);
//            }
            echo "Upload Successfully";

//                $uploadedFile = $request->file('documento');
//                $filename = time() . $uploadedFile->getClientOriginalName();
//
//                Storage::disk('local')->putFileAs(
//                    'files/' . $filename,
//                    $uploadedFile,
//                    $filename
//                );
//                var_dump($uploadedFile->path());
//                $allElements = $request->all();
//                if ($request->hasFile('documento')) {
//                    if ($request->file('documento')->isValid()) {
//                        $path = $request->documento->store('documento');
//                        var_dump($path);
//                        return response()->json(array("message" => "El documento se subio supuestamente sin problemas."));
//                    } else {
//                        return response()->json(array("message" => "El documento no es valido"));
//                    }
//                } else {
//                    return response()->json(array("message", "Esto es porque no habia documento", "respuesta" => $allElements));
//                }
        }
    }

    public function downloadDocument(Request $request, $idDocumento)
    {
        $tipoDocumento = $request->tipo;
        $documento = Documento::find($idDocumento);
        switch ($tipoDocumento) {
            case "pdf":
                $docPath = $documento->docPdf;
                break;
            case "xml":
                $docPath = $documento->docXml;
                break;
            case "cdr":
                $docPath = $documento->docCdr;
                break;
            default:
                $docPath = $documento->docPdf;
                break;
        }
        $filePath = public_path() . "/" . $docPath;
        $name = basename($filePath);
        $headers = array('Content-Type' => mime_content_type($filePath));
        return response()->download($filePath, $name, $headers);
    }

    public function uploadFiles(Request $request)
    {
        $this->validate($request, [
            'primero' => 'required',
            'segundo' => 'required',
        ]);
        if ($request->hasFile('primero')) {
            $file = $request->file('primero');
//            $filename = $file->getClientOriginalName();
//            $extension = $file->getClientOriginalExtension();
//dd($check);
//            foreach ($request->photos as $photo) {
            $filename = $file->store('documentos');
//                ItemDetail::create([
//                    'item_id' => $items->id,
//                    'filename' => $filename
//                ]);
//            }
            echo "Upload Successfully";
        }
    }
}