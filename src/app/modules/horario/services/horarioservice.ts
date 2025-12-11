import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateHorarioDto, Horario, UpdateHorarioDto } from '../models/horario.interface';

@Injectable({
  providedIn: 'root',
})
export class Horarioservice {
  
  private readonly apiUrl=`${environment.apiUrl}/horarios`;

  constructor(private http:HttpClient){}

  getAll(): Observable<Horario[]> {
      return this.http.get<Horario[]>(this.apiUrl);
    }
   
  getById(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}/${id}`);
  }

  // Crear con archivo
  create(data: CreateHorarioDto, archivo?: File): Observable<Horario> {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    if (data.esVisible !== undefined) formData.append('esVisible', data.esVisible.toString());
    if (archivo) formData.append('archivo', archivo);

    return this.http.post<Horario>(this.apiUrl, formData);
  }

  // Actualizar datos (sin archivo)
    update(id: number, data: UpdateHorarioDto): Observable<Horario> {
      return this.http.patch<Horario>(`${this.apiUrl}/${id}`, data);
    }
  
    // Actualizar solo el archivo PDF
    updateArchivo(id: number, archivo: File): Observable<Horario> {
      const formData = new FormData();
      formData.append('archivo', archivo);
      
      return this.http.patch<Horario>(`${this.apiUrl}/${id}/archivo`, formData);
    }

    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  
    toggleActivo(id: number, esVisible: boolean): Observable<Horario> {
      return this.http.patch<Horario>(`${this.apiUrl}/${id}`, { esVisible });
    }
  
    // Obtener URL de descarga
    getDownloadUrl(id: number): string {
      return `${this.apiUrl}/descargar/${id}`;
    }
  
    // Obtener URL del archivo para visualizar
    getArchivoUrl(archivoPdf: string): string {
      return `${environment.apiUrl.replace('/api', '')}/uploads/${archivoPdf}`;
    }
  
}
