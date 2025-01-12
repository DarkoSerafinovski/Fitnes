<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FitnesDnevnikController;
use App\Http\Controllers\GrupaMisicaController;
use App\Http\Controllers\VezbaController;
use App\Http\Controllers\PlanTreningaController;




Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    
    Route::get('/vezbaci/dnevnici',[UserController::class,'dnevnici']);

    Route::get('/dnevnici/{id}',[FitnesDnevnikController::class,'show']);
    Route::post('/dnevnici',[FitnesDnevnikController::class,'store']);
    Route::post('/dnevnici/{id}/stavke',[FitnesDnevnikController::class,'dodajStavku']);


    Route::post('/grupe-misica',[GrupaMisicaController::class,'store']);
    Route::get('/grupe-misica',[GrupaMisicaController::class,'index']);
    Route::get('/grupe-misica/{id}',[GrupaMisicaController::class,'show']);


    Route::get('/treneri',[UserController::class,'vratiTrenere']);
    Route::delete('/treneri/{id}',[UserController::class,'obrisiTrenera']);
 

    Route::get('/vezbaci',[UserController::class,'vratiVezbace']);
    Route::delete('/vezbaci/{id}',[UserController::class,'obrisiVezbaca']);


    Route::get('/vezbe/video/{id}', [VezbaController::class, 'video'])->name('vezba.video');
    Route::get('/vezbe',[VezbaController::class,'index']);
    Route::get('/vezbe/{id}',[VezbaController::class,'show']);
    Route::post('/vezbe',[VezbaController::class,'store']);
    Route::put('/vezbe/{id}',[VezbaController::class,'update']);


   
    Route::get('/plan-treninga',[PlanTreningaController::class,'index']);
    Route::get('/plan-treninga/{id}',[PlanTreningaController::class,'show']);
    Route::post('/plan-treninga',[PlanTreningaController::class,'store']);
 
    
});

