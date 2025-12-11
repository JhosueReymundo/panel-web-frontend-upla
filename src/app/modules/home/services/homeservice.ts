import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateHomeDto, Home, UpdateHomeDto } from '../model/home.interface';

@Injectable({
  providedIn: 'root',
})
export class Homeservice {
  private readonly apiUrl = `${environment.apiUrl}/home`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Home[]> {
    return this.http.get<Home[]>(this.apiUrl);
  }
   
  getById(id: number): Observable<Home> {
    return this.http.get<Home>(`${this.apiUrl}/${id}`);
  }

  // Crear con imagen
  create(data: CreateHomeDto, imagen?: File): Observable<Home> {
    const formData = new FormData();
    formData.append('titulo', data.titulo);
    if (data.subtitulo) formData.append('subtitulo', data.subtitulo);
    if (data.esVisible !== undefined) formData.append('esVisible', data.esVisible.toString());
    if (imagen) formData.append('imagen', imagen);

    return this.http.post<Home>(this.apiUrl, formData);
  }

  // Actualizar datos (sin imagen)
  update(id: number, data: UpdateHomeDto): Observable<Home> {
    return this.http.patch<Home>(`${this.apiUrl}/${id}`, data);
  }

  // Actualizar solo la imagen
  updateImagen(id: number, imagen: File): Observable<Home> {
    const formData = new FormData();
    formData.append('imagen', imagen);
    
    return this.http.patch<Home>(`${this.apiUrl}/${id}/imagen`, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleVisible(id: number, esVisible: boolean): Observable<Home> {
    return this.http.patch<Home>(`${this.apiUrl}/${id}`, { esVisible });
  }

  // Obtener URL de la imagen para visualizar
  getImagenUrl(imagenFondo: string): string {
    return `${environment.apiUrl.replace('/api', '')}/uploads/${imagenFondo}`;
  }
} 