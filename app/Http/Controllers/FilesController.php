<?php

namespace App\Http\Controllers;

use App\Entity\Documento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class FilesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(Request $request)
    {
        if ($request->hasFile('primero')) {

            $uploadedFile = $request->file('primero');
            $filename = time() . $uploadedFile->getClientOriginalName();
            $typeFilesystem = config("filesystems.default");
            Storage::disk($typeFilesystem)->putFileAs(
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
        $typeFilesystem = config("filesystems.default");
        $exists = Storage::disk($typeFilesystem)->exists($docPath);
        if ($exists) {
            return Storage::download($docPath, basename($docPath));
        } else {
            return response()->json(array("message" => "El documento no existe", "error" => basename($docPath)), 404);
        }
    }
}