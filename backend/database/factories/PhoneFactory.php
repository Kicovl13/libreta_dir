<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PhoneFactory extends Factory
{
    protected $model = \App\Models\Phone::class;

    public function definition()
    {
        return [
            'phone_number' => $this->faker->phoneNumber, // Número de teléfono aleatorio
        ];
    }
}
