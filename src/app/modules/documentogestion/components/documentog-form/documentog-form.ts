import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateDocumentoDto, DocumentoGestion, UpdateDocumentoDto } from '../../models/documento.interface';

@Component({
  selector: 'app-documentog-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './documentog-form.html',
  styleUrl: './documentog-form.scss',
})
export class DocumentogForm implements OnInit {

  @Input() documento?: DocumentoGestion;
  @Input() loading = false;
  @Output() submitForm = new EventEmitter<{ data: CreateDocumentoDto | UpdateDocumentoDto; archivo?: File }>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  } 

  ngOnInit(): void {
    if (this.documento) {
      this.loadDocumentoData();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombreDoc: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      orden: [0, [Validators.required, Validators.min(0)]],
      esActivo: [true]
    });
  }

  loadDocumentoData(): void {
    if (!this.documento) return;

    this.form.patchValue({
      nombreDoc: this.documento.nombreDoc,
      descripcion: this.documento.descripcion,
      orden: this.documento.orden,
      esActivo: this.documento.esActivo
    });

    // Si tiene archivo, mostrar nombre
    if (this.documento.archivoPdf) {
      this.previewUrl = this.documento.archivoPdf;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validar que sea PDF
      if (file.type !== 'application/pdf') {
        alert('Solo se permiten archivos PDF');
        input.value = '';
        return;
      }

      // Validar tamaño (máximo 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert('El archivo no debe superar 10MB');
        input.value = '';
        return;
      }

      this.selectedFile = file;
      this.previewUrl = file.name;
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    const fileInput = document.getElementById('archivo') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Validar que haya archivo al crear (no al editar)
    if (!this.documento && !this.selectedFile) {
      alert('Debes seleccionar un archivo PDF');
      return;
    }

    this.submitForm.emit({
      data: this.form.value,
      archivo: this.selectedFile || undefined
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }

  get nombreDoc() { return this.form.get('nombreDoc'); }
  get descripcion() { return this.form.get('descripcion'); }
  get orden() { return this.form.get('orden'); }
}
