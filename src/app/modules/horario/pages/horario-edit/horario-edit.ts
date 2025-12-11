import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HorarioForm } from '../../components/horario-form/horario-form';
import { Horario, UpdateHorarioDto } from '../../models/horario.interface';
import { Horarioservice } from '../../services/horarioservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-horario-edit',
  imports: [CommonModule, HorarioForm],
  templateUrl: './horario-edit.html',
  styleUrl: './horario-edit.scss',
})
export class HorarioEdit implements OnInit {

  horario?: Horario;
  loading = false;
  loadingData = true;
  horarioId!: number;

  constructor(
    private horarioService: Horarioservice,
    private router: Router,
    private route: ActivatedRoute,
    private cd:ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {}

  ngOnInit(): void {
    this.horarioId=Number(this.route.snapshot.paramMap.get('id'));
    this.loadHorario();
  }

  loadHorario():void{
    this.horarioService.getById(this.horarioId).subscribe({
      next: (data) => {
        this.horario = data;
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar el documento');
        this.loadingData = false;
        console.error('Error:', err);
        this.router.navigate(['/horarios']);
      }
    });
  }

  onSubmit(event: { data: UpdateHorarioDto; archivo?: File }): void {
    this.loading = true;

    // Si hay archivo nuevo, actualizarlo primero
    if (event.archivo) {
      this.horarioService.updateArchivo(this.horarioId, event.archivo).subscribe({
        next: () => {
          this.updateDatos(event.data);
        },
        error: (err) => {
          alert('Error al actualizar el archivo');
          this.loading = false;
          console.error('Error:', err);
        }
      });
    } else {
      this.updateDatos(event.data);
    }
  }

  updateDatos(data: UpdateHorarioDto): void {
    this.horarioService.update(this.horarioId, data).subscribe({
      next: () => {
        this.dialogService.horarioActualizado();
        this.router.navigate(['/horarios']);
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorActualizacion('horario');
      }
    });
  }
  
    onCancel(): void {
      this.router.navigate(['/horarios']);
    }

}
