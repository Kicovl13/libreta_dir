<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EmailFactory extends Factory
{
    protected $model = \App\Models\Email::class;

    public function definition()
    {
        return [
            'email' => $this->faker->safeEmail, // Correo electrónico aleatorio
        ];
    }
}
