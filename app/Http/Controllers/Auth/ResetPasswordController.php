<?php

namespace App\Http\Controllers\Auth;

use App\Entity\Usuario;
use App\Entity\UsuarioToken;
use App\Exceptions\GeneralAPIException;
use App\Http\Controllers\Controller;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\GmailMailerController;
use App\Http\Controllers\PHPMailerController;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Matriphe\Md5Hash\Md5Hash;

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
            if ($fechaActual < $tokenExpiration) {
                return response()->json(array("success" => true, "msg" => "El token es valido", "usuario" => $usuarioToken->usuario), 200);
            }
            return response()->json(array("success" => false, "msg" => "El token proporcionado ha expirado.", "fechaActual" => $fechaActual,
                "fechaExpiracion" => $tokenExpiration, "usuario" => $usuarioToken->usuario), 200);
        }
        return response()->json(array("success" => false, "msg" => "El token proporcionado no existe.", "usuario" => ""), 200);
    }

    public function changePassword(Request $request)
    {
        $newPassword = $request->newPassword;
        $token = $request->token;
        $usuarioToken = UsuarioToken::where("token", $token)->first();
        if ($usuarioToken) {
            $tokenExpiration = Carbon::createFromTimeString($usuarioToken->token_expiration);
            $fechaActual = Carbon::now();
            if ($fechaActual < $tokenExpiration) {
                $usuarioDb = Usuario::where([["email", "=", $usuarioToken->email], ["nombUsuario", "=", $usuarioToken->usuario]])->first();
                if (isset($usuarioDb)) {
                    $data = array();
                    if (isset($newPassword)) {
                        $hash = new Md5Hash();
                        $data["claveUsuario"] = $hash->make($newPassword);
                    }
                    $usuarioDb->fill($data)->update();
                    return response()->json(array("success" => true, "msg" => "Se ha cambiado la contraseña exitosamente."), 200);
                } else {
                    return response()->json(array("success" => false, "msg" => "No se encuentra el usuario con ese correo."), 200);
                }
            }
            return response()->json(array("success" => false, "msg" => "Su contraseña no se pudo cambiar. Recuerde que el token de cambio de contraseña solo está activo 24 horas."), 200);
        }
        return response()->json(array("success" => false, "msg" => "El token proporcionado no existe."), 200);
    }

    public function passwordReset(Request $request)
    {
        $email = $request->email;
        $usuario = Usuario::with("cliente")->where("email", $email)->orWhere("nombUsuario", $email)->first();
        if ($usuario) {
            try {
                $token = openssl_random_pseudo_bytes(64);
                $token = bin2hex($token);
                $email = $usuario->email;
                $userToken = new UsuarioToken();
                $userToken->token = $token;
                $userToken->email = $usuario->email;
                $userToken->usuario = $usuario->nombUsuario;
                $fechaActual = date_create();
                $fechaExpiracion = $fechaActual->modify("+1 day");
                $userToken->token_expiration = $fechaExpiracion;
                $userToken->save();
                $usePHPMailer = config('app.use_phpmailer');
                $useGmailApi = env("USE_GMAIL_API", false);
                //dd($usePHPMailer);
                if ($useGmailApi) {
                    $controller = new GmailMailerController();
                    $controller->sendEmailToUser($usuario, $userToken);
                } else if ($usePHPMailer) {
                    $emailController = new PHPMailerController();
                    $emailController->sendEmailToUser($usuario, $userToken);
                } else {
                    $emailController = new EmailController();
                    $emailController->sendEmailToUser($usuario, $userToken);
                }
            } catch (GeneralAPIException $e) {
                return response()->json(array("success" => false, "error" => $e->getMessage()), 200);
            } catch (Exception $e) {
                return response()->json(array("success" => false, "error" => $e->getMessage()), 200);
            }
            return response()->json(array("success" => true, "msg" => "Se ha enviado el correo con las instrucciones al correo " . $email), 200);
        } else {
            $isCorreo = filter_var($email, FILTER_VALIDATE_EMAIL);
            $mensaje = ($isCorreo ? "Correo" : "Usuario") . " no encontrado en el sistema.";
            return response()->json(array("success" => false, "error" => $mensaje), 404);
        }
    }
}
