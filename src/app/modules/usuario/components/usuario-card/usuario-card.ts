import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../models/usuario.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuario-card',
  imports: [CommonModule, /* RouterLink */],
  templateUrl: './usuario-card.html',
  styleUrl: './usuario-card.scss',
})
export class UsuarioCard {

  /* @Input() usuario!: Usuario;
  @Output() delete = new EventEmitter<number>();
  @Output() toggleActivo = new EventEmitter<{ id: number; esActivo: boolean }>();

  onDelete(): void {
    if (confirm(`¿Estás seguro de eliminar al usuario "${this.usuario.nombre} ${this.usuario.apellido}"?`)) {
      this.delete.emit(this.usuario.id);
    }
  }

  onToggleActivo(): void {
    const newStatus = !this.usuario.esActivo;
    const action = newStatus ? 'activar' : 'desactivar';
    
    if (confirm(`¿Estás seguro de ${action} la cuenta de "${this.usuario.nombre} ${this.usuario.apellido}"?`)) {
      this.toggleActivo.emit({ 
        id: this.usuario.id, 
        esActivo: newStatus 
      });
    }
  }

  getInitials(): string {
    return `${this.usuario.nombre.charAt(0)}${this.usuario.apellido.charAt(0)}`.toUpperCase();
  }

  getFullName(): string {
    return `${this.usuario.nombre} ${this.usuario.apellido}`;
  }*/
} 
