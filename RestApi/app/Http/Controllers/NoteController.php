<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NoteController extends Controller
{

    public function store(Request $request) {

        $noteValidation = Validator::make($request->all(),[
            'token' => 'required',
            'theme' => 'required',
            'title' => 'required'
        ]);

        if($noteValidation->fails())
            return response()->json([
                'errors' => [
                    'error' => $noteValidation->errors()
                ]
            ],422);

        Note::create([
            'user_id' => User::where('token', $request->token)->first()->id,
            'theme' => $request->theme,
            'title' => $request->title,
            'text' => $request->text
        ]);
    }

    public function delete(Request $request) {
    }
}
