<?php


namespace App\Http\Controllers;


use App\Entity\Documento;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Storage;
use Matriphe\Md5Hash\Md5Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class PublicadorController extends Controller
{
    use AuthenticatesUsers;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function publicar(Request $request)
    {
//        $hasher = new Md5Hash();
//        $credentials = array("password" => $hasher->make($request->claveUsuario), "nombUsuario" => $request->nombUsuario);
//        if (!$token = JWTAuth::attempt($credentials)) {
//            return response()->json(['error' => 'credenciales_invalidas'], 401);
//        }
        try {
            $documento = new Documento();
            $data = $request->only(["numSerie", "fecEmisionDoc", 'estadoSunat', 'estadoWeb', 'tipoDoc', "tipoTransaccion", "total", "docPdf", "docXml", "docCdr", "rucClient", "monedaTransaccion"]);
            $docPdf = $data["docPdf"];
            $docXML = $data["docXml"];
            $docCdr = $data["docCdr"];
            $fileName = $data["numSerie"];
            $filePdf = base64_decode($docPdf);
            $fileXml = base64_decode($docXML);
            $fileCdr = base64_decode($docCdr);
            Storage::disk('custom')->put($fileName . '.pdf', $filePdf);
            Storage::disk('custom')->put($fileName . '.xml', $fileXml);
            Storage::disk('custom')->put($fileName . '.zip', $fileCdr);
            $documento->fill($data)->save();
        } catch (\Exception $e) {
            return response()->json(array("error" => $e->getMessage()), 201);
        }
        return response()->json(array("mensaje" => $data), 201);
    }

    public function username()
    {
        return 'nombUsuario';
    }
}