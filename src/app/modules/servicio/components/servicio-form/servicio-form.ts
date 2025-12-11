import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateServicioDto, Servicio, UpdateServicioDto } from '../../models/servicio.interface';

@Component({
  selector: 'app-servicio-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './servicio-form.html',
  styleUrl: './servicio-form.scss',
})
export class ServicioForm implements OnInit{

  @Input() servicio?: Servicio;
  @Input() loading = false;
  @Output() submitForm = new EventEmitter<CreateServicioDto | UpdateServicioDto>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.servicio) {
      this.loadServicioData();
    } else {
      // Agregar un detalle vacío por defecto al crear
      this.addDetalle();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      descripcion: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
      icono: ['💻', [Validators.required, Validators.maxLength(50)]],
      orden: [0, [Validators.required, Validators.min(0)]],
      esVisible: [true],
      detalles: this.fb.array([], Validators.required)
    });
  }

  loadServicioData(): void {
    if (!this.servicio) return;

    this.form.patchValue({
      titulo: this.servicio.titulo,
      descripcion: this.servicio.descripcion,
      icono: this.servicio.icono,
      orden: this.servicio.orden,
      esVisible: this.servicio.esVisible
    });

    // Cargar detalles existentes
    this.servicio.detalles.forEach(detalle => {
      this.detalles.push(this.fb.group({
        id: [detalle.id],
        detalle: [detalle.detalle, [Validators.required, Validators.minLength(5)]],
        orden: [detalle.orden, [Validators.required, Validators.min(0)]]
      }));
    });
  }

  get detalles(): FormArray {
    return this.form.get('detalles') as FormArray;
  }

  addDetalle(): void {
    const detalleGroup = this.fb.group({
      id: [null],
      detalle: ['', [Validators.required, Validators.minLength(5)]],
      orden: [this.detalles.length, [Validators.required, Validators.min(0)]]
    });
    this.detalles.push(detalleGroup);
  }

  removeDetalle(index: number): void {
    if (this.detalles.length > 1) {
      this.detalles.removeAt(index);
      // Reordenar los índices
      this.detalles.controls.forEach((control, i) => {
        control.patchValue({ orden: i });
      });
    }
  }

  moveDetalleUp(index: number): void {
    if (index > 0) {
      const detalle = this.detalles.at(index);
      this.detalles.removeAt(index);
      this.detalles.insert(index - 1, detalle);
      this.updateOrden();
    }
  }

  moveDetalleDown(index: number): void {
    if (index < this.detalles.length - 1) {
      const detalle = this.detalles.at(index);
      this.detalles.removeAt(index);
      this.detalles.insert(index + 1, detalle);
      this.updateOrden();
    }
  }

  updateOrden(): void {
    this.detalles.controls.forEach((control, i) => {
      control.patchValue({ orden: i });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    
    // Limpiar detalles: si es edición y un detalle no tiene 'id', es nuevo
    const detalles = formValue.detalles.map((d: any) => {
      if (d.id) {
        return { id: d.id, detalle: d.detalle, orden: d.orden };
      } else {
        return { detalle: d.detalle, orden: d.orden };
      }
    });

    const data = {
      ...formValue,
      detalles
    };

    this.submitForm.emit(data);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  // Getters para validación
  get titulo() { return this.form.get('titulo'); }
  get descripcion() { return this.form.get('descripcion'); }
  get icono() { return this.form.get('icono'); }
  get orden() { return this.form.get('orden'); }
}
