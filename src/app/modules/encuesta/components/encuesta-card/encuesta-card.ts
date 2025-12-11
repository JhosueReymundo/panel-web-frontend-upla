import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Encuesta, EstadoEncuesta } from '../../models/encuesta.interface';

@Component({
  selector: 'app-encuesta-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './encuesta-card.html',
  styleUrl: './encuesta-card.scss',
})
export class EncuestaCard {

  @Input() encuesta!: Encuesta;
  @Output() delete = new EventEmitter<number>();
  @Output() toggleVisible = new EventEmitter<{ id: number; esVisible: boolean }>();
  @Output() cambiarEstado = new EventEmitter<{ id: number; estado: EstadoEncuesta }>();

  EstadoEncuesta = EstadoEncuesta;

  onDelete(): void {
    /* if (confirm(`¿Estás seguro de eliminar la encuesta "${this.encuesta.nombre}"?`)) {
      this.delete.emit(this.encuesta.id);
    } */
    this.delete.emit(this.encuesta.id);
  }

  onToggleVisible(): void {
    const newStatus = !this.encuesta.esVisible;
    /* const action = newStatus ? 'publicar' : 'ocultar';
    
    if (confirm(`¿Estás seguro de ${action} esta encuesta?`)) {
      this.toggleVisible.emit({ 
        id: this.encuesta.id, 
        esVisible: newStatus 
      });
    } */
    this.toggleVisible.emit({ 
        id: this.encuesta.id, 
        esVisible: newStatus 
      });
  }

  onCambiarEstado(nuevoEstado: EstadoEncuesta): void {
    if (confirm(`¿Cambiar el estado de la encuesta a "${nuevoEstado}"?`)) {
      this.cambiarEstado.emit({
        id: this.encuesta.id,
        estado: nuevoEstado
      });
    }
  }

  getEstadoBadgeClass(): string {
    switch (this.encuesta.estado) {
      case EstadoEncuesta.ACTIVA: return 'badge-activa';
      case EstadoEncuesta.BORRADOR: return 'badge-borrador';
      case EstadoEncuesta.CERRADA: return 'badge-cerrada';
      default: return 'badge-borrador';
    }
  }

  getTotalPreguntas(): number {
    return this.encuesta.preguntas?.length || 0;
  }

  getFechaCreacion(): string {
    const fecha = new Date(this.encuesta.fecha_creacion);
    return fecha.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  }

  isVigente(): boolean {
    if (!this.encuesta.fecha_inicio || !this.encuesta.fecha_fin) return true;
    
    const now = new Date();
    const inicio = new Date(this.encuesta.fecha_inicio);
    const fin = new Date(this.encuesta.fecha_fin);
    
    return now >= inicio && now <= fin;
  }
}
