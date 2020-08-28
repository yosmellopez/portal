<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param \Exception $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Exception $exception
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof TokenExpiredException) {
            return response()->json(['error' => 'token is expired'], 400);
        } elseif ($exception instanceof TokenInvalidException) {
            return response()->json(['error' => 'token is invalid'], 400);
        } elseif ($exception instanceof JWTException) {
            return response()->json(['error' => 'token absent'], 400);
        }
        if ($exception instanceof ModelNotFoundException) {
            return response()->json(['error' => 'Entry for ' . str_replace('App\\', '', $exception->getModel()) . ' not found'], 404);
        } else if ($exception instanceof GeneralAPIException) {
            return response()->json(['error' => $exception->getMessage()], 500);
        } else if ($exception instanceof \HttpRequestException) {
            return response()->json(['error' => 'External API call failed.'], 500);
        } else if ($exception instanceof QueryException) {
            $message = $this->translateDatabaseError($exception);
            return response()->json(['error' => $exception->getMessage(), 'message' => $message], 500);
        }
        return parent::render($request, $exception);
    }

    private function translateDatabaseError(QueryException $exception)
    {
        $message = $exception->getMessage();
        if (strpos($message, "fe_cliente") !== false && strpos($message, "PRIMARY") !== false) {
            $indexStart = strrpos($message, 'Duplicate entry', -5);
            $indexEnd = strrpos($message, 'for key', -5);
            $ruc = substr($message, $indexStart + 17, $indexEnd - 73);
            return "Ya existe un cliente con el RUC: " . $ruc;
        } else if (strpos($message, "fe_usuario") !== false && strpos($message, "PRIMARY") !== false) {
            return "Ya existe un usuario con el nombre de usuario";
        }
        return $exception->getMessage();
    }
}
