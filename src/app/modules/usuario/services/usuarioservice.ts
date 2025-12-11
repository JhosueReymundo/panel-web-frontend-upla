import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CreateUsuarioDto, Dependencia, Escuela, Rol, UpdateUsuarioDto, Usuario } from '../models/usuario.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Usuarioservice {
   private readonly apiUrl = `${environment.apiUrl}/usuario`;
  private readonly rolUrl = `${environment.apiUrl}/rol`;
  private readonly escuelaUrl = `${environment.apiUrl}/escuela`;
  private readonly dependenciaUrl = `${environment.apiUrl}/dependencia`;

  constructor(private http: HttpClient) {}

  // ========== USUARIOS ==========
  
  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateUsuarioDto): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, data);
  }

  update(id: number, data: UpdateUsuarioDto): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleActivo(id: number, esActivo: boolean): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}`, { esActivo });
  }

  // ========== DATOS PARA SELECTS ==========
  
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.rolUrl);
  }

  getEscuelas(): Observable<Escuela[]> {
    return this.http.get<Escuela[]>(this.escuelaUrl);
  }

  getDependencias(): Observable<Dependencia[]> {
    return this.http.get<Dependencia[]>(this.dependenciaUrl);
  }

  // Cargar todos los datos necesarios para el formulario
  getFormData(): Observable<{
    roles: Rol[];
    escuelas: Escuela[];
    dependencias: Dependencia[];
  }> {
    return forkJoin({
      roles: this.getRoles(),
      escuelas: this.getEscuelas(),
      dependencias: this.getDependencias()
    });
  }
}
