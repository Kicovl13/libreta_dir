import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',  // Asegúrate de que el servicio esté disponible globalmente
})
export class ContactService {
  private apiUrl = 'http://localhost:8000/api/contacts';  // Cambia según tu configuración

  constructor(private http: HttpClient) {}

  // Método para obtener contactos con paginación
  getContacts(page: number = 1, limit: number = 10): Observable<{ data: Contact[], total: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<{ data: Contact[], total: number }>(this.apiUrl, { params });
  }

  // Método para obtener un solo contacto por ID
  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

   // Crear un nuevo contacto
   createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  // Actualizar un contacto existente
  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
  }


  // Método para eliminar un contacto
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
