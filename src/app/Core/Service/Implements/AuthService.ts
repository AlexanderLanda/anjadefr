import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsuariosDto } from '../../Model/UsuariosDto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+'api/v1/auth/login';
  private loggedIn = false;
  private isAdmin = false;

  constructor(private http: HttpClient) {}

  login(idAfiliacion: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { idAfiliacion, password }).pipe(
      map((response) => {
        if (response && this.isValidUser(response)) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.loggedIn = true;
          this.isAdmin = true;
          return { success: true };
        } else {
          throw new Error('Credenciales inválidas o usuario no autorizado');
        }
      }),
      catchError((error) => {
        throw new Error('Error de autenticación');
      })
    );
  }

  isValidUser(user: any): boolean {
    const validRoles = ['presidente', 'comisionados', 'secretarias','administrador'];
    return validRoles.includes(user.usuariorol.descripcion) && user.estadoCuenta.estado === 'Aprobado';
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedIn = false;
    this.isAdmin = false;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }
}