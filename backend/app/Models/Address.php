<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = 
    [
        
        'street',
         'contact_id',
         'city',
         'state',
         'country',
         'postal_code'

        ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
