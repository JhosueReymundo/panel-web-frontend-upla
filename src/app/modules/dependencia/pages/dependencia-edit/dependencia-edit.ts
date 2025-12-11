import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DependenciaService } from '../../services/dependencia-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-dependencia-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dependencia-edit.html',
  styleUrl: './dependencia-edit.scss',
})
export class DependenciaEdit implements OnInit {

  form: FormGroup;
  loading = false;
  loadingData = true;
  error: string | null = null;
  dependenciaId!: number;

  constructor(
    private fb: FormBuilder,
    private dependenciaService: DependenciaService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.dependenciaId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDependencia();
  }

  loadDependencia(): void {
    this.dependenciaService.getById(this.dependenciaId).subscribe({
      next: (data) => {
        this.form.patchValue(data);
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar la dependencia';
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
    
    this.dependenciaService.update(this.dependenciaId, this.form.value).subscribe({
      next: () => {
        this.dialogService.dependenciaActualizada();
        this.router.navigate(['/dependencias']);
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorActualizacion('dependencia');
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
