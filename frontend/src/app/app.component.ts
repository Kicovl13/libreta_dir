import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet,RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [HttpClientModule, RouterOutlet,RouterModule], // Asegúrate de importar HttpClientModule
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contact-list-app';
}
