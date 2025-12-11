import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Rolservice } from '../../services/rolservice';
import { Router } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-rol-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rol-create.html',
  styleUrl: './rol-create.scss',
})
export class RolCreate {

  form: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(private rolSrevice:Rolservice, private fb: FormBuilder, private router: Router, private dialogService:Dialogservice){
    this.form = this.fb.group({
      nombreRol: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

   onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;
    this.rolSrevice.create(this.form.value).subscribe({
     next: () => {
          this.dialogService.rolCreado();           
          this.router.navigate(['/roles']);       
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorCreacion('rol');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/roles']);
  }

  get nombreRol() {
    return this.form.get('nombreRol');
  }
}
