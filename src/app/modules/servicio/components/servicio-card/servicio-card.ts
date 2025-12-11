import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Servicio } from '../../models/servicio.interface';

@Component({
  selector: 'app-servicio-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './servicio-card.html',
  styleUrl: './servicio-card.scss',
})
export class ServicioCard {

  @Input() servicio!: Servicio;
  @Output() delete = new EventEmitter<number>();
   @Output() toggleVisibility = new EventEmitter<{ id: number; esVisible: boolean }>(); 

  onDelete(): void {
    /* if (confirm(`¿Estás seguro de eliminar "${this.servicio.titulo}"?`)) {
      this.delete.emit(this.servicio.id);
    } */
   this.delete.emit(this.servicio.id);
  }

  onToggleVisibility(): void {
    const newVisibility = !this.servicio.esVisible;
   /*  const action = newVisibility ? 'publicar' : 'ocultar';
    
    if (confirm(`¿Estás seguro de ${action} "${this.servicio.titulo}"?`)) {
      this.toggleVisibility.emit({ 
        id: this.servicio.id, 
        esVisible: newVisibility 
      });
    } */
    this.toggleVisibility.emit({ 
        id: this.servicio.id, 
        esVisible: newVisibility 
      });

  }
}
