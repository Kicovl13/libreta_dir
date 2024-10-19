import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule



@Component({
  selector: 'app-contact-list',
  standalone: true,
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  imports: [CommonModule]  // Aquí se importa el CommonModule
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  totalContacts = 0;
  currentPage = 1;
  limit = 10;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(page: number = 1): void {
    this.contactService.getContacts(page, this.limit).subscribe(
      (response) => {
        this.contacts = response.data;
        this.totalContacts = response.total;
        this.currentPage = page;
      },
      (error) => console.error('Error al cargar los contactos', error)
    );
  }

  viewContact(id: number): void {
    this.router.navigate(['/contacts', id]);
  }

  deleteContact(id: number): void {
    if (confirm('¿Estás seguro de eliminar este contacto?')) {
      this.contactService.deleteContact(id).subscribe(
        () => this.loadContacts(this.currentPage),
        (error) => console.error('Error al eliminar el contacto', error)
      );
    }
  }

  editContact(id: number): void {
    console.log('Edit contact with ID:', id);
  }
}
