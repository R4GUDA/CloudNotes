<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NoteController extends Controller
{
    public function store(Request $request) {
        $titleValidator = Validator::make($request->all(),[
            'title' => 'required'
        ]);

        if ($titleValidator->failed()) {
            return response()->json([
                'data' => [
                    'error' => 'Необходимо ввести название'
                ]
            ],401);
        }

        Note::create($request->all());
    }
}
