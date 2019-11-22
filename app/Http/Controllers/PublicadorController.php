<?php


namespace App\Http\Controllers;


use App\Entity\Cliente;
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
            $dataCliente = $request->only(['direccionClient', 'email', 'estadoCliente', 'nombreClient', 'rucClient', 'rutaImagenClient']);
            $clienteDb = Cliente::find($dataCliente["rucClient"]);
            if (!isset($clienteDb)) {
                $cliente = new Cliente();
                $dataCliente["estadoCliente"] = 1;
                $cliente->fill($dataCliente)->save();
            } else {
                $cliente = new Cliente();
                $dataCliente["estadoCliente"] = 1;
                $cliente->fill($dataCliente)->update();
            }
            $documentoId = Documento::pluck('idDocumento')->last();
            $documento = new Documento();
            $data = $request->only(["numSerie", "fecEmisionDoc", 'estadoSunat', 'estadoWeb', 'tipoDoc', "tipoTransaccion", "total", "docPdf", "docXml", "docCdr", "rucClient", "monedaTransaccion"]);
            $documentoDb = Documento::where("numSerie", $data["numSerie"]);
            $data["idDocumento"] = $documentoId + 1;
            $data["estadoWeb"] = "P";
            $docPdf = $data["docPdf"];
            $docXML = $data["docXml"];
            $docCdr = $data["docCdr"];
            $fileName = $data["numSerie"];
            $filePdf = base64_decode($docPdf);
            $fileXml = base64_decode($docXML);
            $fileCdr = base64_decode($docCdr);
            $fechaEmision = explode("/", $data["fecEmisionDoc"]);
            $dateDirectory = join(DIRECTORY_SEPARATOR, array_reverse($fechaEmision));
            $directory = join(DIRECTORY_SEPARATOR, array($dateDirectory, $data["rucClient"]));
            Storage::makeDirectory($directory);
            $localPath = join(DIRECTORY_SEPARATOR, array($dateDirectory, $data["rucClient"], $fileName));
            Storage::disk('custom')->put($localPath . '.pdf', $filePdf);
            Storage::disk('custom')->put($localPath . '.xml', $fileXml);
            Storage::disk('custom')->put($localPath . '.zip', $fileCdr);
            $data["docPdf"] = $localPath . '.pdf';
            $data["docXml"] = $localPath . '.xml';
            $data["docCdr"] = $localPath . '.zip';
            if (!isset($documentoDb)) {
                $documento->fill($data)->save();
            } else {
                $documentoDb->fill($data)->update();
            }
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