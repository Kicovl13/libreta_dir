import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';  // Asegúrate de importar CommonModule
import { FormsModule } from '@angular/forms';  // Para manejar la paginación

@Component({
  selector: 'app-contact-list',
  standalone: true,
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  imports: [CommonModule, FormsModule]  // Aquí se importa FormsModule
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  totalContacts = 0;
  currentPage = 1;
  limit = 10;

  constructor(private contactService: ContactService, private router: Router) {}

  searchTerm: string = '';
  filteredContacts: Contact[] = [];
  
  filterContacts(): void {
    if (this.searchTerm.trim()) {
      this.filteredContacts = this.contacts.filter(contact =>
        contact.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contact.phones.some(phone => phone.phone_number.includes(this.searchTerm)) ||
        contact.emails.some(email => email.email.includes(this.searchTerm)) ||
        contact.addresses.some(address =>
          address.street.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          address.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          address.state.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          address.country.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    } else {
      this.filteredContacts = this.contacts;  // Muestra todos los contactos si no hay búsqueda
    }
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(page: number = 1): void {
    this.contactService.getContacts(page, this.limit).subscribe(
      (response) => {
        this.contacts = response.data;
        this.filteredContacts = this.contacts;  // Inicializa la lista filtrada con todos los contactos
        this.totalContacts = response.total;
        this.currentPage = page;
      },
      (error) => console.error('Error al cargar los contactos', error)
    );
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
  getPages(): number[] {
    const totalPages = this.totalPages();
    const pages = [];
    const visiblePages = 5;  // Mostrar solo 5 páginas a la vez
  
    let startPage = Math.max(this.currentPage - Math.floor(visiblePages / 2), 1);
    let endPage = Math.min(startPage + visiblePages - 1, totalPages);
  
    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }
  
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    return pages;
  }
  totalPages(): number {
    return Math.ceil(this.totalContacts / this.limit);
  }
  
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadContacts(page);
    }
  }



}


