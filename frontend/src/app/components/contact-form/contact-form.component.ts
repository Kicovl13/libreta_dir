import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';  // Asegúrate de importar el servicio correctamente
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';  // Para manejar rutas

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact | null = null;
  @Output() submitForm = new EventEmitter<Contact>();
  contactForm: FormGroup;
  isEditMode = false;  // Controla si estamos en modo edición
  contactId: number | null = null;  // Para almacenar el ID del contacto en edición

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,  // Servicio de contactos
    private route: ActivatedRoute,  // Para obtener el ID de la URL
    private router: Router  // Para redirigir después de actualizar o crear
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      company: [''],
      birthday: [''],
      website: [''],
      notes: [''],
      phones: this.fb.array([]),
      emails: this.fb.array([]),
      addresses: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');  // Obtener el ID de la URL
    if (id) {
      this.isEditMode = true;
      this.contactId = Number(id);
      this.contactService.getContact(this.contactId).subscribe(
        (contact) => {
          this.contact = contact;
          this.contactForm.patchValue(contact);
          this.populateArrays(contact);  // Cargar los arrays de teléfonos, emails y direcciones
        },
        (error) => console.error('Error al cargar el contacto', error)
      );
    }else {
      // Si no hay ID en la URL, estamos en modo creación
      this.isEditMode = false;
      this.contactForm.reset();  // Resetea el formulario para crear un nuevo contacto
    }
  }

  // Método para obtener el FormArray de teléfonos
  get phones(): FormArray {
    return this.contactForm.get('phones') as FormArray;
  }

  // Método para obtener el FormArray de emails
  get emails(): FormArray {
    return this.contactForm.get('emails') as FormArray;
  }

  // Método para obtener el FormArray de direcciones
  get addresses(): FormArray {
    return this.contactForm.get('addresses') as FormArray;
  }

  // Agregar un nuevo teléfono
  addPhone(): void {
    this.phones.push(this.fb.group({
      phone_number: ['', Validators.required],
    }));
  }

  // Agregar un nuevo email
  addEmail(): void {
    this.emails.push(this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    }));
  }

  // Agregar una nueva dirección
  addAddress(): void {
    this.addresses.push(this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      postal_code: [''],
    }));
  }

  // Eliminar un teléfono
  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  // Eliminar un email
  removeEmail(index: number): void {
    this.emails.removeAt(index);
  }

  // Eliminar una dirección
  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  // Método para rellenar los arrays de teléfonos, emails y direcciones
  private populateArrays(contact: Contact): void {
    if (contact.phones) {
      contact.phones.forEach(phone => this.phones.push(this.fb.group({
        phone_number: [phone.phone_number, Validators.required]
      })));
    }
    if (contact.emails) {
      contact.emails.forEach(email => this.emails.push(this.fb.group({
        email: [email.email, Validators.required]
      })));
    }
    if (contact.addresses) {
      contact.addresses.forEach(address => this.addresses.push(this.fb.group({
        street: [address.street],
        city: [address.city],
        state: [address.state],
        country: [address.country],
        postal_code: [address.postal_code]
      })));
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      if (this.isEditMode && this.contactId) {
        // Si es modo edición, actualiza el contacto
        this.contactService.updateContact(this.contactId, this.contactForm.value).subscribe(
          (updatedContact) => {
            console.log('Contacto actualizado:', updatedContact);
            this.router.navigate(['/contacts', this.contactId]);  // Redirige a la vista de detalles del contacto actualizado
          },
          (error) => console.error('Error al actualizar el contacto', error)
        );
      } else {
        // Si es un contacto nuevo, crea el contacto
        this.contactService.createContact(this.contactForm.value).subscribe(
          (newContact) => {
            console.log('Contacto creado:', newContact);
            this.router.navigate(['/contacts', newContact.id]);  // Redirige a la vista de detalles del contacto recién creado
          },
          (error) => console.error('Error al crear el contacto', error)
        );
      }
    }
  }
}
