import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocumentogCard } from '../../components/documentog-card/documentog-card';
import { DocumentoGestion } from '../../models/documento.interface';
import { Documentogservice } from '../../services/documentogservice';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-documentog-list',
  imports: [CommonModule, RouterLink, DocumentogCard],
  templateUrl: './documentog-list.html',
  styleUrl: './documentog-list.scss',
})
export class DocumentogList implements OnInit {

  documentos: DocumentoGestion[] = [];
  loading = false;
  error: string | null = null;

  constructor(private documentoService: Documentogservice, private cd:ChangeDetectorRef, 
    private dialogService: Dialogservice,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadDocumentos();
  }

  loadDocumentos(): void {
    this.loading = true;
    this.error = null;

    this.documentoService.getAll().subscribe({
      next: (data) => {
        this.documentos = data;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los documentos';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

 /*  deleteDocumento(id: number): void {
    this.documentoService.delete(id).subscribe({
      next: () => {
        alert('Documento eliminado correctamente');
        this.loadDocumentos();
      },
      error: (err) => {
        alert('Error al eliminar el documento');
        console.error('Error:', err);
      }
    });
  }

  toggleActivo(event: { id: number; esActivo: boolean }): void {
    const action = event.esActivo ? 'activado' : 'desactivado';
    
    this.documentoService.toggleActivo(event.id, event.esActivo).subscribe({
      next: () => {
        const documento = this.documentos.find(d => d.id === event.id);
        if (documento) {
          documento.esActivo = event.esActivo;
        }
        alert(`Documento ${action} correctamente`);
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cambiar el estado');
        console.error('Error:', err);
      }
    });
  } */

  async deleteDocumento(id: number): Promise<void> {
    const documento = this.documentos.find(d => d.id === id);
    if (!documento) return;

    const confirmed = await this.dialogService.confirmDeleteDocumento(
      documento.nombreDoc
    );

    if (!confirmed) return;

    this.documentoService.delete(id).subscribe({
      next: () => {
        this.dialogService.documentoEliminado();
        this.loadDocumentos();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo eliminar el documento');
        console.error('Error:', err);
      }
    });
  }

  async toggleActivo(event: { id: number; esActivo: boolean }): Promise<void> {
    const documento = this.documentos.find(d => d.id === event.id);
    if (!documento) return;

    const confirmed = await this.dialogService.confirmToggleDocumento(
      documento.nombreDoc,
      event.esActivo
    );

    if (!confirmed) return;

    this.documentoService.toggleActivo(event.id, event.esActivo).subscribe({
      next: () => {

        documento.esActivo = event.esActivo;
        
        if (event.esActivo) {
          this.dialogService.documentoPublicado();
        } else {
          this.dialogService.documentoOculto();
        }

        this.cd.detectChanges();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo cambiar el estado del documento');
        console.error('Error:', err);
      }
    });
  }
}
