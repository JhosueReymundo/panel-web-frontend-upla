import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EstadoProducto, Producto } from '../../models/producto.interface';

@Component({
  selector: 'app-producto-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.scss',
})
export class ProductoCard {

  @Input() producto!: Producto;
  @Output() delete = new EventEmitter<number>();
  @Output() toggleVisibility = new EventEmitter<{ id: number; esVisible: boolean }>();

  onDelete(): void {
    /* if (confirm(`¿Estás seguro de eliminar "${this.producto.nombre}"?`)) {
      this.delete.emit(this.producto.id);
    } */
    this.delete.emit(this.producto.id);
  }

  onToggleVisibility(): void {
    const newVisibility = !this.producto.esVisible;
   /*  const action = newVisibility ? 'publicar' : 'ocultar';
    
    if (confirm(`¿Estás seguro de ${action} "${this.producto.nombre}"?`)) {
      this.toggleVisibility.emit({ 
        id: this.producto.id, 
        esVisible: newVisibility 
      });
    } */
    this.toggleVisibility.emit({ 
        id: this.producto.id, 
        esVisible: newVisibility 
      });
  }

  getLink(enlace?: string): string {
    return enlace ?? '#';
  }




  getEstadoClass(estado: EstadoProducto): string {
    const classes = {
      'Activo': 'estado-activo',
      'En Desarrollo': 'estado-desarrollo',
      'En Mantenimiento': 'estado-mantenimiento',
      'Descontinuado': 'estado-descontinuado'
    };
    return classes[estado] || '';
  }
}
