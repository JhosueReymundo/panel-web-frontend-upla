import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateEscuelaDto, Escuela, UpdateEscuelaDto } from '../models/escuela.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiConfigServiceTs } from '../../../config/api-config.service.ts';

@Injectable({
  providedIn: 'root',
})
export class EscuelaService {
  /* private readonly apiUrl = `${environment.apiUrl}/escuela`;

  constructor(private http: HttpClient) {} */

  private get apiUrl(): string {
  return `${this.apiConfig.getApiUrl()}/escuela`;
  }  
  constructor(private http: HttpClient, private apiConfig: ApiConfigServiceTs) { }

  // GET ALL
  getAll(): Observable<Escuela[]> {
    return this.http.get<Escuela[]>(this.apiUrl);
  }

  // GET ONE
  getById(id: number): Observable<Escuela> {
    return this.http.get<Escuela>(`${this.apiUrl}/${id}`);
  }

  // CREATE
  create(data: CreateEscuelaDto): Observable<Escuela> {
    return this.http.post<Escuela>(this.apiUrl, data);
  }

  // UPDATE
  update(id: number, data: UpdateEscuelaDto): Observable<Escuela> {
    return this.http.patch<Escuela>(`${this.apiUrl}/${id}`, data);
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
