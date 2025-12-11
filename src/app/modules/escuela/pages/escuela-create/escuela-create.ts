import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EscuelaService } from '../../services/escuelaService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-escuela-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './escuela-create.html',
  styleUrl: './escuela-create.scss',
})
export class EscuelaCreate {

  form: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private escuelaService: EscuelaService,
    private router: Router,
    private dialogService:Dialogservice
  ) {
    this.form = this.fb.group({
      nombreEscuela: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    //this.error = null;

    this.escuelaService.create(this.form.value).subscribe({
      next: () => {
          this.dialogService.escuelaCreada();           
          this.router.navigate(['/escuelas']);       
      },
      error: (err) => {
        //this.error = 'Error al crear la escuela';
        this.loading = false;
        //console.error('Error:', err);
        this.dialogService.errorCreacion('escuela');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/escuelas']);
  }

  get nombreEscuela() {
    return this.form.get('nombreEscuela');
  }
}
