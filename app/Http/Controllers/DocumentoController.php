<?php


namespace App\Http\Controllers;


use App\Entity\Documento;
use Illuminate\Http\Request;

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
            $documentos = Documento::where('tipoDoc', $this->findTipoDoc($tipo))
                ->where("rucClient", $rucCliente)
                ->orderBy($order, $direction)
                ->orderBy("fecEmisionDoc", "desc")
                ->paginate($size);
            return response()->json($documentos, 200);
        } else {
            $documentos = Documento::where('tipoDoc', $this->findTipoDoc($tipo))
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
}