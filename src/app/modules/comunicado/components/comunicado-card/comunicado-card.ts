import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comunicado } from '../../models/comunicado.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-comunicado-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './comunicado-card.html',
  styleUrl: './comunicado-card.scss',
})
export class ComunicadoCard {
  @Input() comunicado!: Comunicado;
  @Output() delete = new EventEmitter<number>();
  @Output() toggleVisible = new EventEmitter<{ id: number; esVisible: boolean }>();

  constructor(private dialogService: Dialogservice ){}

  onDelete(): void {
    /* if (confirm(`¿Estás seguro de eliminar el comunicado "${this.comunicado.titulo}"?`)) {
      this.delete.emit(this.comunicado.id);
    } */
    this.delete.emit(this.comunicado.id);
  }

  onToggleVisible(): void {
    const newStatus = !this.comunicado.esVisible;
    /* const action = newStatus ? 'publicar' : 'ocultar';
    
     if (confirm(`¿Estás seguro de ${action} este comunicado?`)) {
      this.toggleVisible.emit({ 
        id: this.comunicado.id, 
        esVisible: newStatus 
      });
    }  */
   this.toggleVisible.emit({ 
        id: this.comunicado.id, 
        esVisible: newStatus 
      });
  } 

  /*   async onDelete(): Promise<void> {
    const confirmed = await this.dialogService.confirmDeleteDocumento(
      this.comunicado.titulo
    );
    
    if (confirmed) {
      this.delete.emit(this.comunicado.id);
      this.dialogService.documentoEliminado();
    }
  }

  async onToggleVisible(): Promise<void> {
    const newStatus = !this.comunicado.esVisible;
    const action = newStatus ? 'publicar' : 'ocultar';
    const actionText = newStatus ? 'Publicar' : 'Ocultar';
    
    const confirmed = await this.dialogService.confirmToggleDocumento(
      this.comunicado.titulo,
      newStatus
    );
    
    if (confirmed) {
      this.toggleVisible.emit({ 
        id: this.comunicado.id, 
        esVisible: newStatus 
      });
      
      if (newStatus) {
        this.dialogService.documentoPublicado();
      } else {
        this.dialogService.documentoOculto();
      }
    }
  } */

  getAutorCompleto(): string {
    return `${this.comunicado.autor.nombre} ${this.comunicado.autor.apellido}`;
  }

  getAutorInfo(): string[] {
    const info: string[] = [];
    if (this.comunicado.autor.escuela) {
      info.push(this.comunicado.autor.escuela.nombreEscuela);
    }
    if (this.comunicado.autor.dependencia) {
      info.push(this.comunicado.autor.dependencia.nombreDependencia);
    }
    return info;
  }

  getContenidoPreview(): string {
    const maxLength = 200;
    if (this.comunicado.contenido.length <= maxLength) {
      return this.comunicado.contenido;
    }
    return this.comunicado.contenido.substring(0, maxLength) + '...';
  }

  getTiempoPublicacion(): string {
    if (!this.comunicado.fechaPublicacion) {
      return 'Sin publicar';
    }
    
    const now = new Date();
    const fecha = new Date(this.comunicado.fechaPublicacion);
    const diff = now.getTime() - fecha.getTime();
    
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);
    
    if (minutos < 1) return 'Ahora';
    if (minutos < 60) return `Hace ${minutos} min`;
    if (horas < 24) return `Hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
    if (dias < 7) return `Hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
    
    return fecha.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  }

  isExpired(): boolean {
    if (!this.comunicado.fechaExpiracion) return false;
    return new Date() > new Date(this.comunicado.fechaExpiracion);
  }

  getEstadoBadgeClass(): string {
    switch (this.comunicado.estado) {
      case 'publicado': return 'badge-publicado';
      case 'borrador': return 'badge-borrador';
      case 'archivado': return 'badge-archivado';
      default: return 'badge-borrador';
    }
  }

  getAutorInitials(): string {
    const firstInitial = this.comunicado.autor.nombre.charAt(0).toUpperCase();
    const lastInitial = this.comunicado.autor.apellido.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }
}
