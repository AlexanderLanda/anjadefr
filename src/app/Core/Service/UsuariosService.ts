import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


export interface UsuariosService {
    getUsuarios(): Observable<any>;

    validateEmail(email: string): Observable<boolean>;

    checkNumeroAfiliacionExists(numeroAfiliacion: string): Observable<boolean>;
  }