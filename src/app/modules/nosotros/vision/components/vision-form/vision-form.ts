import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateVisionDto, UpdateVisionDto, Vision } from '../../models/vision.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vision-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vision-form.html',
  styleUrl: './vision-form.scss',
})
export class VisionForm implements OnInit {

  @Input() vision?: Vision;
  @Input() loading = false;
  @Output() submitForm = new EventEmitter<CreateVisionDto | UpdateVisionDto>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.vision) {
      this.loadMisionData();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      contenido: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  loadMisionData(): void {
    if (!this.vision) return;

    this.form.patchValue({
      contenido: this.vision.contenido
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
