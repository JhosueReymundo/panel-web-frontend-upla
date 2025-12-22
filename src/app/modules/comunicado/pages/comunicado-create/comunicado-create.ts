import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComunicadoForm } from '../../components/comunicado-form/comunicado-form';
import { Comunicadoservice } from '../../services/comunicadoservice';
import { Authservice } from '../../../auth/services/authservice';
import { Router } from '@angular/router';
import { CreateComunicadoDto, UpdateComunicadoDto } from '../../models/comunicado.interface';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-comunicado-create',
  imports: [CommonModule, ComunicadoForm],
  templateUrl: './comunicado-create.html',
  styleUrl: './comunicado-create.scss',
})
export class ComunicadoCreate {

  loading = false;

  constructor(
    private comunicadosService: Comunicadoservice,
    private authService: Authservice,
    private router: Router,
    private dialogService: Dialogservice
  ) {}

  onSubmit(data: CreateComunicadoDto | UpdateComunicadoDto): void {
    this.loading = true;

    // Agregar el ID del autor actual
    if (this.isCreateComunicadoDto(data)) {
      const userId = this.authService.getUserId();
      if (userId) {
        data.autorId = userId;
      }
    }

    this.comunicadosService.create(data as CreateComunicadoDto).subscribe({
      
     next: () => {
        this.dialogService.comunicadoCreado(); 
        this.router.navigate(['/comunicados']);
      },
      error: (err) => {
        this.dialogService.errorCreacion('comunicado');
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/comunicados']);
  }

  private isCreateComunicadoDto(data: CreateComunicadoDto | UpdateComunicadoDto): data is CreateComunicadoDto {
  return (data as CreateComunicadoDto).titulo !== undefined;  
}
}
