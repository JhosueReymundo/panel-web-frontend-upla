/* import { Component } from '@angular/core';

@Component({
  selector: 'app-equipo-create',
  imports: [],
  templateUrl: './equipo-create.html',
  styleUrl: './equipo-create.scss',
})
export class EquipoCreate {

}
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateEquipoDto, UpdateEquipoDto } from '../../models/equipo.interface';
import { EquipoForm } from '../../components/equipo-form/equipo-form';
import { Equiposervice } from '../../services/equiposervice';
import { Dialogservice } from '../../../../../shared/dialog/services/dialogservice';
/* import { EquipoService } from '../../services/equipo.service'; */

@Component({
  selector: 'app-equipo-create',
  imports: [CommonModule, EquipoForm],
  template: `
    <div class="create-container">
      <div class="create-header">
        <h2>Nuevo Miembro del Equipo</h2>
        <p class="subtitle">Completa la información del nuevo miembro</p>
      </div>

      <div class="form-wrapper">
        <app-equipo-form
          [loading]="loading"
          (submitForm)="onSubmit($event)"
          (cancel)="onCancel()">
        </app-equipo-form>
      </div>
    </div>
  `,
  styles: [`
    .create-container {
      animation: fadeIn 0.3s ease;
    }

    .create-header {
      margin-bottom: 2rem;

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
export class EquipoCreate {
  loading = false;

  constructor(
    private equipoService: Equiposervice,
    private router: Router,
    private dialogService: Dialogservice
  ) {}

  onSubmit(data: CreateEquipoDto | UpdateEquipoDto): void {
    this.loading = true;

    this.equipoService.create(data as CreateEquipoDto).subscribe({
      next: () => {
        this.dialogService.equipoCreado(); 
        this.router.navigate(['/nosotros/equipo']);
      },
      error: (err) => {
        this.dialogService.errorCreacion('equipo');
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/nosotros/equipo']);
  }
}