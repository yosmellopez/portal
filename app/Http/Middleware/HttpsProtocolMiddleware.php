<?php

namespace App\Http\Middleware;

use Closure;

class HttpsProtocolMiddleware
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
        if (config('app.use_https') == 'true') {
            if (!$request->secure() && app()->environment('prod')) {
                return redirect()->secure($request->getRequestUri());
            }
        }
        return $next($request);
    }
}