<?php


namespace App\Http\Controllers;

use App\Entity\Cliente;
use App\Entity\Documento;
use App\Entity\Usuario;
use App\Exceptions\GeneralAPIException;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Matriphe\Md5Hash\Md5Hash;
use PDO;
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
        $serieNumero = "";
        try {
            $hasher = new Md5Hash();
            $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401);
            }
            $dataCliente = $request->only(['direccionClient', 'email', 'estadoCliente', 'nombreClient', 'rucClient', 'rutaImagenClient']);
            $datosCliente = array();
            foreach ($dataCliente as $key => $value) {
                $datosCliente[] = $key . "=>" . $value;
            }
            Log::info('Recibiendo los datos del cliente: [' . join(", ", $datosCliente) . "]");
            $clienteDb = Cliente::find($dataCliente["rucClient"]);
            if (!isset($clienteDb)) {
                $cliente = new Cliente();
                $dataCliente["estadoCliente"] = 1;
                $cliente->fill($dataCliente)->save();
                $this->registerUser($cliente, $dataCliente["rucClient"]);
                Log::info('Cliente registrado correctamente');
            } else {
                $dataCliente["estadoCliente"] = 1;
                $clienteDb->fill($dataCliente)->update();
            }
            $mensajeErrorAnexo = false;
            $documento = new Documento();
            $data = $request->only(["numSerie", "fecEmisionDoc", 'estadoSunat', 'estadoWeb', "correoSecundario", 'tipoDoc', "tipoTransaccion", "total", "docPdf",
                "docXml", "docCdr", "rucClient", "rsRuc", "monedaTransaccion", "emailEmisor", "serie"]);
            try {
                $timeData = $request->only(["start_at", "end_at"]);
                $data["start_at"] = Carbon::createFromFormat("H:i:s", $timeData["start_at"]);
                $data["end_at"] = Carbon::createFromFormat("H:i:s", $timeData["end_at"]);
            } catch (\Exception $e) {
                Log::error("No se encuentra el tiempo en el documento se creara con el tiempo actual.");
                Log::error($e->getMessage());
                $ahora = Carbon::now();
                $data["start_at"] = $ahora;
                $data["end_at"] = $ahora->addMinute();
            }
            $serieNumero = $data["numSerie"];
            $this->obtenerDatos($data);
            $data["idDocumento"] = $this->getLastIdFromTable();
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
                Log::error($mensajeErrorAnexo);
            }
            try {
                $fileXml = base64_decode($docXML);
            } catch (\Exception $e) {
                $mensajeErrorAnexo = "Error en el archivo XML" . $e->getMessage();
                Log::error($mensajeErrorAnexo);
            }
            try {
                $fileCdr = base64_decode($docCdr);
            } catch (\Exception $e) {
                $mensajeErrorAnexo = "Error en la Respuesta CDR." . $e->getMessage();
                Log::error($mensajeErrorAnexo);
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
            $datosDocumento = array();
            foreach ($data as $key => $value) {
                $datosDocumento[] = $key . "=>" . $value;
            }
            Log::info('Recibiendo los datos del documento: [' . join(", ", $datosDocumento) . "]");
            $documentoDb = Documento::where("numSerie", $data["numSerie"])->first();
            $token = openssl_random_pseudo_bytes(64);
            $token = bin2hex($token);
            Log::info('Guardando el formato impreso en: ' . $data["docPdf"]);
            Log::info('Guardando el XML del Documento en: ' . $data["docXml"]);
            Log::info('Guardando la Respuesta CDR en: ' . $data["docCdr"]);
            if ($documentoDb) {
                $data["idDocumento"] = $documentoDb->idDocumento;
                $data["token"] = $token;
                $documentoDb->fill($data)->update();
            } else {
                $data["token"] = $token;
                $documento->fill($data)->save();
            }
            Log::info('');
            $usePHPMailer = config('app.use_phpmailer');
            if ($usePHPMailer) {
                $documentoController = new PHPMailerController();
                return $documentoController->sendEmail($data["idDocumento"], false);
            } else {
                $documentoController = new EmailController();
                return $documentoController->sendEmail($data["idDocumento"], false);
            }
        } catch (\Exception $e) {
            Log::error($e->getTraceAsString());
            if ($e instanceof GeneralAPIException) {
                return response()->json(array("mensaje" => "Se registró existosamente el documento [" . $serieNumero . "] pero: " . $e->getMessage()), 201);
            }
            if ($e instanceof \Exception) {
                return response()->json(array("mensaje" => "No se pudo registar el documento [" . $serieNumero . "] por: " . $e->getMessage()), 201);
            }
            if (!$mensajeErrorAnexo) {
                return response()->json(array("mensaje" => "No se pudo registar el documento [" . $serieNumero . "] por: " . $mensajeErrorAnexo), 201);
            }
            return response()->json(array("mensaje" => $e->getCode(), "error" => $e->getMessage(), "archivo" => $e->getFile()), 500);
        }
    }

    public function publishOnly(Request $request)
    {
        $serieNumero = "";
        try {
            $hasher = new Md5Hash();
            $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401);
            }
            $dataCliente = $request->only(['direccionClient', 'email', 'estadoCliente', 'nombreClient', 'rucClient', 'rutaImagenClient']);
            $datosCliente = array();
            foreach ($dataCliente as $key => $value) {
                $datosCliente[] = $key . "=>" . $value;
            }
            Log::info('Recibiendo los datos del cliente: [' . join(", ", $datosCliente) . "]");
            $clienteDb = Cliente::find($dataCliente["rucClient"]);
            if (!isset($clienteDb)) {
                $cliente = new Cliente();
                $dataCliente["estadoCliente"] = 1;
                $cliente->fill($dataCliente)->save();
                Log::info('Cliente registrado correctamente');
            } else {
                $dataCliente["estadoCliente"] = 1;
                $clienteDb->fill($dataCliente)->update();
            }
            $mensajeErrorAnexo = false;
            $documento = new Documento();
            $data = $request->only(["numSerie", "fecEmisionDoc", 'estadoSunat', 'estadoWeb', "correoSecundario", 'tipoDoc', "tipoTransaccion", "total", "docPdf", "docXml", "docCdr", "rucClient", "rsRuc", "monedaTransaccion", "emailEmisor", "serie"]);
            $serieNumero = $data["numSerie"];
            $this->obtenerDatos($data);
            $data["idDocumento"] = $this->getLastIdFromTable();
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
                Log::error($mensajeErrorAnexo);
            }
            try {
                $fileXml = base64_decode($docXML);
            } catch (\Exception $e) {
                $mensajeErrorAnexo = "Error en el archivo XML" . $e->getMessage();
                Log::error($mensajeErrorAnexo);
            }
            try {
                $fileCdr = base64_decode($docCdr);
            } catch (\Exception $e) {
                $mensajeErrorAnexo = "Error en la Respuesta CDR." . $e->getMessage();
                Log::error($mensajeErrorAnexo);
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
            $datosDocumento = array();
            foreach ($data as $key => $value) {
                $datosDocumento[] = $key . "=>" . $value;
            }
            Log::info('Recibiendo los datos del documento: [' . join(", ", $datosDocumento) . "]");
            $documentoDb = Documento::where("numSerie", $data["numSerie"])->first();
            $token = openssl_random_pseudo_bytes(64);
            $token = bin2hex($token);
            Log::info('Guardando el formato impreso en: ' . $data["docPdf"]);
            Log::info('Guardando el XML del Documento en: ' . $data["docXml"]);
            Log::info('Guardando la Respuesta CDR en: ' . $data["docCdr"]);
            if ($documentoDb) {
                $data["idDocumento"] = $documentoDb->idDocumento;
                $data["token"] = $token;
                $documentoDb->fill($data)->update();
            } else {
                $data["token"] = $token;
                $documento->fill($data)->save();
            }
            Log::info('');
            return response()->json(array("mensaje" => "Se registró existosamente el documento [" . $serieNumero . "]"), 201);
        } catch (\Exception $e) {
            if ($e instanceof \Exception) {
                return response()->json(array("mensaje" => "Se registró existosamente el documento [" . $serieNumero . "] pero: " . $e->getMessage()), 201);
            }
            if (!$mensajeErrorAnexo) {
                return response()->json(array("mensaje" => "Se registró existosamente el documento [" . $serieNumero . "] pero: " . $mensajeErrorAnexo), 201);
            }
            return response()->json(array("error" => $e->getMessage()), 400);
        }
    }

    private function getLastIdFromTable()
    {
        if (env('DB_CONNECTION', 'mysql') == "pgsql") {
            $result = DB::select(DB::raw("select last_id_from_table(:tabla, :columna) as last_id_from_table"), [':tabla' => "fe_docelectronico", ':columna' => '"idDocumento"']);
        } else {
            $pdo = DB::connection()->getPdo();
            $pdo->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, TRUE);
            $result = DB::select(DB::raw("select last_id_from_table() as last_id_from_table"));
        }
        foreach ($result as $key => $item) {
            return $item->last_id_from_table;
        }
        return 0;
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

    private function obtenerDatos(array $data)
    {
        try {
            $client = new Client(['base_uri' => 'https://ruc-consulta.herokuapp.com', 'timeout' => 3.0]);
            $response = $client->request('POST', '/api/consultar', ['json' => $data]);
            $body = $response->getBody();
            return $body;
        } catch (\Exception $e) {
            return "";
        }
    }
}