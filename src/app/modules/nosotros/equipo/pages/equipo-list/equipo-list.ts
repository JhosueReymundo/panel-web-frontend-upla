/* import { Component } from '@angular/core';

@Component({
  selector: 'app-equipo-list',
  imports: [],
  templateUrl: './equipo-list.html',
  styleUrl: './equipo-list.scss',
})
export class EquipoList {

}
 */

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Equipo } from '../../models/equipo.interface';
import { EquipoCard } from '../../components/equipo-card/equipo-card';
import { Equiposervice } from '../../services/equiposervice';
import { Dialogservice } from '../../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-equipo-list',
  standalone: true,
  imports: [CommonModule, RouterLink, EquipoCard],
  template: `
    <div class="list-container">
      <div class="list-header">
        <div>
          <h2>Equipo</h2>
          <p class="subtitle">Gestiona los miembros del equipo</p>
        </div>
        <button class="btn-primary" routerLink="/nosotros/equipo/nuevo">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Nuevo Miembro
        </button>
      </div>

      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>Cargando miembros...</p>
      </div>

      <div *ngIf="error" class="error-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>{{ error }}</p>
        <button class="btn-secondary" (click)="loadEquipos()">Reintentar</button>
      </div>

      <div *ngIf="!loading && !error" class="equipos-grid">
        <app-equipo-card 
          *ngFor="let miembro of equipos"
          [equipo]="miembro"
          (delete)="deleteEquipo($event)"
          (toggleVisibility)="toggleVisibility($event)">
        </app-equipo-card>

        <div *ngIf="equipos.length === 0" class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <p>No hay miembros registrados</p>
          <button class="btn-primary" routerLink="/nosotros/equipo/nuevo">
            Agregar Primer Miembro
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .list-container {
      animation: fadeIn 0.3s ease;
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;

      h2 {
        font-size: 1.75rem;
        color: white;
        margin: 0 0 0.5rem 0;
      }

      .subtitle {
        color: #9ca3af;
        margin: 0;
      }
    }

    .btn-primary {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
      }
    }

    .loading, .error-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 3rem;

      .spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(16, 185, 129, 0.2);
        border-top-color: #10b981;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      p {
        margin-top: 1rem;
        color: #9ca3af;
      }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .equipos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem 2rem;
      color: #9ca3af;

      svg {
        margin-bottom: 1.5rem;
        color: #4b5563;
      }

      p {
        font-size: 1.1rem;
        margin: 0 0 1.5rem 0;
      }
    }

    .btn-secondary {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: rgba(16, 185, 129, 0.2);
      }
    }

    .error-message {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 12px;

      svg {
        color: #ef4444;
      }

      p {
        color: #ef4444;
      }
    }
  `]
})
export class EquipoList implements OnInit {
  equipos: Equipo[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private equipoService: Equiposervice,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadEquipos();
  }

  loadEquipos(): void {
    this.loading = true;
    this.error = null;

    this.equipoService.getAll().subscribe({
      next: (data) => {
        this.equipos = data.sort((a, b) => a.orden - b.orden);
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los miembros';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  /* deleteEquipo(id: number): void {
    this.equipoService.delete(id).subscribe({
      next: () => {
        alert('Miembro eliminado correctamente');
        this.loadEquipos();
      },
      error: (err) => {
        alert('Error al eliminar el miembro');
        console.error('Error:', err);
      }
    });
  }

  toggleVisibility(event: { id: number; esVisible: boolean }): void {
    this.equipoService.toggleVisibility(event.id, event.esVisible).subscribe({
      next: () => {
        const miembro = this.equipos.find(e => e.id === event.id);
        if (miembro) {
          miembro.esVisible = event.esVisible;
        }
        alert(`Miembro ${event.esVisible ? 'publicado' : 'ocultado'} correctamente`);
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cambiar la visibilidad');
        console.error('Error:', err);
      }
    });
  } */

  async deleteEquipo(id: number): Promise<void> {
    const equipo = this.equipos.find(d => d.id === id);
    if (!equipo) return;

    const confirmed = await this.dialogService.confirmDeleteequipo(
      equipo.nombre
    );

    if (!confirmed) return;

    this.equipoService.delete(id).subscribe({
      next: () => {
        this.dialogService.equipoEliminado();
        this.loadEquipos();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo eliminar el equipo');
        console.error('Error:', err);
      }
    });
  }

  async toggleVisibility(event: { id: number; esVisible: boolean }): Promise<void> {
    const equipo = this.equipos.find(d => d.id === event.id);
    if (!equipo) return;

    const confirmed = await this.dialogService.confirmToggleequipo(
      equipo.nombre,
      event.esVisible
    );

    if (!confirmed) return;

    this.equipoService.toggleVisibility(event.id, event.esVisible).subscribe({
      next: () => {

        equipo.esVisible = event.esVisible;
        
        if (event.esVisible) {
          this.dialogService.equipoPublicado();
        } else {
          this.dialogService.equipoOculto();
        }

        this.cd.detectChanges();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo cambiar el estado del equipo');
        console.error('Error:', err);
      }
    });
  }
}