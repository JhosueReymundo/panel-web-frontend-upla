import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Horario } from '../../models/horario.interface';
import { Horarioservice } from '../../services/horarioservice';

@Component({
  selector: 'app-horario-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './horario-card.html',
  styleUrl: './horario-card.scss',
})
export class HorarioCard {

  @Input() horario!: Horario;
  @Output() delete = new EventEmitter<number>();
  @Output() toggleActivo = new EventEmitter<{ id: number; esVisible: boolean }>();

  constructor(private horarioService: Horarioservice){}

  onDelete(): void {
    /* if (confirm(`¿Estás seguro de eliminar "${this.horario.nombre}"?`)) {
      this.delete.emit(this.horario.id);
    } */
    this.delete.emit(this.horario.id);
  }

  onToggleActivo(): void {
    const newStatus = !this.horario.esVisible;
    /* const action = newStatus ? 'publicar' : 'ocultar';
    
    if (confirm(`¿Estás seguro de ${action} "${this.horario.nombre}"?`)) {
      this.toggleActivo.emit({ 
        id: this.horario.id, 
        esVisible: newStatus 
      });
    } */

    this.toggleActivo.emit({ 
        id: this.horario.id, 
        esVisible: newStatus 
      });    
  }

  onDownload(): void {
    const url = this.horarioService.getDownloadUrl(this.horario.id);
    window.open(url, '_blank');
  }

  onView(): void {
    if (this.horario.archivoPdf) {
      const url = this.horarioService.getArchivoUrl(this.horario.archivoPdf);
      window.open(url, '_blank');
    }
  }

  getFileName(): string {
    if (!this.horario.archivoPdf) return 'Sin archivo';
    const parts = this.horario.archivoPdf.split('/');
    return parts[parts.length - 1];
  }


}
