import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EscuelaService } from '../../services/escuelaService';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-escuela-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './escuela-edit.html',
  styleUrl: './escuela-edit.scss',
})
export class EscuelaEdit implements OnInit {

  form: FormGroup;
  loading = false;
  loadingData = true;
  error: string | null = null;
  escuelaId!: number;

  constructor(
    private fb: FormBuilder,
    private escuelaService: EscuelaService,
    private router: Router,
    private route: ActivatedRoute,
    private cd:ChangeDetectorRef,
    private dialogService:Dialogservice
  ) {
    this.form = this.fb.group({
      nombreEscuela: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.escuelaId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEscuela();
  }

  loadEscuela(): void {
    this.escuelaService.getById(this.escuelaId).subscribe({
      next: (data) => {
        this.form.patchValue(data);
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar la escuela';
        this.loadingData = false;
        console.error('Error:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;

    this.escuelaService.update(this.escuelaId, this.form.value).subscribe({
      next: () => {
        this.dialogService.escuelaActualizada();
        this.router.navigate(['/escuelas']);
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorActualizacion('escuela');
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
