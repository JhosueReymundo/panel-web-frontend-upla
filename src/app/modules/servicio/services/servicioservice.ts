import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateServicioDetalleDto, CreateServicioDto, Servicio,
         ServicioDetalle, UpdateServicioDetalleDto, UpdateServicioDto } from '../models/servicio.interface';

@Injectable({
  providedIn: 'root',
})
export class Servicioservice {
   private readonly apiUrl = `${environment.apiUrl}/servicios`;

  constructor(private http: HttpClient) {}

  // ========== SERVICIOS ==========
  
  getAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }

  getAllAdmin(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/admin`);
  }

  getById(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateServicioDto): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrl, data);
  }

  update(id: number, data: UpdateServicioDto): Observable<Servicio> {
    return this.http.patch<Servicio>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  deletePermanent(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}/permanent`);
  }

  restore(id: number): Observable<Servicio> {
    return this.http.patch<Servicio>(`${this.apiUrl}/${id}/restore`, {});
  }
  
  toggleVisibility(id: number, esVisible: boolean): Observable<Servicio> {
    return this.http.patch<Servicio>(`${this.apiUrl}/${id}`, { esVisible });
  }

  // ========== DETALLES ==========
  
  getAllDetalles(servicioId: number): Observable<ServicioDetalle[]> {
    return this.http.get<ServicioDetalle[]>(`${this.apiUrl}/${servicioId}/detalles`);
  }

  addDetalle(servicioId: number, data: CreateServicioDetalleDto): Observable<ServicioDetalle> {
    return this.http.post<ServicioDetalle>(`${this.apiUrl}/${servicioId}/detalles`, data);
  }

  updateDetalle(
    servicioId: number, 
    detalleId: number, 
    data: UpdateServicioDetalleDto
  ): Observable<ServicioDetalle> {
    return this.http.patch<ServicioDetalle>(
      `${this.apiUrl}/${servicioId}/detalles/${detalleId}`, 
      data
    );
  }

  deleteDetalle(servicioId: number, detalleId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/${servicioId}/detalles/${detalleId}`
    );
  }

  
}
