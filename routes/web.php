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
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return runMigrations();
});
Route::get('/{view}', function () {
    return runMigrations();
});
Route::get('/{view}/{path}', function () {
    return runMigrations();
});
Route::get('/{view}/{path}/{resource}', function () {
    return runMigrations();
});
Route::get('/{view}/{path}/{resource}/{element}', function () {
    return runMigrations();
});
Route::get('download/{idDocumento}', 'FilesController@downloadDocument');
Route::post('/upload', 'FilesController@upload');
Route::get('/mailable', function () {
    $documento = Documento::find(1);
    return new DocumentoMail($documento);
});
Route::get('locale', function () {
    return \App::getLocale();
});
Route::get('locale/{locale}', function ($locale) {
    \Session::put('locale', $locale);
    return redirect()->back();
});
function runMigrations()
{
    try {
        Artisan::call('migrate', array('--path' => 'database/migrations'));
        Artisan::call('db:seed');
    } catch (Exception $e) {
        var_dump($e->getMessage());
    }
    return File::get(public_path() . '/index.html');
}