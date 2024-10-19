import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  totalContacts = 0;
  currentPage = 1;
  limit = 10;
  searchTerm: string = '';
  totalPages = 1;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(page: number = 1): void {
    this.contactService.getContacts(page, this.limit).subscribe(
      (response) => {
        this.contacts = response.data;
        this.filteredContacts = [...this.contacts]; // Copiar contactos para filtrar
        this.totalContacts = response.total;
        this.totalPages = Math.ceil(this.totalContacts / this.limit);
        this.currentPage = page; // Actualizar la página actual
      },
      (error) => console.error('Error al cargar los contactos', error)
    );
  }

  get totalPagesArray(): number[] {
    const pages = [];
    const range = 5; // Mostrar solo 5 páginas a la vez
    const start = Math.max(1, this.currentPage - Math.floor(range / 2));
    const end = Math.min(this.totalPages, start + range - 1);
  
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
  

  filterContacts(): void {
    if (this.searchTerm.trim() === '') {
      this.loadContacts(); // Cargar todos los contactos si no hay búsqueda
    } else {
      this.contactService.searchContacts(this.searchTerm).subscribe(
        (response) => {
          this.filteredContacts = response.data; // Mostrar contactos filtrados
          this.totalContacts = response.total;
          this.totalPages = Math.ceil(this.totalContacts / this.limit);
        },
        (error) => console.error('Error al buscar contactos', error)
      );
    }
  }

  viewContact(id: number): void {
    this.router.navigate(['/contacts', id]);
  }

  editContact(id: number): void {
    this.router.navigate(['/contacts', id, 'edit']);
  }

  deleteContact(id: number): void {
    if (confirm('¿Estás seguro de eliminar este contacto?')) {
      this.contactService.deleteContact(id).subscribe(
        () => this.loadContacts(this.currentPage),
        (error) => console.error('Error al eliminar el contacto', error)
      );
    }
  }

  goToPage(page: number): void {
    this.loadContacts(page); // Cambiar de página cuando se selecciona una nueva página
  }
}
