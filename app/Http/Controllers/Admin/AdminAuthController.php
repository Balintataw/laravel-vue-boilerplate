<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;


class AdminAuthController extends Controller
{
    public function login() {
        $credentials = request(['email', 'password']);
        $user = new User($credentials);
        $user->save();
        // TODO sort proper tokenization 
        return response()->json($user);
    }
}
