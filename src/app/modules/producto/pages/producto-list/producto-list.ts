import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { Producto } from '../../models/producto.interface';
import { Productoservice } from '../../services/productoservice';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-producto-list',
  imports: [CommonModule, RouterLink, ProductoCard],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.scss',
})
export class ProductoList implements OnInit {

  productos: Producto[] = [];
  loading = false;
  error: string | null = null;

  constructor(private productoService: Productoservice, private cd:ChangeDetectorRef, 
    private dialogService: Dialogservice,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.loading = true;
    this.error = null;

    this.productoService.getAll().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los productos';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  /* deleteProducto(id: number): void {
    this.productoService.delete(id).subscribe({
      next: () => {
        alert('Producto eliminado correctamente');
        this.loadProductos();
      },
      error: (err) => {
        alert('Error al eliminar el producto');
        console.error('Error:', err);
      }
    });
  }

  toggleVisibility(event: { id: number; esVisible: boolean }): void {
    const action = event.esVisible ? 'publicado' : 'ocultado';
    
    this.productoService.toggleVisibility(event.id, event.esVisible).subscribe({
      next: () => {
        const producto = this.productos.find(p => p.id === event.id);
        if (producto) {
          producto.esVisible = event.esVisible;
          this.cd.detectChanges();
        }
        alert(`Producto ${action} correctamente`);
      },
      error: (err) => {
        alert('Error al cambiar la visibilidad');
        console.error('Error:', err);
      }
    });
  } */

  async deleteProducto(id: number): Promise<void> {
    const producto = this.productos.find(d => d.id === id);
    if (!producto) return;

    const confirmed = await this.dialogService.confirmDeleteproducto(
      producto.nombre
    );

    if (!confirmed) return;

    this.productoService.delete(id).subscribe({
      next: () => {
        this.dialogService.productoEliminado();
        this.loadProductos();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo eliminar el producto');
      }
    });
  }

  async toggleVisibility(event: { id: number; esVisible: boolean }): Promise<void> {
    const producto = this.productos.find(d => d.id === event.id);
    if (!producto) return;

    const confirmed = await this.dialogService.confirmToggleproducto(
      producto.nombre,
      event.esVisible
    );

    if (!confirmed) return;

    this.productoService.toggleVisibility(event.id, event.esVisible).subscribe({
      next: () => {

        producto.esVisible = event.esVisible;
        
        if (event.esVisible) {
          this.dialogService.productoPublicado();
        } else {
          this.dialogService.productoOculto();
        }

        this.cd.detectChanges();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo cambiar el estado del producto');
        console.error('Error:', err);
      }
    });
  }
}
