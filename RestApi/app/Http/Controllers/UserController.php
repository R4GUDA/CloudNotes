<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'login' => 'required|unique:users|min:3|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);

        // Проверка всех введенных данных
        if($validator->fails()) {
            return response()->json([
                'error' => [
                    'code' => 422,
                    'message'=> 'Validation error',
                    'errors' => $validator->errors()
                ]
            ],422);
        }

//        // Проверка на занятость логина или email
//        if (User::where('login', $request->login)->OrWhere('email', $request->email)->first()) {
//            return response()->json([
//                'error' => [
//                    'code' => 422,
//
//                    'message' => 'Login or Email is already use'
//                ]
//            ], 422);
//        }
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
                'error' => [
                    'code' => 422,
                    'message'=> 'Validation error',
                    'errors' => $validator->errors()
                ]
            ],422);
        }

        //Проверка на имя пользователя
        if(!User::where('login', $request->login)->first()) {
            return response()->json([
                'error' => [
                    'code' => 401,
                    'errors' => ['login' => 'Incorrect login'],
                    'message' => 'Unauthorized'
                ]
            ],401);
        }

        // Проверка на правильность пароля
        if(!User::where('login', $request->login)->where('password',$request->password)->first()) {
            return response()->json([
                'error' => [
                    'code' => 401,
                    'errors' => ['password' => 'Incorrect password'],
                    'message' => 'Unauthorized'
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

    // check token for redirect
    public function checkToken(Request $request){
        if(User::where('token', $request->header('Authorization'))->first()) {
            return response()->json(['isCorrect' => true]);
        }
        else return response()->json(['isCorrect' => false]);
    }
}
