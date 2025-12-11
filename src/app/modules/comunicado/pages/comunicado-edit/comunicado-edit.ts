import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ComunicadoForm } from '../../components/comunicado-form/comunicado-form';
import { Comunicado, UpdateComunicadoDto } from '../../models/comunicado.interface';
import { Comunicadoservice } from '../../services/comunicadoservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-comunicado-edit',
  imports: [CommonModule, ComunicadoForm],
  templateUrl: './comunicado-edit.html',
  styleUrl: './comunicado-edit.scss',
})
export class ComunicadoEdit {

  comunicado?: Comunicado;
  loading = false;
  loadingData = true;
  comunicadoId!: number;

  constructor(
    private comunicadosService: Comunicadoservice,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {}

  ngOnInit(): void {
    this.comunicadoId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadComunicado();
  }

  loadComunicado(): void {
    this.comunicadosService.getById(this.comunicadoId).subscribe({
      next: (data) => {
        this.comunicado = data;
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar el comunicado');
        this.loadingData = false;
        console.error('Error:', err);
        this.router.navigate(['/comunicados']);
      }
    });
  }

  onSubmit(data: UpdateComunicadoDto): void {
    this.loading = true;

    this.comunicadosService.update(this.comunicadoId, data).subscribe({
      next: () => {
        this.dialogService.comunicadoActualizado();
        this.router.navigate(['/comunicados']);
      },
      error: (err) => {
        this.dialogService.errorActualizacion('comunicado');
        this.loading = false;
       // this.cd.detectChanges();
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/comunicados']);
  }
}
