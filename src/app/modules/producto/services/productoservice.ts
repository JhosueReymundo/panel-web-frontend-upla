import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CreateProductoDto, Producto, UpdateProductoDto } from '../models/producto.interface';
import { Observable } from 'rxjs';
import { ApiConfigServiceTs } from '../../../config/api-config.service.ts';

@Injectable({
  providedIn: 'root',
})
export class Productoservice {
  
  /* private readonly apiUrl = `${environment.apiUrl}/productos`;  
  constructor(private http: HttpClient ){ } */

  private get apiUrl(): string {
    return `${this.apiConfig.getApiUrl()}/productos`;
  }
  
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServiceTs  
  ) { }

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateProductoDto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, data);
  }

  update(id: number, data: UpdateProductoDto): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<{ ok: boolean; message: string }> {
    return this.http.delete<{ ok: boolean; message: string }>(`${this.apiUrl}/${id}`);
  }

  toggleVisibility(id: number, esVisible: boolean): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/${id}`, { esVisible });
  }
}
