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
        $validator = Validator::make($request->all(),[
            'theme' => 'required'
        ]);

        if($validator->fails())
            return response()->json([
                'errors' => [
                    'error' => $validator->errors()
                ]
            ],422);


        $note = new Note([
            'user_id' => Auth::id(),
            'theme' => $request->theme,
            'title' => "",
            'text' => ""
        ]);
        $note->save();
        return response()->json([$note->id]);
    }

    public function delete(Request $request) {

        $validator = Validator::make($request->all(), [
            'id' => 'required'
        ]);

        if ($validator->fails())
            return response()->json([
                'error' => [
                    'errors' => $validator->errors()
                ]
            ],422);

        Note::find($request->id)->delete();
    }

    public function put(Request $request) {
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'id' => 'required'
        ]);

        if($validator->fails())
            return response()->json([
                'errors' => [
                    'error' => $validator->errors()
                ]
            ],422);

        $note = Note::find($request->id);

        $note->title = $request->title;
        if($request->text == "") $note->text = "";
        else $note->text = $request->text;

        $note->save();
    }

    public function get(Request $request) {
        return Note::where('user_id', Auth::id())->get();
    }

    public function search(Request $request) {
        $searchByTitle = Note::where('title','LIKE',"%" . $request->key_word . "%")->where('user_id', Auth::id())->get();
        $searchByText = Note::where('text','LIKE',"%" . $request->key_word . "%")->where('user_id', Auth::id())->get();
        $search = $searchByTitle->merge($searchByText);
        return response()->json($search);
    }
}
