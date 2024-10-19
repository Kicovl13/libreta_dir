<?php

namespace App\Http\Controllers;
use App\Models\Contact;
use App\Models\Phone;
use App\Models\Email;
use App\Models\Address;
use Illuminate\Http\Request;

class ContactController extends Controller
{

  
public function index(Request $request)
{
    $query = Contact::query();
    
    // Filtrar por búsqueda si es necesario
    if ($request->has('search')) {
        $search = $request->input('search');
        $query->where(function ($query) use ($search) {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%")
                  ->orWhereHas('phones', function($q) use ($search) {
                      $q->where('phone_number', 'like', "%{$search}%");
                  })
                  ->orWhereHas('emails', function($q) use ($search) {
                      $q->where('email', 'like', "%{$search}%");
                  })
                  ->orWhereHas('addresses', function($q) use ($search) {
                      $q->where('street', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('state', 'like', "%{$search}%")
                        ->orWhere('country', 'like', "%{$search}%");
                  });
        });
    }
    
    // Devuelve datos paginados
    $contacts = $query->with(['phones', 'emails', 'addresses'])->paginate(10);
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

public function destroy($id)
{
    // Encontrar el contacto por su ID
    $contact = Contact::findOrFail($id);

    // Eliminar las relaciones de teléfonos, correos electrónicos y direcciones
    $contact->phones()->delete();  // Elimina todos los teléfonos asociados al contacto
    $contact->emails()->delete();  // Elimina todos los emails asociados al contacto
    $contact->addresses()->delete();  // Elimina todas las direcciones asociadas al contacto

    // Eliminar el contacto
    $contact->delete();

    // Devolver una respuesta de éxito
    return response()->json(['message' => 'Contacto y todos los datos relacionados eliminados correctamente.']);
}


public function search(Request $request)
{
    $search = $request->query('search');

    // Usar `with` para evitar consultas N+1 y cargar solo lo necesario
    $contacts = Contact::with(['phones', 'emails', 'addresses'])
        ->where('name', 'like', '%' . $search . '%')
        ->orWhere('company', 'like', '%' . $search . '%')
        ->orWhereHas('phones', function($query) use ($search) {
            $query->where('phone_number', 'like', '%' . $search . '%');
        })
        ->orWhereHas('emails', function($query) use ($search) {
            $query->where('email', 'like', '%' . $search . '%');
        })
        ->orWhereHas('addresses', function($query) use ($search) {
            $query->where('street', 'like', '%' . $search . '%')
                  ->orWhere('city', 'like', '%' . $search . '%')
                  ->orWhere('state', 'like', '%' . $search . '%')
                  ->orWhere('country', 'like', '%' . $search . '%');
        })
        ->orWhere('birthday', 'like', '%' . $search . '%')
        ->orWhere('notes', 'like', '%' . $search . '%')
        ->orWhere('website', 'like', '%' . $search . '%')
        ->paginate(10);

    return response()->json($contacts);
}

    
}

