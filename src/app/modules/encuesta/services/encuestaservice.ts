import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateEncuestaDto, CreateOpcionDto, CreatePreguntaDto, Encuesta, EstadoEncuesta, Opcion, Pregunta, Respuesta, RespuestaCompletaDto, UpdateEncuestaDto, UpdatePreguntaDto } from '../models/encuesta.interface';
import { ApiConfigServiceTs } from '../../../config/api-config.service.ts';

@Injectable({
  providedIn: 'root',
})
export class Encuestaservice {
 
  /* private readonly apiUrl = `${environment.apiUrl}/encuestas`;

  constructor(private http: HttpClient) {} */

  private get apiUrl(): string {
  return `${this.apiConfig.getApiUrl()}/encuestas`;
  }  
  constructor(private http: HttpClient, private apiConfig: ApiConfigServiceTs) { }

  // ========== ENCUESTAS ==========
  getAll(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.apiUrl);
  }

  getPublicas(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(`${this.apiUrl}/publicas`);
  }

  getById(id: number): Observable<Encuesta> {
    return this.http.get<Encuesta>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateEncuestaDto): Observable<Encuesta> {
    return this.http.post<Encuesta>(this.apiUrl, data);
  }

  update(id: number, data: UpdateEncuestaDto): Observable<Encuesta> {
    return this.http.patch<Encuesta>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleVisibilidad(id: number, esVisible: boolean): Observable<Encuesta> {
    return this.http.patch<Encuesta>(`${this.apiUrl}/${id}/visibilidad`, { esVisible });
  }

  cambiarEstado(id: number, estado: EstadoEncuesta): Observable<Encuesta> {
    return this.http.patch<Encuesta>(`${this.apiUrl}/${id}/estado`, { estado });
  }

  // ========== PREGUNTAS ==========
  createPregunta(data: CreatePreguntaDto): Observable<Pregunta> {
    return this.http.post<Pregunta>(`${this.apiUrl}/preguntas`, data);
  }

  getPreguntasByEncuesta(encuestaId: number): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(`${this.apiUrl}/${encuestaId}/preguntas`);
  }

  updatePregunta(id: number, data: UpdatePreguntaDto): Observable<Pregunta> {
    return this.http.patch<Pregunta>(`${this.apiUrl}/preguntas/${id}`, data);
  }

  deletePregunta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/preguntas/${id}`);
  }

  // ========== OPCIONES ==========
  createOpcion(data: CreateOpcionDto): Observable<Opcion> {
    return this.http.post<Opcion>(`${this.apiUrl}/opciones`, data);
  }

  getOpcionesByPregunta(preguntaId: number): Observable<Opcion[]> {
    return this.http.get<Opcion[]>(`${this.apiUrl}/preguntas/${preguntaId}/opciones`);
  }

  deleteOpcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/opciones/${id}`);
  }

  // ========== RESPUESTAS ==========
  enviarRespuestaCompleta(data: RespuestaCompletaDto): Observable<Respuesta> {
    return this.http.post<Respuesta>(`${this.apiUrl}/respuestas/completa`, data);
  }

  getRespuestasByEncuesta(encuestaId: number): Observable<Respuesta[]> {
    return this.http.get<Respuesta[]>(`${this.apiUrl}/${encuestaId}/respuestas`);
  }

  // ========== ESTADÍSTICAS ==========
  getEstadisticas(encuestaId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${encuestaId}/estadisticas`);
  }
}
