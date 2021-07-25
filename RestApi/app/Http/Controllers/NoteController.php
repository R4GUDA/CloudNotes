<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NoteController extends Controller
{

    public function store(Request $request) {
        //Получение id из токена
        $userId = User::where('token', $request->token)->first()->id;

        //Валидатор заголовка
        $titleValidator = Validator::make($request->all(),[
            'title' => 'required'
        ]);

        //Провал валидатора
        if ($titleValidator->fails()) {
            return response()->json([
                'data' => [
                    'error' => 'Необходимо ввести заголовок'
                ]
            ],401);
        }

        //Создание записи
        Note::create([
            'user_id' => $userId,
            'title' => $request->title,
            'text' => $request->text,
            'color_id' => $request->color_id
        ]);
    }

    public function delete(Request $request) {
        $userId = User::where('token', $request->token)->first()->id;
        if (Note::where('user_id', $userId)->first()) {
            Note::find($request->id)->delete();
        }
        else return response()->json([
            'data' => [
                'error' => 'Действие запрещено'
            ]
        ],403);
    }

    public function edit(Request $request) {
        $userId = User::where('token', $request->token)->first()->id;

        //Валидатор заголовка
        $titleValidator = Validator::make($request->all(),[
            'title' => 'required'
        ]);

        //Провал валидатора
        if ($titleValidator->fails()) {
            return response()->json([
                'data' => [
                    'error' => 'Необходимо ввести заголовок'
                ]
            ],401);
        }

        Note::where('user_id', $userId)->update([
            'title' => $request->title,
            'text' => $request->text,
            'color_id' => $request->color_id
        ]);
    }
}
