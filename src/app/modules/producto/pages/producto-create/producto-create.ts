import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductoForm } from '../../components/producto-form/producto-form';
import { Productoservice } from '../../services/productoservice';
import { Router } from '@angular/router';
import { CreateProductoDto, UpdateProductoDto } from '../../models/producto.interface';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-producto-create',
  imports: [CommonModule, ProductoForm],
  templateUrl: './producto-create.html',
  styleUrl: './producto-create.scss',
})
export class ProductoCreate {

  loading = false;

  constructor(
    private productoService: Productoservice,
    private router: Router,
    private dialogService: Dialogservice
  ) {}

  onSubmit(data: CreateProductoDto | UpdateProductoDto): void {
    this.loading = true;

    this.productoService.create(data as CreateProductoDto).subscribe({
      next: () => {
        this.dialogService.productoCreado(); 
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        this.dialogService.errorCreacion('producto');
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/productos']);
  }
}
