import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Valor } from '../../models/valor.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-valor-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './valor-card.html',
  styleUrl: './valor-card.scss',
})
export class ValorCard {
  @Input() valor!: Valor;
  @Output() delete = new EventEmitter<number>();
  @Output() toggleVisibility = new EventEmitter<{ id: number; isVisible: boolean }>();

  onDelete(): void {
    /* if (confirm(`¿Estás seguro de eliminar "${this.valor.titulo}"?`)) {
      this.delete.emit(this.valor.id);
    } */
    this.delete.emit(this.valor.id);
  }

  onToggleVisibility(): void {
    const newVisibility = !this.valor.isVisible;
    /* const action = newVisibility ? 'publicar' : 'ocultar';
    
    if (confirm(`¿Estás seguro de ${action} "${this.valor.titulo}"?`)) {
      this.toggleVisibility.emit({ 
        id: this.valor.id, 
        isVisible: newVisibility 
      });
    } */
   this.toggleVisibility.emit({ 
        id: this.valor.id, 
        isVisible: newVisibility 
      });
  }
}
