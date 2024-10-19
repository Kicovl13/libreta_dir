<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;



   // Listar todos los contactos
Route::get('/contacts', [ContactController::class, 'index']);

// Mostrar detalles de un contacto específico
Route::get('/contacts/{id}', [ContactController::class, 'show']);

// Agregar un nuevo contacto
Route::post('/contacts', [ContactController::class, 'store']);

// Actualizar un contacto existente
Route::put('/contacts/{id}', [ContactController::class, 'update']);

// Eliminar un contacto
Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);