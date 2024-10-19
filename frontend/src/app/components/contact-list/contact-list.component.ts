import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { RouterModule } from '@angular/router';  // Para las rutas
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,  // Indica que es un componente standalone
  imports: [CommonModule, RouterModule],  // Importa CommonModule aquí
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe(
      (contacts) => this.contacts = contacts,
      (error) => console.error('Error loading contacts', error)
    );
  }

  deleteContact(id: number): void {
    if (confirm('¿Estás seguro de eliminar este contacto?')) {
      this.contactService.deleteContact(id).subscribe(() => this.loadContacts());
    }
  }
}
