import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HorarioForm } from '../../components/horario-form/horario-form';
import { Horarioservice } from '../../services/horarioservice';
import { Router } from '@angular/router';
import { CreateHorarioDto, UpdateHorarioDto } from '../../models/horario.interface';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-horario-create',
  imports: [CommonModule, HorarioForm],
  templateUrl: './horario-create.html',
  styleUrl: './horario-create.scss',
})
export class HorarioCreate {

  loading = false;

  constructor(
    private horarioService: Horarioservice,
    private router: Router,
    private dialogService: Dialogservice
  ) {}

  onSubmit(event: { data: CreateHorarioDto | UpdateHorarioDto ; archivo?: File }): void {
    this.loading = true;

    this.horarioService.create(event.data as CreateHorarioDto, event.archivo).subscribe({
      next: () => {
        this.dialogService.horarioCreado(); 
        this.router.navigate(['/horarios']);
      },
      error: (err) => {
        this.dialogService.errorCreacion('horario');
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/horarios']);
  }
}
