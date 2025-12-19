import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateDependenciaDto, Dependencia, UpdateDependenciaDto } from '../models/dependencia.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiConfigServiceTs } from '../../../config/api-config.service.ts';

@Injectable({
  providedIn: 'root',
})
export class DependenciaService {
  
  /* private readonly apiUrl = `${environment.apiUrl}/dependencia`;
  
  constructor(private http: HttpClient) {} */
  private get apiUrl(): string {
    return `${this.apiConfig.getApiUrl()}/dependencia`;
    }  
    constructor(private http: HttpClient, private apiConfig: ApiConfigServiceTs) { }

  // GET ALL
  getAll(): Observable<Dependencia[]> {
    return this.http.get<Dependencia[]>(this.apiUrl);
  }

  // GET ONE
  getById(id: number): Observable<Dependencia> {
    return this.http.get<Dependencia>(`${this.apiUrl}/${id}`);
  }

  // CREATE
  create(data: CreateDependenciaDto): Observable<Dependencia> {
    return this.http.post<Dependencia>(this.apiUrl, data);
  }

  // UPDATE
  update(id: number, data: UpdateDependenciaDto): Observable<Dependencia> {
    return this.http.patch<Dependencia>(`${this.apiUrl}/${id}`, data);
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
