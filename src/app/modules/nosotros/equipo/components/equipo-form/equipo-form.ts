/* import { Component } from '@angular/core';

@Component({
  selector: 'app-equipo-form',
  imports: [],
  templateUrl: './equipo-form.html',
  styleUrl: './equipo-form.scss',
})
export class EquipoForm {

}
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Equipo, CreateEquipoDto, UpdateEquipoDto } from '../../models/equipo.interface';

@Component({
  selector: 'app-equipo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="equipo-form">
      
      <div class="form-section">
        <h3>Información del Miembro</h3>
        
        <div class="form-group">
          <label for="nombre">Nombre Completo *</label>
          <input
            id="nombre"
            type="text"
            formControlName="nombre"
            placeholder="Ej: Juan Pérez García"
            [class.error]="nombre?.invalid && nombre?.touched"
          />
          <div class="error-message" *ngIf="nombre?.invalid && nombre?.touched">
            <span *ngIf="nombre?.errors?.['required']">El nombre es requerido</span>
            <span *ngIf="nombre?.errors?.['minlength']">Mínimo 3 caracteres</span>
          </div>
        </div>

        <div class="form-group">
          <label for="cargo">Cargo *</label>
          <input
            id="cargo"
            type="text"
            formControlName="cargo"
            placeholder="Ej: Director de Tecnología"
            [class.error]="cargo?.invalid && cargo?.touched"
          />
          <div class="error-message" *ngIf="cargo?.invalid && cargo?.touched">
            <span *ngIf="cargo?.errors?.['required']">El cargo es requerido</span>
            <span *ngIf="cargo?.errors?.['minlength']">Mínimo 3 caracteres</span>
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email Institucional *</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            placeholder="ejemplo@upla.edu.pe"
            [class.error]="email?.invalid && email?.touched"
          />
          <div class="error-message" *ngIf="email?.invalid && email?.touched">
            <span *ngIf="email?.errors?.['required']">El email es requerido</span>
            <span *ngIf="email?.errors?.['email']">Email inválido</span>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h3>Configuración</h3>
        
        <div class="form-row">
          <div class="form-group">
            <label for="orden">Orden de Visualización</label>
            <input
              id="orden"
              type="number"
              formControlName="orden"
              placeholder="0"
              min="0"
            />
            <small class="help-text">Define el orden en que aparecerá en el sitio web</small>
          </div>

          <div class="form-group form-group-checkbox">
            <label class="checkbox-label">
              <input type="checkbox" formControlName="esVisible" />
              <span>Visible en el sitio web</span>
            </label>
            <small class="help-text">Este miembro aparecerá en la sección "Nosotros"</small>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary" (click)="onCancel()" [disabled]="loading">
          Cancelar
        </button>
        <button type="submit" class="btn-primary" [disabled]="loading || form.invalid">
          <span *ngIf="!loading">{{ equipo ? 'Actualizar' : 'Crear' }} Miembro</span>
          <span *ngIf="loading">{{ equipo ? 'Actualizando...' : 'Creando...' }}</span>
        </button>
      </div>
    </form>
  `,
  styles: [`
    .equipo-form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .form-section {
      background: #1a1a1a;
      border: 1px solid rgba(16, 185, 129, 0.1);
      border-radius: 12px;
      padding: 2rem;

      h3 {
        color: #10b981;
        font-size: 1.25rem;
        margin: 0 0 1.5rem 0;
      }
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .form-group {
      margin-bottom: 1.5rem;

      &:last-child {
        margin-bottom: 0;
      }

      &.form-group-checkbox {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      label {
        display: block;
        margin-bottom: 0.5rem;
        color: #10b981;
        font-size: 0.95rem;
        font-weight: 500;
      }

      input:not([type="checkbox"]) {
        width: 100%;
        padding: 0.875rem 1rem;
        background: #0f0f0f;
        border: 1px solid rgba(16, 185, 129, 0.2);
        border-radius: 8px;
        color: white;
        font-size: 0.95rem;
        transition: all 0.3s;
        font-family: inherit;

        &:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        &.error {
          border-color: #ef4444;
        }

        &::placeholder {
          color: #6b7280;
        }
      }

      .error-message {
        margin-top: 0.5rem;
        color: #ef4444;
        font-size: 0.875rem;
      }

      .help-text {
        display: block;
        margin-top: 0.5rem;
        color: #6b7280;
        font-size: 0.8rem;
        font-style: italic;
      }
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      color: white;

      input[type="checkbox"] {
        width: auto;
        cursor: pointer;
      }

      span {
        font-size: 0.95rem;
        font-weight: 500;
      }
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding-top: 1rem;

      button {
        padding: 0.875rem 2rem;
        border: none;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .btn-secondary {
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
        border: 1px solid rgba(16, 185, 129, 0.3);

        &:hover:not(:disabled) {
          background: rgba(16, 185, 129, 0.2);
        }
      }

      .btn-primary {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }
      }
    }
  `]
})
export class EquipoForm implements OnInit {
  @Input() equipo?: Equipo;
  @Input() loading = false;
  @Output() submitForm = new EventEmitter<CreateEquipoDto | UpdateEquipoDto>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.equipo) {
      this.loadEquipoData();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      cargo: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      orden: [0, [Validators.min(0)]],
      esVisible: [true]
    });
  }

  loadEquipoData(): void {
    if (!this.equipo) return;

    this.form.patchValue({
      nombre: this.equipo.nombre,
      cargo: this.equipo.cargo,
      email: this.equipo.email,
      orden: this.equipo.orden,
      esVisible: this.equipo.esVisible
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

  get nombre() { return this.form.get('nombre'); }
  get cargo() { return this.form.get('cargo'); }
  get email() { return this.form.get('email'); }
}