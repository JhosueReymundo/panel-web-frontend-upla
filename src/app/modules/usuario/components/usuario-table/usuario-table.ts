import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario.interface';

@Component({
  selector: 'app-usuario-table',
  imports: [CommonModule, RouterLink],
  templateUrl: './usuario-table.html',
  styleUrl: './usuario-table.scss',
})
export class UsuarioTable {
  @Input() usuarios: Usuario[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() toggleActivo = new EventEmitter<{ id: number; esActivo: boolean }>();

  onDelete(usuario: Usuario): void {
    /* const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;
    if (confirm(`¿Estás seguro de eliminar al usuario "${nombreCompleto}"?`)) {
      this.delete.emit(usuario.id);
    } */
   this.delete.emit(usuario.id);
  }

  onToggleActivo(usuario: Usuario): void {
    const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;
    const newStatus = !usuario.esActivo;
    const action = newStatus ? 'activar' : 'desactivar';
    
    /* if (confirm(`¿Estás seguro de ${action} a "${nombreCompleto}"?`)) {
      this.toggleActivo.emit({ 
        id: usuario.id, 
        esActivo: newStatus 
      });
    } */

    this.toggleActivo.emit({ 
        id: usuario.id, 
        esActivo: newStatus 
      });
  }

  getInitials(usuario: Usuario): string {
    const firstInitial = usuario.nombre.charAt(0).toUpperCase();
    const lastInitial = usuario.apellido.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }

  getAvatarColor(usuario: Usuario): string {
    const colors = [
      '#10b981', '#3b82f6', '#8b5cf6', 
      '#f59e0b', '#ec4899', '#06b6d4'
    ];
    const index = usuario.id % colors.length;
    return colors[index];
  }
}
