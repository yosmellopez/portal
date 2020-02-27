<?php

namespace App\Http\Controllers\Auth;

use App\Entity\Usuario;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Matriphe\Md5Hash\Md5Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */


    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    public function login(Request $request)
    {
        $hasher = new Md5Hash();
        $credentials = array("password" => $hasher->make($request->claveUsuario), "nombUsuario" => $request->nombUsuario);
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'credenciales_invalidas'], 401);
        }
        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 360,
            'user' => auth()->user(),
        ], 200, array("Authorization" => $token));
    }

    public function getAuthenticatedUser()
    {
        try {
            Artisan::call('migrate', array('--path' => 'database/migrations'));
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
            $user = Usuario::with("rol")->find($user->idUsuario);
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], 401);
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], 401);
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], 401);
        }
        return response()->json($user);
    }

    public function username()
    {
        return 'nombUsuario';
    }
}
