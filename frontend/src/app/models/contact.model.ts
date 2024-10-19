export interface Contact {
    id?: number;
    name: string;
    company?: string;
    birthday?: Date;
    website?: string;
    notes?: string;
    phones: Phone[];
    emails: Email[];
    addresses: Address[];
  }
  
  export interface Phone {
    id?: number;
    number: string;
    type: string;
  }
  
  export interface Email {
    id?: number;
    email: string;
    type: string;
  }
  
  export interface Address {
    id?: number;
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    type: string;
  }
  