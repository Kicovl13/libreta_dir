<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\Phone;
use App\Models\Email;
use App\Models\Address;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    public function run()
    {
        // Genera 5000 contactos ficticios
        Contact::factory(5000)
            ->create() // Crea los contactos primero
            ->each(function ($contact) {
                // Luego asigna teléfonos, emails y direcciones a cada contacto
                $contact->phones()->saveMany(Phone::factory(rand(1, 3))->make()); // 1 a 3 teléfonos
                $contact->emails()->saveMany(Email::factory(rand(1, 2))->make()); // 1 a 2 emails
                $contact->addresses()->saveMany(Address::factory(rand(1, 2))->make()); // 1 a 2 direcciones
            });
    }
}
