import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

// Exporta la constante routes
export const routes: Routes = [
  { path: 'contacts', component: ContactListComponent },  // Lista de contactos
  { path: 'contacts/new', component: ContactFormComponent },  // Formulario para agregar contacto
  { path: 'contacts/:id/edit', component: ContactFormComponent },  // Editar contacto
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },  // Redirigir la raíz a /contacts
  { path: '**', redirectTo: '/contacts' }  // Ruta comodín para redirigir si no se encuentra la ruta
];
