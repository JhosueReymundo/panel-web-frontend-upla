/* import { Component } from '@angular/core';

@Component({
  selector: 'app-equipo-card',
  imports: [],
  templateUrl: './equipo-card.html',
  styleUrl: './equipo-card.scss',
})
export class EquipoCard {

}
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Equipo } from '../../models/equipo.interface';

@Component({
  selector: 'app-equipo-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="equipo-card" [class.hidden]="!equipo.esVisible">
      <div class="card-header">
        <div class="member-info">
          <div class="avatar">{{ getInitials(equipo.nombre) }}</div>
          <div class="info">
            <h3 class="nombre">{{ equipo.nombre }}</h3>
            <p class="cargo">{{ equipo.cargo }}</p>
            <p class="email">{{ equipo.email }}</p>
          </div>
        </div>
        
        <div class="badges">
          <span class="badge orden">Orden: {{ equipo.orden }}</span>
          <span class="badge" [class.visible]="equipo.esVisible" [class.oculto]="!equipo.esVisible">
            {{ equipo.esVisible ? 'Visible' : 'Oculto' }}
          </span>
        </div>
      </div>

      <div class="card-footer">
        <button 
          class="btn-icon btn-visibility" 
          (click)="onToggleVisibility()"
          [title]="equipo.esVisible ? 'Ocultar' : 'Publicar'">
          <svg *ngIf="equipo.esVisible" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <svg *ngIf="!equipo.esVisible" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        </button>

        <button 
          class="btn-icon btn-edit" 
          [routerLink]="['/nosotros/equipo', equipo.id, 'editar']"
          title="Editar">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>

        <button 
          class="btn-icon btn-delete" 
          (click)="onDelete()"
          title="Eliminar">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .equipo-card {
      background: #1a1a1a;
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(16, 185, 129, 0.2);
        border-color: #10b981;
      }

      &.hidden {
        opacity: 0.6;
        border-color: rgba(239, 68, 68, 0.3);
      }
    }

    .card-header {
      padding: 1.5rem;
      background: rgba(16, 185, 129, 0.05);
      border-bottom: 1px solid rgba(16, 185, 129, 0.1);
    }

    .member-info {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10b981, #059669);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .info {
      flex: 1;
      min-width: 0;
    }

    .nombre {
      font-size: 1.25rem;
      font-weight: 700;
      color: white;
      margin: 0 0 0.25rem 0;
    }

    .cargo {
      color: #10b981;
      font-size: 0.95rem;
      margin: 0 0 0.25rem 0;
      font-weight: 500;
    }

    .email {
      color: #9ca3af;
      font-size: 0.875rem;
      margin: 0;
    }

    .badges {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;

      &.orden {
        background: rgba(59, 130, 246, 0.2);
        color: #3b82f6;
      }

      &.visible {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
      }

      &.oculto {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
      }
    }

    .card-footer {
      padding: 1rem 1.5rem;
      background: rgba(16, 185, 129, 0.03);
      border-top: 1px solid rgba(16, 185, 129, 0.1);
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .btn-icon {
      padding: 0.5rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;

      &.btn-visibility {
        background: rgba(139, 92, 246, 0.1);
        color: #8b5cf6;
        &:hover {
          background: rgba(139, 92, 246, 0.2);
          transform: translateY(-2px);
        }
      }

      &.btn-edit {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
        &:hover {
          background: rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }
      }

      &.btn-delete {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
        &:hover {
          background: rgba(239, 68, 68, 0.2);
          transform: translateY(-2px);
        }
      }
    }
  `]
})
export class EquipoCard{
  @Input() equipo!: Equipo;
  @Output() delete = new EventEmitter<number>();
  @Output() toggleVisibility = new EventEmitter<{ id: number; esVisible: boolean }>();

  onDelete(): void {
    /* if (confirm(`¿Estás seguro de eliminar a "${this.equipo.nombre}"?`)) {
      this.delete.emit(this.equipo.id);
    } */
    this.delete.emit(this.equipo.id);
  }

  onToggleVisibility(): void {
    const newVisibility = !this.equipo.esVisible;
    /* const action = newVisibility ? 'publicar' : 'ocultar';
    
    if (confirm(`¿Estás seguro de ${action} a "${this.equipo.nombre}"?`)) {
      this.toggleVisibility.emit({ 
        id: this.equipo.id, 
        esVisible: newVisibility 
      });
    } */
   this.toggleVisibility.emit({ 
        id: this.equipo.id, 
        esVisible: newVisibility 
      });
  }

  getInitials(nombre: string): string {
    return nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}