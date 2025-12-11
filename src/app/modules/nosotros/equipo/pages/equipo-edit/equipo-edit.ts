/* import { Component } from '@angular/core';

@Component({
  selector: 'app-equipo-edit',
  imports: [],
  templateUrl: './equipo-edit.html',
  styleUrl: './equipo-edit.scss',
})
export class EquipoEdit {

}
 */

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo, UpdateEquipoDto } from '../../models/equipo.interface';
import { EquipoForm } from '../../components/equipo-form/equipo-form';
import { Equiposervice } from '../../services/equiposervice';
import { Dialogservice } from '../../../../../shared/dialog/services/dialogservice';


@Component({
  selector: 'app-equipo-edit',
  imports: [CommonModule, EquipoForm],
  template: `
    <div class="edit-container">
      <div class="edit-header">
        <h2>Editar Miembro</h2>
        <p class="subtitle" *ngIf="equipo">{{ equipo.nombre }}</p>
      </div>

      <div *ngIf="loadingData" class="loading">
        <div class="spinner"></div>
        <p>Cargando datos...</p>
      </div>

      <div *ngIf="!loadingData && equipo" class="form-wrapper">
        <app-equipo-form
          [equipo]="equipo"
          [loading]="loading"
          (submitForm)="onSubmit($event)"
          (cancel)="onCancel()">
        </app-equipo-form>
      </div>
    </div>
  `,
  styles: [`
    .edit-container {
      animation: fadeIn 0.3s ease;
    }

    .edit-header {
      margin-bottom: 2rem;

      h2 {
        font-size: 1.75rem;
        color: white;
        margin: 0 0 0.5rem 0;
      }

      .subtitle {
        color: #9ca3af;
        margin: 0;
        font-style: italic;
      }
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4rem;
      color: #9ca3af;

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
  `]
})
export class EquipoEdit implements OnInit {
  equipo?: Equipo;
  loading = false;
  loadingData = true;
  equipoId!: number;

  constructor(
    private equipoService: Equiposervice,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {}

  ngOnInit(): void {
    this.equipoId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEquipo();
  }

  loadEquipo(): void {
    this.equipoService.getById(this.equipoId).subscribe({
      next: (data) => {
        this.equipo = data;
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar el miembro');
        this.loadingData = false;
        console.error('Error:', err);
        this.router.navigate(['/nosotros/equipo']);
      }
    });
  }

  onSubmit(data: UpdateEquipoDto): void {
    this.loading = true;

    this.equipoService.update(this.equipoId, data).subscribe({
      next: () => {
        this.dialogService.equipoActualizado();
        this.router.navigate(['/nosotros/equipo']);
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorActualizacion('equipo');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/nosotros/equipo']);
  }
}