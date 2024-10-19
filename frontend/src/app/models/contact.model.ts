export interface Phone {
    id: number;
    contact_id: number;
    phone_number: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Email {
    id: number;
    contact_id: number;
    email: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Address {
    id: number;
    contact_id: number;
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Contact {
    id: number;
    name: string;
    company: string;
    notes: string;
    birthday: string;
    website: string;
    created_at: string;
    updated_at: string;
    phones: Phone[];
    emails: Email[];
    addresses: Address[];
  }
  