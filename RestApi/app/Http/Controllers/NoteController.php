<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class NoteController extends Controller
{

    public function store(Request $request) {
        $storeValidation = Validator::make($request->all(),[
            'theme' => 'required',
            'title' => 'required'
        ]);

        if($storeValidation->fails())
            return response()->json([
                'errors' => [
                    'error' => $storeValidation->errors()
                ]
            ],422);

        Note::create([
            'user_id' => Auth::id(),
            'theme' => $request->theme,
            'title' => $request->title,
            'text' => $request->text
        ]);
    }

    public function delete(Request $request) {

        $deleteValidation = Validator::make($request->all(), [
            'id' => 'required'
        ]);

        if ($deleteValidation->fails())
            return response()->json([
                'error' => [
                    'errors' => $deleteValidation->errors()
                ]
            ],422);
        

        Note::find($request->id)->delete();
    }
}
