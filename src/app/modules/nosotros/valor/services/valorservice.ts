import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateValorDto, UpdateValorDto, Valor } from '../models/valor.interface';

@Injectable({
  providedIn: 'root',
})
export class Valorservice {
  private readonly apiUrl = `${environment.apiUrl}/nosotros/valores`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Valor[]> {
    return this.http.get<Valor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Valor> {
    return this.http.get<Valor>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateValorDto): Observable<Valor> {
    return this.http.post<Valor>(this.apiUrl, data);
  }

  update(id: number, data: UpdateValorDto): Observable<Valor> {
    return this.http.patch<Valor>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleVisibility(id: number, isVisible: boolean): Observable<Valor> {
    return this.http.patch<Valor>(`${this.apiUrl}/${id}`, { isVisible });
  }
}
