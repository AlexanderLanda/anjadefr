import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule, MatToolbarRow,MatToolbar} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule,MatSlideToggle} from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from './Core/Service/Implements/AuthService';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OriginInterceptor } from './Core/OriginInterceptor';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarRow,
    MatToolbar, 
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggle,
    MatMenuModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    RouterLink,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OriginInterceptor,
      multi: true,
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'anjadefr';
  isHomePage: boolean = false;

  constructor(private router: Router,private authService: AuthService) {}
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/home';
      }
    });
  }
  isUserAuthorized(): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) {
      return false;
    }
    const validRoles = ['presidente', 'comisionados', 'secretarias','administrador'];
    return validRoles.includes(user.usuariorol.descripcion) && user.estadoCuenta.estado === 'activo';
  }
  downloadEstatutos(){
    // Ruta del documento Word
    const url = '/assets/documentos/estatutos.docx';
    // Descargar el documento Word
    window.location.href = url;
    // Imprimir mensaje en la consola
    console.log('Descarga realizada con éxito');
}

isLoggedIn(): boolean {
  return this.authService.isLoggedIn();
}

isAdminUser(): boolean {
  return this.authService.isAdminUser();
}

logout(): void {
  this.authService.logout();
}
}
export class InterceptorModule {}
