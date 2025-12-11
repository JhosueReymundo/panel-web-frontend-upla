import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EncuestaForm } from '../../components/encuesta-form/encuesta-form';
import { Encuestaservice } from '../../services/encuestaservice';
import { Router } from '@angular/router';
import { CreateEncuestaDto, UpdateEncuestaDto } from '../../models/encuesta.interface';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-encuesta-create',
  imports: [CommonModule, EncuestaForm],
  templateUrl: './encuesta-create.html',
  styleUrl: './encuesta-create.scss',
})
export class EncuestaCreate {

  loading = false;

  constructor(
    private encuestasService: Encuestaservice,
    private router: Router,
    private dialogService: Dialogservice
  ) {}

  onSubmit(data: CreateEncuestaDto | UpdateEncuestaDto): void {
    this.loading = true;

    this.encuestasService.create(data as CreateEncuestaDto).subscribe({
      /* next: (encuesta) => {
        alert('Encuesta creada correctamente');
        this.router.navigate(['/encuestas', encuesta.id, 'builder']);
      },
      error: (err) => {
        alert('Error al crear la encuesta');
        this.loading = false;
        console.error('Error:', err);
      } */
     next: (encuesta) => {
        this.dialogService.encuestaCreado(); 
        this.router.navigate(['/encuestas', encuesta.id, 'builder']);
      },
      error: (err) => {
        this.dialogService.errorCreacion('encuesta');
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/encuestas']);
  }
}
