import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductoForm } from '../../components/producto-form/producto-form';
import { CreateProductoDto, Producto, UpdateProductoDto } from '../../models/producto.interface';
import { Productoservice } from '../../services/productoservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-producto-edit',
  imports: [CommonModule, ProductoForm],
  templateUrl: './producto-edit.html',
  styleUrl: './producto-edit.scss',
})
export class ProductoEdit implements OnInit {

  producto?: Producto;
  loading = false;
  loadingData = true;
  productoId!: number;

  constructor(
    private productoService: Productoservice,
    private router: Router,
    private route: ActivatedRoute,
    private cd:ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {}

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProducto();
  }

  loadProducto(): void {
    this.productoService.getById(this.productoId).subscribe({
      next: (data) => {
        this.producto = data;
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar el producto');
        this.loadingData = false;
        console.error('Error:', err);
        this.router.navigate(['/productos']);
      }
    });
  }

  onSubmit(data: UpdateProductoDto | CreateProductoDto): void {
    this.loading = true;

    this.productoService.update(this.productoId, data as UpdateProductoDto).subscribe({
      next: () => {
        this.dialogService.productoActualizado();
        this.router.navigate(['productos']);
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorActualizacion('producto');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/productos']);
  }
}
