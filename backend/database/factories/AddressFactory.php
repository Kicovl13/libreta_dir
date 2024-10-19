<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    protected $model = \App\Models\Address::class;

    public function definition()
    {
        return [
            'street' => $this->faker->streetAddress, // Dirección
            'city' => $this->faker->city, // Ciudad
            'state' => $this->faker->state, // Estado
            'country' => $this->faker->country, // País
            'postal_code' => $this->faker->postcode, // Código postal
        ];
    }
}
