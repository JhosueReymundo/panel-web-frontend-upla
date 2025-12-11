import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateMisionDto, Mision, UpdateMisionDto } from '../../models/mision.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mision-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mision-form.html',
  styleUrl: './mision-form.scss',
})
export class MisionForm implements OnInit {

  @Input() mision?: Mision;
  @Input() loading = false;
  @Output() submitForm = new EventEmitter<CreateMisionDto | UpdateMisionDto>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.mision) {
      this.loadMisionData();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      contenido: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  loadMisionData(): void {
    if (!this.mision) return;

    this.form.patchValue({
      contenido: this.mision.contenido
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

  get contenido() { return this.form.get('contenido'); }
}
