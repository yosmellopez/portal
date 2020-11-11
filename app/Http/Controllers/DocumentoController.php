<?php


namespace App\Http\Controllers;


use App\Entity\Documento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PDO;
use Matriphe\Md5Hash\Md5Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class DocumentoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $usuario = auth()->user();
        $idRol = $usuario->idRoles;
        $rucCliente = $usuario->rucClient;
        $size = $request->size;
        $tipo = $request->tipo;
        $order = $request->sort;
        $direction = $request->direction;
        if ($idRol == 2 || $idRol == 3) {
            $documentos = Documento::with("cliente")
                ->where('tipoDoc', $this->findTipoDoc($tipo))
                ->where("rucClient", $rucCliente)
                ->orderBy($order, $direction)
                ->orderBy("fecEmisionDoc", "desc")
                ->paginate($size);
            return response()->json($documentos, 200);
        } else {
            $documentos = Documento::with("cliente")
                ->where('tipoDoc', $this->findTipoDoc($tipo))
                ->orderBy($order, $direction)
                ->orderBy("fecEmisionDoc", "desc")
                ->paginate($size);
            return response()->json($documentos, 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $documento = new Documento();
        $documento->estado_web = $request->name;
        $documento->save();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $documento = new Documento();
        $documento->estado_web = $request->name;
        $documento->save();
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
    public function destroy($id)
    {
        //
    }

    private function findTipoDoc($tipo = "factura")
    {
        switch ($tipo) {
            case "factura":
                return "01";
            case "boleta":
                return "03";
            case "nota-credito":
                return "07";
            case "nota-debito":
                return "08";
            case "comprobante-percepcion":
                return "40";
            case "comprobante-retencion":
                return "20";
            case "comunicacion-baja":
                return "01";
            case "guia-remision":
                return "09";
            case "resumen-boleta":
                return "RC";
            default:
                return "01";
        }
    }

    public function checkDocument(Request $request)
    {
        $hasher = new Md5Hash();
        $credentials = array("password" => $hasher->make($request->password), "nombUsuario" => $request->usuario);
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['success' => false, 'published' => false, 'message' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401);
        }
        $serie = $request->serie;
        $numero = $request->numero;
        $numSerie = $serie . '-' . $numero;
        $rucClient = $request->rucClient;
        $existDocument = Documento::where('numSerie', 'like', '%' . $numSerie . '%')->where('rucClient', $rucClient)->exists();
        if ($existDocument) {
            return response()->json(['success' => true, 'published' => true, 'message' => 'El documento existe.'], 200);
        } else {
            return response()->json(['success' => true, 'published' => false, 'message' => 'El documento no existe en el portal.'], 200);
        }
    }

    public function ejemplo()
    {
        if (env('DB_CONNECTION', 'pgsql') == "pgsql") {
            $result = DB::select(DB::raw("select last_id_from_table(:tabla, :columna) as last_id_from_table"), [':tabla' => "fe_docelectronico", ':columna' => '"idDocumento"']);
        } else {
            $pdo = DB::connection()->getPdo();
            $pdo->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, TRUE);
            $result = DB::select(DB::raw("select last_id_from_table() as last_id_from_table"));
        }
        foreach ($result as $key => $item) {
            return response()->json(array("ultimoValor" => $item->last_id_from_table), 200);
        }
        return response()->json(array("ultimoValor" => 0), 200);
    }

    public function createSequenceStore()
    {
        try {
            if (env('DB_CONNECTION', 'mysql') == "pgsql") {
                $procedure = "CREATE OR REPLACE FUNCTION last_id_from_table(tabla VARCHAR, column_id VARCHAR)
                    RETURNS INTEGER AS
                        \$BODY\$
                        DECLARE
                            ultimo_id INTEGER := 0;
                            last_pkey INTEGER := 0;
                        BEGIN
                            SELECT valor INTO ultimo_id FROM fe_sequence WHERE sequence = tabla;
                            IF ultimo_id IS NULL THEN
                                EXECUTE format('SELECT max(%s) FROM %s', column_id,tabla) INTO last_pkey;
                                IF last_pkey IS NULL THEN
                                    ultimo_id = 1;
                                ELSE
                                    ultimo_id = last_pkey + 1;
                                END IF;
                                INSERT INTO fe_sequence VALUES (tabla, ultimo_id);
                            ELSE
                                    ultimo_id = ultimo_id + 1;
                                UPDATE fe_sequence SET valor = ultimo_id WHERE sequence = tabla;
                            END IF;
                            RETURN ultimo_id;
                        END ;
                        \$BODY\$
                        LANGUAGE plpgsql VOLATILE COST 100;";
                DB::unprepared($procedure);
            }
            if (env('DB_CONNECTION', 'mysql') == "mysql") {
//                $mysql_version_check = DB::select(DB::raw('SHOW VARIABLES LIKE "version";'));
//                $mysql_version = $mysql_version_check[0]->Value;
//                if (substr($mysql_version, 2, 1) < '7' and substr($mysql_version, 4, 1) < '6') {
                $procedure = "
                        CREATE FUNCTION `last_id_from_table`()
                        RETURNS BIGINT
                        no sql deterministic
                        BEGIN
                        DECLARE `ultimo_id` BIGINT;
                        DECLARE `last_pkey` BIGINT;
                        SET `ultimo_id` = 0;
                        SET `last_pkey` = 0;
                        SELECT valor INTO `ultimo_id` FROM fe_sequence WHERE sequence = 'fe_docelectronico';
                        IF ultimo_id <> 0 THEN
                            SET `ultimo_id` = `ultimo_id` + 1;
                            UPDATE fe_sequence SET valor = `ultimo_id` WHERE sequence = 'fe_docelectronico';
                        ELSE
                            SELECT max(`idDocumento`) INTO last_pkey FROM fe_docelectronico;
                            IF last_pkey <> 0 THEN
                                SET `ultimo_id` = `last_pkey` + 1;
                            ELSE
                                SET `ultimo_id` = 1;
                            END IF;
                            INSERT INTO fe_sequence(sequence, valor) VALUES ('fe_docelectronico', `ultimo_id`);
                        END IF;
                        RETURN `ultimo_id`;
                        END";
//                } else {
//                    DB::unprepared("SET GLOBAL log_bin_trust_function_creators = 1;");
//                    DB::unprepared("DROP FUNCTION IF EXISTS last_id_from_table");
//                    $procedure = "CREATE FUNCTION last_id_from_table() RETURNS BIGINT
//                    BEGIN
//                        DECLARE `ultimo_id` BIGINT;
//                        DECLARE `last_pkey` BIGINT;
//                        SET `ultimo_id` = 0;
//                        SET `last_pkey` = 0;
//                        SELECT valor INTO `ultimo_id` FROM fe_sequence WHERE sequence = 'fe_docelectronico';
//                        IF ultimo_id <> 0 THEN
//                            SET `ultimo_id` = `ultimo_id` + 1;
//                            UPDATE fe_sequence SET valor = `ultimo_id` WHERE sequence = 'fe_docelectronico';
//                        ELSE
//                            SELECT max(`idDocumento`) INTO last_pkey FROM fe_docelectronico;
//                            IF last_pkey <> 0 THEN
//                                SET `ultimo_id` = `last_pkey` + 1;
//                            ELSE
//                                SET `ultimo_id` = 1;
//                            END IF;
//                            INSERT INTO fe_sequence(sequence, valor) VALUES ('fe_docelectronico', `ultimo_id`);
//                        END IF;
//                        RETURN `ultimo_id`;
//                    END;";
//                }
                DB::unprepared($procedure);
                return response()->json(array("message" => "Se ha creado el store exitosamente"), 200);
            }
        } catch (\Exception $exception) {
            return response()->json(array("message" => "Hubo un problema al crear el store " . $exception->getMessage()), 200);
        }
    }

    public function clearSequenceStore()
    {
        $procedure = "DELETE FROM fe_sequence";
        DB::unprepared($procedure);
        return response()->json(array("message" => "Vaceo de secuencia ejecutada correctamente"), 200);
    }

    public function resizeColumn(Request $request)
    {
        $table = $request->table;
        $column = $request->column;
        $size = $request->size;
        $query = "ALTER TABLE $table MODIFY $column VARCHAR($size)";
        DB::unprepared($query);
        return response()->json(array("message" => "Se ha cambiado el tamaño de la columna correctamente"), 200);
    }
}