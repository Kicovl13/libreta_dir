<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;  // Asegúrate de que esta línea esté presente

    protected $fillable = [
        'name',
        'notes',
        'birthday',
        'website',
        'company',
    ];

    // Definición de relaciones
    public function phones()
    {
        return $this->hasMany(Phone::class);
    }

    public function emails()
    {
        return $this->hasMany(Email::class);
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }
}
