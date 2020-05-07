<?php


namespace App\Http\Controllers;


use App\Entity\Cliente;
use App\Entity\Documento;
use App\Entity\Usuario;
use App\Exceptions\GeneralAPIException;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Matriphe\Md5Hash\Md5Hash;
use PHPMailer\PHPMailer\Exception;
use Tymon\JWTAuth\Facades\JWTAuth;

class PublicadorController extends Controller
{
    use AuthenticatesUsers;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function publicar(Request $request)
    {
        try {
            $hasher = new Md5Hash();
            $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401);
            }
            $mensajeCorreo = "";
            $dataCliente = $request->only(['direccionClient', 'email', 'estadoCliente', 'nombreClient', 'rucClient', 'rutaImagenClient']);
            $clienteDb = Cliente::find($dataCliente["rucClient"]);
            if (!isset($clienteDb)) {
                $cliente = new Cliente();
                $dataCliente["estadoCliente"] = 1;
                $cliente->fill($dataCliente)->save();
                $mensajeCorreo = $this->registerUser($cliente, $dataCliente["rucClient"]);
            } else {
                $dataCliente["estadoCliente"] = 1;
                $clienteDb->fill($dataCliente)->update();
            }
            $mensajeErrorAnexo = false;
            $documentoId = DB::table('fe_docelectronico')->max('idDocumento');
            $documento = new Documento();
            $data = $request->only(["numSerie", "fecEmisionDoc", 'estadoSunat', 'estadoWeb', "correoSecundario", 'tipoDoc', "tipoTransaccion", "total", "docPdf", "docXml", "docCdr", "rucClient", "monedaTransaccion", "emailEmisor", "serie"]);
            $data["idDocumento"] = $documentoId + 1;
            $data["estadoWeb"] = "P";
            $fechaEmisionDocumento = $data["fecEmisionDoc"];
            $data["fecEmisionDoc"] = Carbon::createFromFormat("d/m/Y", $data["fecEmisionDoc"]);
            $docPdf = $data["docPdf"];
            $docXML = $data["docXml"];
            $docCdr = $data["docCdr"];
            $fileName = $data["numSerie"];
            try {
                $filePdf = base64_decode($docPdf);
            } catch (\Exception $e) {
                $mensajeErrorAnexo = "Error en el documento Impreso" . $e->getMessage();
            }
            try {
                $fileXml = base64_decode($docXML);
            } catch (\Exception $e) {
                $mensajeErrorAnexo = "Error en el archivo XML" . $e->getMessage();
            }
            try {
                $fileCdr = base64_decode($docCdr);
            } catch (\Exception $e) {
                $mensajeErrorAnexo = "Error en la Respuesta CDR." . $e->getMessage();
            }
            $fechaEmision = explode("/", $fechaEmisionDocumento);
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
            $documentoDb = Documento::where("numSerie", $data["numSerie"])->first();
            $token = openssl_random_pseudo_bytes(64);
            $token = bin2hex($token);
            if ($documentoDb) {
                $data["idDocumento"] = $documentoDb->idDocumento;
                $data["token"] = $token;
                $documentoDb->fill($data)->update();
            } else {
                $data["token"] = $token;
                $documento->fill($data)->save();
            }
            $usePHPMailer = config('app.use_phpmailer');
            if ($usePHPMailer) {
                $documentoController = new PHPMailerController();
                $documentoController->sendEmail($data["idDocumento"]);
            } else {
                $documentoController = new EmailController();
                $documentoController->sendEmail($data["idDocumento"]);
            }
        } catch (\Exception $e) {
            if ($e instanceof GeneralAPIException) {
                return response()->json(array("mensaje" => "Se registró existosamente el documento [" . $data["numSerie"] . "] pero: " . $e->getMessage()), 201);
            }
            if ($e instanceof \Exception) {
                return response()->json(array("mensaje" => "Se registró existosamente el documento [" . $data["numSerie"] . "] pero: " . $e->getMessage()), 201);
            }
            if (!$mensajeErrorAnexo) {
                return response()->json(array("mensaje" => "Se registró existosamente el documento [" . $data["numSerie"] . "] pero: " . $mensajeErrorAnexo), 201);
            }
            return response()->json(array("error" => $e->getMessage()), 400);
        }
        return response()->json(array("mensaje" => "Documento [" . $data["numSerie"] . "] registrado correctamente. " . $mensajeCorreo), 201);
    }

    public function registerUser(Cliente $cliente, $rucClient)
    {
        $token = openssl_random_pseudo_bytes(8);
        $password = bin2hex($token);
        $hash = new Md5Hash();
        $claveUsuario = $hash->make($password);
        $usuarioId = DB::table('fe_usuario')->max('idUsuario');
        $usuario = new Usuario();
        $usuario->fill(["idUsuario" => $usuarioId + 1, "email" => $cliente->email, "nombUsuario" => $rucClient,
            "claveUsuario" => $claveUsuario, "estadoUsuario" => "1", "rucClient" => $rucClient, "idRoles" => 3])->save();
        try {
            $usePHPMailer = config('app.use_phpmailer');
            if ($usePHPMailer) {
                $documentoController = new PHPMailerController();
                $documentoController->sendRegisterEmail($usuario, $password);
            } else {
                $documentoController = new EmailController();
                $documentoController->sendRegisterEmail($usuario, $password);
            }
        } catch (GeneralAPIException $e) {
            return $e->getMessage();
        }
        return "Mensaje enviado correctamente.";
    }

    public function username()
    {
        return 'nombUsuario';
    }
}