<?php

namespace App\Http\Controllers;
use App\Models\Contact;
use App\Models\Phone;
use App\Models\Email;
use App\Models\Address;
use Illuminate\Http\Request;

class ContactController extends Controller
{

  
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Obtener el número de registros por página
        $limit = $request->input('limit', 10);

        // Obtener los contactos con paginación
        $contacts = Contact::with(['phones', 'emails', 'addresses'])->paginate($limit);

        // Retornar en formato JSON
        return response()->json($contacts);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validación de los datos recibidos
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'birthday' => 'nullable|date',
            'website' => 'nullable',
            'company' => 'nullable|string|max:255',
            'phones' => 'array',
            'phones.*' => 'string|max:15', // Validar los números de teléfono
            'emails' => 'array',
            'emails.*' => 'email|max:255', // Validar los emails
            'addresses' => 'array',
            'addresses.*.street' => 'nullable|string|max:255',
            'addresses.*.city' => 'nullable|string|max:255',
            'addresses.*.state' => 'nullable|string|max:255',
            'addresses.*.country' => 'nullable|string|max:255',
            'addresses.*.postal_code' => 'nullable|string|max:10',
        ]);
    
        // Crear el contacto
        $contact = Contact::create($validated);
    
        // Guardar teléfonos, emails y direcciones
        if (!empty($request->phones)) {
            foreach ($request->phones as $phoneNumber) {
                $contact->phones()->create(['phone_number' => $phoneNumber]);
            }
        }
    
        if (!empty($request->emails)) {
            foreach ($request->emails as $emailAddress) {
                $contact->emails()->create(['email' => $emailAddress]);
            }
        }
    
        if (!empty($request->addresses)) {
            foreach ($request->addresses as $address) {
                $contact->addresses()->create($address);
            }
        }
    
        return response()->json($contact->load(['phones', 'emails', 'addresses']), 201);
    }
    
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Obtener el contacto con sus relaciones
        $contact = Contact::with(['phones', 'emails', 'addresses'])->findOrFail($id);
    
        return response()->json($contact);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'birthday' => 'nullable|date',
            'website' => 'nullable|url',
            'notes' => 'nullable|string',
            'phones' => 'array',
            'phones.*.phone_number' => 'required|string|max:15',
            'emails' => 'array',
            'emails.*.email' => 'required|email|max:255',
            'addresses' => 'array',
            'addresses.*.street' => 'nullable|string|max:255',
            'addresses.*.city' => 'nullable|string|max:255',
            'addresses.*.state' => 'nullable|string|max:255',
            'addresses.*.country' => 'nullable|string|max:255',
            'addresses.*.postal_code' => 'nullable|string|max:10',
        ]);
    
        $contact = Contact::findOrFail($id);
        $contact->update($validatedData);
    
        // Actualiza los teléfonos, emails y direcciones, si es necesario
        $contact->phones()->delete();
        foreach ($request->phones as $phoneData) {
            $contact->phones()->create($phoneData);
        }
    
        $contact->emails()->delete();
        foreach ($request->emails as $emailData) {
            $contact->emails()->create($emailData);
        }
    
        $contact->addresses()->delete();
        foreach ($request->addresses as $addressData) {
            $contact->addresses()->create($addressData);
        }
    
        return response()->json($contact);
    }
    
}
