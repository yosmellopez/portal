<?php

use App\Entity\Rol;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('authenticate', 'Auth\LoginController@login');
Route::post('account/reset-password/init', 'Auth\ResetPasswordController@passwordReset');
Route::post('publicar', 'PublicadorController@publicar');
Route::get('download/{idDocumento}', 'FilesController@downloadDocument');
Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('documentos/lastEmmited', 'DashboardController@lastEmmitedDocuments');
    Route::get('documentos/lastAproved', 'DashboardController@lastAprovedDocuments');
    Route::get('documentos/lastRejected', 'DashboardController@lastRejectedDocuments');
    Route::get('documentos/lastLowed', 'DashboardController@lastLowedDocuments');
    Route::get('documentos/week', 'DashboardController@weekDocuments');
    Route::get('documentos/month', 'DashboardController@monthDocuments');
    Route::get('documentos/year', 'DashboardController@yearDocuments');
    Route::put('sendMail/{idDocumento}', 'EmailController@sendEmail');
    Route::get('search/documentos', 'SearchController@searchDocumentos');
    Route::get('search/usuarios', 'SearchController@searchUsuarios');
    Route::get('search/clientes', 'SearchController@searchClientes');
    Route::get('monedas', 'SearchController@listTipoMoneda');
    Route::get('documentos/series', 'SearchController@listNumeroSerie');
    Route::get('estados', 'SearchController@listEstadoSunat');
    Route::get('account', 'Auth\LoginController@getAuthenticatedUser');
    Route::post('account/change-password', 'UsuarioController@changePassword');
    Route::resource('documentos', 'DocumentoController');
    Route::resource('clientes', 'ClienteController');
    Route::get('all/clientes', 'ClienteController@allClientes');
    Route::resource('usuarios', 'UsuarioController');
    Route::get('account', 'Auth\LoginController@getAuthenticatedUser');
    Route::get('roles', function () {
        return Rol::all();
    });
});
