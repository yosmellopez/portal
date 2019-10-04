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

use App\Entity\Documento;
use App\Mail\DocumentoMail;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/{view}', function () {
    return view('welcome');
});
Route::get('/{view}/{path}', function () {
    return view('welcome');
});
Route::get('/{view}/{path}/{resource}', function () {
    return view('welcome');
});
Route::get('/{view}/{path}/{resource}/{element}', function () {
    return view('welcome');
});
Route::get('download/{idDocumento}', 'FilesController@downloadDocument');
Route::get('/mailable', function () {
    $documento = Documento::find(1);
    return new DocumentoMail($documento);
});