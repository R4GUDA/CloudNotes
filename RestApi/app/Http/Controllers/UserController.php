<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'login' => 'required|max:255',
            'email' => 'required|unique:users',
            'password' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json([
                'data' => [
                    'error'=> 'Неверно введены данные'
                ]
            ],401);
        }
        User::create($request->all());
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'login' => 'required',
            'password' => 'required'
        ]);

        // Проверка на корректность введения данных
        if($validator->fails()) {
            return response()->json([
                'data' => [
                    'error'=> 'Неверно введены данные'
                ]
            ],401);
        }

        //Проверка на имя пользователя
        if(!User::where('login', $request->login)->first()) {
            return response()->json([
                'data' => [
                    'error' => 'Пользователь не найден'
                ]
            ],401);
        }

        // Проверка на правильность пароля
        if(!User::where('login', $request->login)->where('password',$request->password)->first()) {
            return response()->json([
                'data' => [
                    'error' => 'Пароль неверный'
                ]
            ],401);
        }

        //Генерация токена, отправка клиенту и сохранение
        $token = Str::random(16);

        $user = User::where('login', $request->login)->first();
        $user->token = $token;
        $user->save();
        return response()->json([
            'data' => [
                'token' => $token
            ]
        ]);
    }
}
