import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateValorDto, UpdateValorDto, Valor } from '../../models/valor.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-valor-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './valor-form.html',
  styleUrl: './valor-form.scss',
})
export class ValorForm implements OnInit {

  @Input() valor?: Valor;
  @Input() loading = false;
  @Output() submitForm = new EventEmitter<CreateValorDto | UpdateValorDto>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.valor) {
      this.loadValorData();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      icono: ['', [Validators.required]],
      orden: [0, [Validators.min(0)]],
      isVisible: [true]
    });
  }

  loadValorData(): void {
    if (!this.valor) return;

    this.form.patchValue({
      titulo: this.valor.titulo,
      descripcion: this.valor.descripcion,
      icono: this.valor.icono,
      orden: this.valor.orden,
      isVisible: this.valor.isVisible
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitForm.emit(this.form.value);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  get titulo() { return this.form.get('titulo'); }
  get descripcion() { return this.form.get('descripcion'); }
  get icono() { return this.form.get('icono'); }
}
