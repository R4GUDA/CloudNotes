<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TokenComparisonMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(!User::where('token', $request->header('token'))->first())
            return response()->json([
                'errors' => [
                    'error' => 'Unauthorized',
                ]
            ],401);
        Auth::login(User::where('token', $request->header('token'))->first());
        return $next($request);
    }
}
