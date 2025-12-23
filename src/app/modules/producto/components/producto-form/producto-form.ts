import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateProductoDto, EstadoProducto, Producto, UpdateProductoDto } from '../../models/producto.interface';

@Component({
  selector: 'app-producto-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.scss',
})
export class ProductoForm implements OnInit {

  @Input() producto?: Producto;
  @Input() loading = false;
  @Output() submitForm = new EventEmitter<CreateProductoDto | UpdateProductoDto>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  
  estadosDisponibles: EstadoProducto[] = [
    'Activo',
    'En Desarrollo',
    'En Mantenimiento',
    'Descontinuado'
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.producto) {
      this.loadProductoData();
    } else {
      this.addCaracteristica();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      estado: ['Activo', Validators.required],
      version: ['v1.0.0', [Validators.required, Validators.maxLength(50)]],
      usuarios: ['', Validators.maxLength(100)],
      icono: ['🚀', [Validators.required, Validators.maxLength(50)]],
      enlace: [''],
      orden: [0, [Validators.required, Validators.min(0)]],
      esVisible: [true],
      caracteristicas: this.fb.array([], Validators.required)
    });
  }

  loadProductoData(): void {
    if (!this.producto) return;

    this.form.patchValue({
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      estado: this.producto.estado,
      version: this.producto.version,
      usuarios: this.producto.usuarios,
      icono: this.producto.icono,
      orden: this.producto.orden,
      enlace: this.producto.enlace,
      esVisible: this.producto.esVisible
    });

    this.producto.caracteristicas.forEach(car => {
      this.caracteristicas.push(this.fb.group({
        id: [car.id],
        descripcion: [car.descripcion, [Validators.required, Validators.minLength(1)]],
        orden: [car.orden, [Validators.required, Validators.min(0)]]
      }));
    });
  }

  get caracteristicas(): FormArray {
    return this.form.get('caracteristicas') as FormArray;
  }

  addCaracteristica(): void {
    const carGroup = this.fb.group({
      id: [null],
      descripcion: ['', [Validators.required, Validators.minLength(1)]],
      orden: [this.caracteristicas.length, [Validators.required, Validators.min(0)]]
    });
    this.caracteristicas.push(carGroup);
  }

  removeCaracteristica(index: number): void {
    if (this.caracteristicas.length > 1) {
      this.caracteristicas.removeAt(index);
      this.updateOrden();
    }
  }

  moveCaracteristicaUp(index: number): void {
    if (index > 0) {
      const car = this.caracteristicas.at(index);
      this.caracteristicas.removeAt(index);
      this.caracteristicas.insert(index - 1, car);
      this.updateOrden();
    }
  }

  moveCaracteristicaDown(index: number): void {
    if (index < this.caracteristicas.length - 1) {
      const car = this.caracteristicas.at(index);
      this.caracteristicas.removeAt(index);
      this.caracteristicas.insert(index + 1, car);
      this.updateOrden();
    }
  }

  updateOrden(): void {
    this.caracteristicas.controls.forEach((control, i) => {
      control.patchValue({ orden: i });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    
    // Para crear: enviar array simple de strings
    if (!this.producto) {
      const data: CreateProductoDto = {
        ...formValue,
        caracteristicas: formValue.caracteristicas.map((c: any) => c.descripcion)
      };
      this.submitForm.emit(data);
    } 
    // Para editar: enviar con IDs
    else {
      const caracteristicas = formValue.caracteristicas.map((c: any) => {
        if (c.id) {
          return { id: c.id, descripcion: c.descripcion, orden: c.orden };
        } else {
          return { descripcion: c.descripcion, orden: c.orden };
        }
      });

      const data: UpdateProductoDto = {
        ...formValue,
        caracteristicas
      };
      this.submitForm.emit(data);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  getEstadoColor(estado: EstadoProducto): string {
    const colores = {
      'Activo': 'success',
      'En Desarrollo': 'info',
      'En Mantenimiento': 'warning',
      'Descontinuado': 'danger'
    };
    return colores[estado] || 'default';
  }

  // Getters
  get nombre() { return this.form.get('nombre'); }
  get descripcion() { return this.form.get('descripcion'); }
  get estado() { return this.form.get('estado'); }
  get version() { return this.form.get('version'); }
  get usuarios() { return this.form.get('usuarios'); }
  get icono() { return this.form.get('icono'); }
  get enlace() { return this.form.get('enlace'); }
  get orden() { return this.form.get('orden'); }
}
