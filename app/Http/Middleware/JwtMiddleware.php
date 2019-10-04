<?php


namespace App\Http\Middleware;

use Closure;
use Exception;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JwtMiddleware extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof TokenInvalidException) {
                return response()->json(['status' => 'Token is Invalid',
                    "error" => "Su sesión ha expirado."], 401);
            } else if ($e instanceof TokenExpiredException) {
                return response()->json(['status' => 'Token is Expired',
                    "error" => "Su sesión ha expirado."], 401);
            } else {
                return response()->json(['status' => 'Authorization Token not found',
                    "error" => "El token de autorización no se ha encontrado."], 401);
            }
        }
        return $next($request);
    }
}