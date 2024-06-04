import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AfiliadosFuncionDto } from '../../Model/AfiliadosFuncionDto';
import { DeporteService } from '../DeporteService';
import { DeportesDto } from '../../Model/DeportesDto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeporteServiceImpl implements DeporteService {
  private apiUrl = environment.apiUrl+'api/v1/deportes'; // URL del servicio en Spring Boot

  constructor(private http: HttpClient) { }
  getDeportes(): Observable<DeportesDto[]> {
    return this.http.get<DeportesDto[]>(this.apiUrl);
  }


}