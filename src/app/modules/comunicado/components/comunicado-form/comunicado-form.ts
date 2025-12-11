import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comunicado, CreateComunicadoDto, UpdateComunicadoDto } from '../../models/comunicado.interface';

@Component({
  selector: 'app-comunicado-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comunicado-form.html',
  styleUrl: './comunicado-form.scss',
})
export class ComunicadoForm implements OnInit {

   @Input() comunicado?: Comunicado;
  @Input() loading = false;
  @Output() submitForm = new EventEmitter<CreateComunicadoDto | UpdateComunicadoDto>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.comunicado) {
      this.loadComunicadoData();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      contenido: ['', [Validators.required, Validators.minLength(20)]],
      fechaPublicacion: [null],
      fechaExpiracion: [null],
      estado: ['borrador'],
      esVisible: [false]
    });
  }

  loadComunicadoData(): void {
    if (!this.comunicado) return;

    this.form.patchValue({
      titulo: this.comunicado.titulo,
      contenido: this.comunicado.contenido,
      fechaPublicacion: this.comunicado.fechaPublicacion ? this.formatDateForInput(this.comunicado.fechaPublicacion) : null,
      fechaExpiracion: this.comunicado.fechaExpiracion ? this.formatDateForInput(this.comunicado.fechaExpiracion) : null,
      estado: this.comunicado.estado,
      esVisible: this.comunicado.esVisible
    });
  }

  formatDateForInput(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = { ...this.form.value };

    // Convertir fechas si existen
    if (formValue.fechaPublicacion) {
      formValue.fechaPublicacion = new Date(formValue.fechaPublicacion);
    }
    if (formValue.fechaExpiracion) {
      formValue.fechaExpiracion = new Date(formValue.fechaExpiracion);
    }

    this.submitForm.emit(formValue);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  // Getters para validación
  get titulo() { return this.form.get('titulo'); }
  get contenido() { return this.form.get('contenido'); }
  get fechaPublicacion() { return this.form.get('fechaPublicacion'); }
  get fechaExpiracion() { return this.form.get('fechaExpiracion'); }
}
