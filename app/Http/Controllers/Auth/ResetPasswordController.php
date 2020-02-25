<?php

namespace App\Http\Controllers\Auth;

use App\Entity\Usuario;
use App\Entity\UsuarioToken;
use App\Exceptions\GeneralAPIException;
use App\Http\Controllers\Controller;
use App\Http\Controllers\EmailController;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = '/home2';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function validateToken(Request $request)
    {
        $token = $request->token;
        $usuarioToken = UsuarioToken::where("token", $token)->first();
        if ($usuarioToken) {
            $tokenExpiration = date_create($usuarioToken->token_expiration);
            $fechaActual = date_create();
            if ($fechaActual > $tokenExpiration) {
                return response()->json(array("success" => true, "msg" => "El token es valido", "fechaActual" => $fechaActual, "fechaExpiracion" => $tokenExpiration), 200);
            }
            return response()->json(array("success" => false, "msg" => "El token proporcionado ha expirado."), 200);
        }
        return response()->json(array("success" => false, "msg" => "El token proporcionado no existe."), 200);
    }

    public function changePassword(Request $request)
    {
//        $user = $request->user();
////        var_dump($user);
//        $md5Hasher = new Md5Hash();
//        $newPassword = $request->newPassword;
//        $currentPassword = $request->currentPassword;
        return response()->json(array(), 200);
    }

    public function passwordReset(Request $request)
    {
        $email = $request->email;
        $usuario = Usuario::where("email", $email)->first();
        if ($usuario) {
            try {
                $token = openssl_random_pseudo_bytes(64);
                $token = bin2hex($token);
                $userToken = new UsuarioToken();
                $userToken->token = $token;
                $userToken->email = $email;
                $fechaActual = date_create();
                $fechaExpiracion = $fechaActual->modify("+3 day");
                $userToken->token_expiration = $fechaExpiracion;
                $userToken->save();
                $emailController = new EmailController();
                $emailController->sendEmailToUser($request, $usuario, $userToken);
            } catch (GeneralAPIException $e) {
                return response()->json(array("error" => $e->getMessage()), 200);
            } catch (Exception $e) {
                Artisan::call('migrate', array('--path' => 'database/migrations'));
            }
            return response()->json(array("correo" => $email), 200);
        } else {
            return response()->json(array("msg" => "Correo no encontrado en la base de datos.", "correo" => $email, "usuario" => $usuario), 404);
        }
    }
}
