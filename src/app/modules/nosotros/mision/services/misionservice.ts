import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CreateMisionDto, Mision, UpdateMisionDto } from '../models/mision.model';
import { ApiConfigServiceTs } from '../../../../config/api-config.service.ts';

@Injectable({
  providedIn: 'root',
})
export class Misionservice {
  /* private readonly apiUrl = `${environment.apiUrl}/nosotros/mision`;

  constructor(private http: HttpClient) {} */

  private get apiUrl(): string {
    return `${this.apiConfig.getApiUrl()}/nosotros/mision`;
  }
  
  constructor(private http: HttpClient, private apiConfig: ApiConfigServiceTs
  ) { }

  getAll(): Observable<Mision[]> {
    return this.http.get<Mision[]>(`${this.apiConfig.getApiUrl()}/nosotros/misiones`);
  }

  getActive(): Observable<Mision> {
    return this.http.get<Mision>(`${this.apiUrl}/active`);
  }

  getById(id: number): Observable<Mision> {
    return this.http.get<Mision>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateMisionDto): Observable<Mision> {
    return this.http.post<Mision>(this.apiUrl, data);
  }

  update(id: number, data: UpdateMisionDto): Observable<Mision> {
    return this.http.patch<Mision>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  setActive(id: number): Observable<Mision> {
    return this.http.patch<Mision>(`${this.apiUrl}/${id}/activate`, {});
  }
}