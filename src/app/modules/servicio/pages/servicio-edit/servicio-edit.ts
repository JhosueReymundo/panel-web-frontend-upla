import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServicioForm } from '../../components/servicio-form/servicio-form';
import { Servicio, UpdateServicioDto } from '../../models/servicio.interface';
import { Servicioservice } from '../../services/servicioservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-servicio-edit',
  imports: [CommonModule, ServicioForm],
  templateUrl: './servicio-edit.html',
  styleUrl: './servicio-edit.scss',
})
export class ServicioEdit implements OnInit{

  servicio?: Servicio;
  loading = false;
  loadingData = true;
  servicioId!: number;

  constructor(
    private servicioService: Servicioservice,
    private router: Router,
    private route: ActivatedRoute,
    private cd:ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {}

  ngOnInit(): void {
    this.servicioId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadServicio();
  }

  loadServicio(): void {
    this.servicioService.getById(this.servicioId).subscribe({
      next: (data) => {
        this.servicio = data;
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar el servicio');
        this.loadingData = false;
        console.error('Error:', err);
        this.router.navigate(['/servicios']);
      }
    });
  }

  onSubmit(data: UpdateServicioDto): void {
    this.loading = true;

    this.servicioService.update(this.servicioId, data).subscribe({
      next: () => {
        this.dialogService.servicioActualizado();
        this.router.navigate(['servicios']);
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorActualizacion('servicio');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/servicios']);
  }
}
