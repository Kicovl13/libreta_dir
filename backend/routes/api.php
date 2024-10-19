<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;



   // Listar todos los contactos
// Definir las rutas dentro del grupo 'contacts'
Route::prefix('contacts')->group(function () {
   Route::get('/', [ContactController::class, 'index']); // Ruta para obtener contactos
   Route::get('/search', [ContactController::class, 'search']); // Ruta para buscar contactos
   Route::get('/{id}', [ContactController::class, 'show']); // Mostrar un contacto específico
   Route::post('/', [ContactController::class, 'store']); // Crear un nuevo contacto
   Route::put('/{id}', [ContactController::class, 'update']); // Actualizar un contacto
   Route::delete('/{id}', [ContactController::class, 'destroy']); // Eliminar un contacto
});
