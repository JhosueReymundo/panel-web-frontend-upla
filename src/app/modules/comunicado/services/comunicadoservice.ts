import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Comunicado, CreateComunicadoDto, UpdateComunicadoDto } from '../models/comunicado.interface';
import { ApiConfigServiceTs } from '../../../config/api-config.service.ts';

@Injectable({
  providedIn: 'root',
})
export class Comunicadoservice {
  /* private readonly apiUrl = `${environment.apiUrl}/comunicados`;

  constructor(private http: HttpClient) {} */
  private get apiUrl(): string {
  return `${this.apiConfig.getApiUrl()}/comunicados`;
  }  
  constructor(private http: HttpClient, private apiConfig: ApiConfigServiceTs) { }

  // ========== CRUD ==========
  getAll(): Observable<Comunicado[]> {
    return this.http.get<Comunicado[]>(this.apiUrl);
  }

  getById(id: number): Observable<Comunicado> {
    return this.http.get<Comunicado>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateComunicadoDto): Observable<Comunicado> {
    return this.http.post<Comunicado>(this.apiUrl, data);
  }

  update(id: number, data: UpdateComunicadoDto): Observable<Comunicado> {
    return this.http.patch<Comunicado>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ========== ACCIONES ESPECÍFICAS ==========
  toggleVisible(id: number, esVisible: boolean): Observable<Comunicado> {
    return this.http.patch<Comunicado>(`${this.apiUrl}/${id}`, { esVisible });
  }

  incrementarVistas(id: number): Observable<Comunicado> {
    return this.http.patch<Comunicado>(`${this.apiUrl}/${id}/vistas`, {});
  }
}
