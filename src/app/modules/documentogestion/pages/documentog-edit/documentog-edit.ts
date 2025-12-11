import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DocumentogForm } from '../../components/documentog-form/documentog-form';
import { DocumentoGestion, UpdateDocumentoDto } from '../../models/documento.interface';
import { Documentogservice } from '../../services/documentogservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-documentog-edit',
  imports: [CommonModule, DocumentogForm],
  templateUrl: './documentog-edit.html',
  styleUrl: './documentog-edit.scss',
})
export class DocumentogEdit implements OnInit {

  documento?: DocumentoGestion;
  loading = false;
  loadingData = true;
  documentoId!: number;

  constructor(
    private documentoService: Documentogservice,
    private router: Router,
    private route: ActivatedRoute,
    private cd:ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {}

  ngOnInit(): void {
    this.documentoId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDocumento();
  }

  loadDocumento(): void {
    this.documentoService.getById(this.documentoId).subscribe({
      next: (data) => {
        this.documento = data;
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar el documento');
        this.loadingData = false;
        console.error('Error:', err);
        this.router.navigate(['/documentos-gestion']);
      }
    });
  }

  onSubmit(event: { data: UpdateDocumentoDto; archivo?: File }): void {
    this.loading = true;

    // Si hay archivo nuevo, actualizarlo primero
    if (event.archivo) {
      this.documentoService.updateArchivo(this.documentoId, event.archivo).subscribe({
        next: () => {
          this.updateDatos(event.data);
        },
        error: (err) => {
          alert('Error al actualizar el archivo');
          this.loading = false;
          console.error('Error:', err);
        }
      });
    } else {
      this.updateDatos(event.data);
    }
  }

  updateDatos(data: UpdateDocumentoDto): void {
    this.documentoService.update(this.documentoId, data).subscribe({
      next: () => {
        this.dialogService.documentoActualizado();
        this.router.navigate(['/documentos']);
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorActualizacion('documento');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/documentos']);
  }
}
