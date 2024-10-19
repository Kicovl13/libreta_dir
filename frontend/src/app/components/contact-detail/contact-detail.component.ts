import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa el CommonModule
import { ActivatedRoute,Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-detail',
  standalone: true,  // El componente es standalone
  imports: [CommonModule],  // Asegúrate de importar CommonModule
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | null = null;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadContact(parseInt(id, 10));
    }
  }

  loadContact(id: number): void {
    this.contactService.getContact(id).subscribe(
      (data) => {
        this.contact = data;
      },
      (error) => {
        console.error('Error al cargar el contacto', error);
      }
    );
  }

  goBack(): void {
    window.history.back();
  }

  editContact(): void {
    if (this.contact) {
      this.router.navigate(['/contacts', this.contact.id, 'edit']); // Redirige a la vista de edición del contacto
    }
  }
  deleteContact(): void {
    if (confirm('¿Estás seguro de eliminar este contacto?')) {
      this.contactService.deleteContact(this.contact?.id!).subscribe(
        () => this.goBack(),
        (error) => console.error('Error al eliminar el contacto', error)
      );
    }
  }
}
