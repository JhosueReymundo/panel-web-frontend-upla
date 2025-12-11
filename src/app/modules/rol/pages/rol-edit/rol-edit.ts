import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Rolservice } from '../../services/rolservice';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-rol-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rol-edit.html',
  styleUrl: './rol-edit.scss',
})
export class RolEdit implements OnInit {


  form: FormGroup;
  loading = false;
  loadingData = true;
  error: string | null = null;
  rolId!: number;

  constructor(
    private fb: FormBuilder,
    private rolService:Rolservice,
    private router: Router,
    private route: ActivatedRoute,
    private cd:ChangeDetectorRef,
    private dialogService:Dialogservice
  ){
    this.form = this.fb.group({
      nombreRol: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.rolId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRol();
  }

  loadRol():void{
    this.rolService.getById(this.rolId).subscribe({

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
    
    this.rolService.update(this.rolId, this.form.value).subscribe({
      next: () => {
          this.dialogService.rolActualizado();           
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
