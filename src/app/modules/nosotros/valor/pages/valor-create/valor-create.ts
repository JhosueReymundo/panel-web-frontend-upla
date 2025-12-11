import { Component } from '@angular/core';
import { Valorservice } from '../../services/valorservice';
import { Router } from '@angular/router';
import { CreateValorDto, UpdateValorDto } from '../../models/valor.interface';
import { CommonModule } from '@angular/common';
import { ValorForm } from '../../components/valor-form/valor-form';
import { Dialogservice } from '../../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-valor-create',
  imports: [CommonModule, ValorForm],
  templateUrl: './valor-create.html',
  styleUrl: './valor-create.scss',
})
export class ValorCreate {
  loading = false;

  constructor(
    private valoresService: Valorservice,
    private router: Router,
    private dialogService: Dialogservice
  ) {}

  onSubmit(data: CreateValorDto | UpdateValorDto): void {
    this.loading = true;

    this.valoresService.create(data as CreateValorDto).subscribe({
      next: () => {
        this.dialogService.valorCreado(); 
        this.router.navigate(['/nosotros/valores']);
      },
      error: (err) => {
        this.dialogService.errorCreacion('valor');
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/nosotros/valores']);
  }
}
