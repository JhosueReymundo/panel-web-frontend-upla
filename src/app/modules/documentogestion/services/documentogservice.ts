import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateDocumentoDto, DocumentoGestion, UpdateDocumentoDto } from '../models/documento.interface';
import { ApiConfigServiceTs } from '../../../config/api-config.service.ts';

@Injectable({
  providedIn: 'root',
})
export class Documentogservice {
  
  /* private readonly apiUrl = `${environment.apiUrl}/documentogestion`;
  constructor(private http: HttpClient) {} */
  private get apiUrl(): string {
    return `${this.apiConfig.getApiUrl()}/documentogestion`;
  }

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServiceTs  // ← Inyectar servicio
  ) {}

  getAll(): Observable<DocumentoGestion[]> {
    return this.http.get<DocumentoGestion[]>(this.apiUrl);
  }
 
  getById(id: number): Observable<DocumentoGestion> {
    return this.http.get<DocumentoGestion>(`${this.apiUrl}/${id}`);
  }

  // Crear con archivo
  create(data: CreateDocumentoDto, archivo?: File): Observable<DocumentoGestion> {
    const formData = new FormData();
    formData.append('nombreDoc', data.nombreDoc);
    formData.append('descripcion', data.descripcion);
    if (data.orden !== undefined) formData.append('orden', data.orden.toString());
    if (data.esActivo !== undefined) formData.append('esActivo', data.esActivo.toString());
    if (archivo) formData.append('archivo', archivo);

    return this.http.post<DocumentoGestion>(this.apiUrl, formData);
  }

  // Actualizar datos (sin archivo)
  update(id: number, data: UpdateDocumentoDto): Observable<DocumentoGestion> {
    return this.http.patch<DocumentoGestion>(`${this.apiUrl}/${id}`, data);
  }

  // Actualizar solo el archivo PDF
  updateArchivo(id: number, archivo: File): Observable<DocumentoGestion> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    
    return this.http.patch<DocumentoGestion>(`${this.apiUrl}/${id}/archivo`, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleActivo(id: number, esActivo: boolean): Observable<DocumentoGestion> {
    return this.http.patch<DocumentoGestion>(`${this.apiUrl}/${id}`, { esActivo });
  }

  /* getDownloadUrl(id: number): string {
    return `${this.apiUrl}/descargar/${id}`;
  }

  getArchivoUrl(archivoPdf: string): string {
    return `${environment.apiUrl.replace('/api', '')}/uploads/${archivoPdf}`;
  } */
 // ✅ Descargar (dinámico)
  getDownloadUrl(id: number): string {
    return `${this.apiConfig.getApiUrl()}/documentogestion/descargar/${id}`;
  }

  // ✅ Visualizar PDF (dinámico)
  getArchivoUrl(archivoPdf: string): string {
    return `${this.apiConfig.getBaseUrl()}/uploads/${archivoPdf}`;
  }
}
