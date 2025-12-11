import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateEquipoDto, Equipo, UpdateEquipoDto } from '../models/equipo.interface';

@Injectable({
  providedIn: 'root',
})
export class Equiposervice {
  private readonly apiUrl = `${environment.apiUrl}/nosotros/equipo`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.apiUrl);
  }

  getById(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateEquipoDto): Observable<Equipo> {
    return this.http.post<Equipo>(this.apiUrl, data);
  }

  update(id: number, data: UpdateEquipoDto): Observable<Equipo> {
    return this.http.patch<Equipo>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleVisibility(id: number, esVisible: boolean): Observable<Equipo> {
    return this.http.patch<Equipo>(`${this.apiUrl}/${id}`, { esVisible });
  }
}
