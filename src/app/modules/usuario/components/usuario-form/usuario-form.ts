import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateUsuarioDto, Dependencia, Escuela, Rol, UpdateUsuarioDto, Usuario } from '../../models/usuario.interface';

@Component({
  selector: 'app-usuario-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss',
})
export class UsuarioForm implements OnInit {

  @Input() usuario?: Usuario;
  @Input() roles: Rol[] = [];
  @Input() escuelas: Escuela[] = [];
  @Input() dependencias: Dependencia[] = [];
  @Input() loading = false;
  @Output() submitForm = new EventEmitter<CreateUsuarioDto | UpdateUsuarioDto>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.usuario) {
      this.loadUsuarioData();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.usuario ? [] : [Validators.required, Validators.minLength(6)]],
      rolId: [null, Validators.required],
      escuelaId: [null],
      dependenciaId: [null],
      oficina: [''],
      esActivo: [true]
    });
  }

  loadUsuarioData(): void {
    if (!this.usuario) return;

    this.form.patchValue({
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      email: this.usuario.email,
      rolId: this.usuario.rolId,
      escuelaId: this.usuario.escuelaId || null,
      dependenciaId: this.usuario.dependenciaId || null,
      oficina: this.usuario.oficina || '',
      esActivo: this.usuario.esActivo
    });

    // Al editar, la contraseña es opcional
    this.form.get('password')?.clearValidators();
    this.form.get('password')?.updateValueAndValidity();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = { ...this.form.value };

    // Convertir IDs a números o null
    formValue.rolId = formValue.rolId ? Number(formValue.rolId) : null;
    formValue.escuelaId = formValue.escuelaId ? Number(formValue.escuelaId) : null;
    formValue.dependenciaId = formValue.dependenciaId ? Number(formValue.dependenciaId) : null;

    // Si es edición y no hay password, no enviarlo
    if (this.usuario && !formValue.password) {
      delete formValue.password;
    }

    this.submitForm.emit(formValue);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  // Getters para validación
  get nombre() { return this.form.get('nombre'); }
  get apellido() { return this.form.get('apellido'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get rolId() { return this.form.get('rolId'); }
}
