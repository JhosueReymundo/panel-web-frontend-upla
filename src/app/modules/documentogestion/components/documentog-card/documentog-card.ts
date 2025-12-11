import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocumentoGestion } from '../../models/documento.interface';
import { Documentogservice } from '../../services/documentogservice';

@Component({
  selector: 'app-documentog-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './documentog-card.html',
  styleUrl: './documentog-card.scss',
})
export class DocumentogCard {

  @Input() documento!: DocumentoGestion;
  @Output() delete = new EventEmitter<number>();
  @Output() toggleActivo = new EventEmitter<{ id: number; esActivo: boolean }>();

  constructor(private documentoService: Documentogservice) {}

  onDelete(): void {
    /* if (confirm(`¿Estás seguro de eliminar "${this.documento.nombreDoc}"?`)) {
      this.delete.emit(this.documento.id);
    } */
    this.delete.emit(this.documento.id);
  }

  onToggleActivo(): void {
    /* const newStatus = !this.documento.esActivo;
    const action = newStatus ? 'publicar' : 'ocultar';
    
    if (confirm(`¿Estás seguro de ${action} "${this.documento.nombreDoc}"?`)) {
      this.toggleActivo.emit({ 
        id: this.documento.id, 
        esActivo: newStatus 
      });
    } */
   const newStatus = !this.documento.esActivo;
    this.toggleActivo.emit({ 
      id: this.documento.id, 
      esActivo: newStatus 
    });
  }

  onDownload(): void {
    const url = this.documentoService.getDownloadUrl(this.documento.id);
    window.open(url, '_blank');
  }

  onView(): void {
    if (this.documento.archivoPdf) {
      const url = this.documentoService.getArchivoUrl(this.documento.archivoPdf);
      window.open(url, '_blank');
    }
  }

  getFileName(): string {
    if (!this.documento.archivoPdf) return 'Sin archivo';
    const parts = this.documento.archivoPdf.split('/');
    return parts[parts.length - 1];
  }
}
