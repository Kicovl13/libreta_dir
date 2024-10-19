import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  imports: [CommonModule]  // Aquí se importa el CommonModule
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | null = null;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadContact(+id);
    }
  }

  // Cargar los detalles completos del contacto
  loadContact(id: number): void {
    this.contactService.getContact(id).subscribe(
      (contact) => this.contact = contact,
      (error) => console.error('Error al cargar el contacto', error)
    );
  }
}
