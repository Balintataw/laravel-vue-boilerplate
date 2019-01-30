<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Routes everything through spa controller
Route::get('/{any}', 'SinglePageController@index')->where('any', '.*');

Route::post('/admin/login', 'Admin\AdminAuthController@login');
