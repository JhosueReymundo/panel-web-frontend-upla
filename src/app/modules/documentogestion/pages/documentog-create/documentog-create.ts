import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DocumentogForm } from '../../components/documentog-form/documentog-form';
import { Documentogservice } from '../../services/documentogservice';
import { Router } from '@angular/router';
import { CreateDocumentoDto, UpdateDocumentoDto } from '../../models/documento.interface';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-documentog-create',
  imports: [CommonModule, DocumentogForm],
  templateUrl: './documentog-create.html',
  styleUrl: './documentog-create.scss',
})
export class DocumentogCreate {

  loading = false;

  constructor(
    private documentoService: Documentogservice,
    private router: Router,
    private dialogService: Dialogservice
  ) {}

  onSubmit(event: { data: CreateDocumentoDto | UpdateDocumentoDto ; archivo?: File }): void {
    this.loading = true;

    this.documentoService.create(event.data as CreateDocumentoDto, event.archivo).subscribe({
      next: () => {
        this.dialogService.documentoCreado(); 
        this.router.navigate(['/documentos']);
      },
      error: (err) => {
        this.dialogService.errorCreacion('documento');
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/documentos']);
  }
}
