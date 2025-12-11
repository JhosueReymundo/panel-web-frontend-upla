import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EncuestaForm } from '../../components/encuesta-form/encuesta-form';
import { Encuesta, UpdateEncuestaDto } from '../../models/encuesta.interface';
import { Encuestaservice } from '../../services/encuestaservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-encuesta-edit',
  imports: [CommonModule, EncuestaForm],
  templateUrl: './encuesta-edit.html',
  styleUrl: './encuesta-edit.scss',
})
export class EncuestaEdit implements OnInit {

  encuesta?: Encuesta;
  loading = false;
  loadingData = true;
  encuestaId!: number;

  constructor(
    private encuestasService: Encuestaservice,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {}

  ngOnInit(): void {
    this.encuestaId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEncuesta();
  }

  loadEncuesta(): void {
    this.encuestasService.getById(this.encuestaId).subscribe({
      next: (data) => {
        this.encuesta = data;
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar la encuesta');
        this.loadingData = false;
        console.error('Error:', err);
        this.router.navigate(['/encuestas']);
      }
    });
  }

  onSubmit(data: UpdateEncuestaDto): void {
    this.loading = true;

    this.encuestasService.update(this.encuestaId, data).subscribe({
      next: () => {
        this.dialogService.encuestaActualizado();
        this.router.navigate(['/encuestas']);
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorActualizacion('documento');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/encuestas']);
  }
}
