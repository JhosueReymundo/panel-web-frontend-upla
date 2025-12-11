import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServicioForm } from '../../components/servicio-form/servicio-form';
import { Servicioservice } from '../../services/servicioservice';
import { Router } from '@angular/router';
import { CreateServicioDto, UpdateServicioDto } from '../../models/servicio.interface';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-servicio-create',
  imports: [CommonModule, ServicioForm],
  templateUrl: './servicio-create.html',
  styleUrl: './servicio-create.scss',
})
export class ServicioCreate {

   loading = false;

  constructor(
    private servicioService: Servicioservice,
    private router: Router,
    private dialogService: Dialogservice
  ) {}

  onSubmit(data: CreateServicioDto | UpdateServicioDto): void {
    this.loading = true;

    this.servicioService.create(data as CreateServicioDto).subscribe({
      next: () => {
        this.dialogService.servicioCreado(); 
        this.router.navigate(['/servicios']);
      },
      error: (err) => {
        this.dialogService.errorCreacion('servicio');
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/servicios']);
  }
}
