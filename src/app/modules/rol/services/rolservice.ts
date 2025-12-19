import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateRolDto, Rol, UpdateRolDto } from '../models/rol.interface';
import { Observable } from 'rxjs';
import { ApiConfigServiceTs } from '../../../config/api-config.service.ts';

@Injectable({
  providedIn: 'root',
})
export class Rolservice {
  //private readonly apiUrl = `${environment.apiUrl}/rol`;
  
    //constructor(private http: HttpClient) {}

    private get apiUrl(): string {
    return `${this.apiConfig.getApiUrl()}/productos`;
  }
  
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServiceTs  
  ) { }
  
    // GET ALL
    getAll(): Observable<Rol[]> {
      return this.http.get<Rol[]>(this.apiUrl);
    }
  
    // GET ONE
    getById(id: number): Observable<Rol> {
      return this.http.get<Rol>(`${this.apiUrl}/${id}`);
    }
  
    // CREATE
    create(data: CreateRolDto): Observable<Rol> {
      return this.http.post<Rol>(this.apiUrl, data);
    }
  
    // UPDATE
    update(id: number, data: UpdateRolDto): Observable<Rol> {
      return this.http.patch<Rol>(`${this.apiUrl}/${id}`, data);
    }
  
    // DELETE
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
