import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Core/Service/Implements/AuthService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-nav-bar',
  standalone: true,
  imports: [RouterOutlet,
    FormsModule,
    CommonModule,
    RouterLink],
  templateUrl: './menu-nav-bar.component.html',
  styleUrl: './menu-nav-bar.component.css',
  
})
export class MenuNavBarComponent {

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
scrollToFooter() {
  document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
}
scrollToCartaPresentacion() {
  document.getElementById('carta-presentacion')?.scrollIntoView({ behavior: 'smooth' });
}
scrollToCartaArbitros() {
  document.getElementById('carta-arbitros')?.scrollIntoView({ behavior: 'smooth' });
}
}
