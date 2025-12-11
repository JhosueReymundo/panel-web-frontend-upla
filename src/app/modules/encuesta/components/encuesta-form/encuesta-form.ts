import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateEncuestaDto, Encuesta, EstadoEncuesta, UpdateEncuestaDto } from '../../models/encuesta.interface';

@Component({
  selector: 'app-encuesta-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './encuesta-form.html',
  styleUrl: './encuesta-form.scss',
})
export class EncuestaForm implements OnInit {

  @Input() encuesta?: Encuesta;
  @Input() loading = false;
  @Output() submitForm = new EventEmitter<CreateEncuestaDto | UpdateEncuestaDto>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  EstadoEncuesta = EstadoEncuesta;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.encuesta) {
      this.loadEncuestaData();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      fecha_inicio: [null],
      fecha_fin: [null],
      esVisible: [false],
      estado: [EstadoEncuesta.BORRADOR]
    });
  }

  loadEncuestaData(): void {
    if (!this.encuesta) return;

    this.form.patchValue({
      nombre: this.encuesta.nombre,
      descripcion: this.encuesta.descripcion,
      fecha_inicio: this.encuesta.fecha_inicio ? this.formatDateForInput(this.encuesta.fecha_inicio) : null,
      fecha_fin: this.encuesta.fecha_fin ? this.formatDateForInput(this.encuesta.fecha_fin) : null,
      esVisible: this.encuesta.esVisible,
      estado: this.encuesta.estado
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

    // Convertir fechas
    if (formValue.fecha_inicio) {
      formValue.fecha_inicio = new Date(formValue.fecha_inicio);
    }
    if (formValue.fecha_fin) {
      formValue.fecha_fin = new Date(formValue.fecha_fin);
    }

    this.submitForm.emit(formValue);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  get nombre() { return this.form.get('nombre'); }
  get descripcion() { return this.form.get('descripcion'); }
}
