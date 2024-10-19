import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';  // Importa ReactiveFormsModule
import { CommonModule } from '@angular/common';  // Importa CommonModule para directivas como *ngIf y *ngFor
import { Contact } from '../../models/contact.model';  // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-contact-form',
  standalone: true,  // Indica que este componente es standalone
  imports: [ReactiveFormsModule, CommonModule],  // Importa ReactiveFormsModule y CommonModule
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact | null = null;  // Input para pasar datos de contacto
  @Output() submitForm = new EventEmitter<Contact>();  // Output para emitir el contacto creado o editado
  contactForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario reactivo
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
    if (this.contact) {
      this.isEditMode = true;
      this.contactForm.patchValue(this.contact);
      this.populateArrays(this.contact);
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
      number: ['', Validators.required],
      type: ['']
    }));
  }

  // Agregar un nuevo email
  addEmail(): void {
    this.emails.push(this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      type: ['']
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
      type: ['']
    }));
  }

  // Método para rellenar los arrays de teléfonos, emails y direcciones
  private populateArrays(contact: Contact): void {
    if (contact.phones) {
      contact.phones.forEach(phone => this.phones.push(this.fb.group(phone)));
    }
    if (contact.emails) {
      contact.emails.forEach(email => this.emails.push(this.fb.group(email)));
    }
    if (contact.addresses) {
      contact.addresses.forEach(address => this.addresses.push(this.fb.group(address)));
    }
  }

  // Método para manejar la eliminación de un teléfono
  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  // Método para manejar la eliminación de un email
  removeEmail(index: number): void {
    this.emails.removeAt(index);
  }

  // Método para manejar la eliminación de una dirección
  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitForm.emit(this.contactForm.value);
    }
  }
}
