import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DependenciaService } from '../../services/dependencia-service';
import { Router } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-dependencia-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dependencia-create.html',
  styleUrl: './dependencia-create.scss',
})
export class DependenciaCreate {

   form: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private dependenciaService: DependenciaService, 
    private fb: FormBuilder, 
    private router: Router,
    private dialogService: Dialogservice
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;
    this.dependenciaService.create(this.form.value).subscribe({
      next: () => {
        this.dialogService.dependenciaCreada(); 
        this.router.navigate(['/dependencias']);
      },
      error: (err) => {
        this.dialogService.errorCreacion('dependencia');
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dependencias']);
  }

  get nombre() {
    return this.form.get('nombre');
  }
}
