import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateVisionDto, UpdateVisionDto, Vision } from '../models/vision.model';

@Injectable({
  providedIn: 'root',
})
export class Visionservice {
  private readonly apiUrl = `${environment.apiUrl}/nosotros/vision`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Vision[]> {
    return this.http.get<Vision[]>(`${environment.apiUrl}/nosotros/visiones`);
  }

  getActive(): Observable<Vision> {
    return this.http.get<Vision>(`${this.apiUrl}/active`);
  }

  getById(id: number): Observable<Vision> {
    return this.http.get<Vision>(`${this.apiUrl}/${id}`);
  }

  create(data: CreateVisionDto): Observable<Vision> {
    return this.http.post<Vision>(this.apiUrl, data);
  }

  update(id: number, data: UpdateVisionDto): Observable<Vision> {
    return this.http.patch<Vision>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  setActive(id: number): Observable<Vision> {
    return this.http.patch<Vision>(`${this.apiUrl}/${id}/activate`, {});
  }
}
