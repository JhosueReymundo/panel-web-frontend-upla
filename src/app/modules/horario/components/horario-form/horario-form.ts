import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateHorarioDto, Horario, UpdateHorarioDto } from '../../models/horario.interface';

@Component({
  selector: 'app-horario-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './horario-form.html',
  styleUrl: './horario-form.scss',
})
export class HorarioForm implements OnInit {

  @Input() horario?:Horario;
  @Input() loading=false;
  @Output() submitForm=new EventEmitter<{data: CreateHorarioDto | UpdateHorarioDto; archivo?: File}>();
  @Output() cancel=new EventEmitter<void>();

  form: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  } 

  ngOnInit(): void {
      if(this.horario){
        this.loadHorarioData();
      }
  }

  createForm(): FormGroup{
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      esVisible: [true]
    });
  }

  loadHorarioData(): void{
    if(!this.horario) return;

     this.form.patchValue({
      nombre: this.horario.nombre,
      esVisible: this.horario.esVisible
    });

    // Si tiene archivo, mostrar nombre
    if (this.horario.archivoPdf) {
      this.previewUrl = this.horario.archivoPdf;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validar que sea PDF
      if (file.type !== 'application/pdf') {
        alert('Solo se permiten archivos PDF');
        input.value = '';
        return;
      }

      // Validar tamaño (máximo 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert('El archivo no debe superar 10MB');
        input.value = '';
        return;
      }

      this.selectedFile = file;
      this.previewUrl = file.name;
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    const fileInput = document.getElementById('archivo') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Validar que haya archivo al crear (no al editar)
    if (!this.horario && !this.selectedFile) {
      alert('Debes seleccionar un archivo PDF');
      return;
    }

    this.submitForm.emit({
      data: this.form.value,
      archivo: this.selectedFile || undefined
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }

  get nombre(){return this.form.get('nombre');}
}
