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
        if ($request->hasFile('primero')) {

            $uploadedFile = $request->file('primero');
            $filename = time() . $uploadedFile->getClientOriginalName();

            Storage::disk('custom')->putFileAs(
                $filename,
                $uploadedFile,
                $filename
            );
            var_dump($uploadedFile->path());
            return response()->json(array("mensaje" => "Habia un elemento"), 200);
        }
        return response()->json(array("mensaje" => "NO habia datos"), 204);
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