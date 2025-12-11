import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateHomeDto, Home, UpdateHomeDto } from '../../model/home.interface';
import { Homeservice } from '../../services/homeservice';

@Component({
  selector: 'app-home-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-form.html',
  styleUrl: './home-form.scss',
})
export class HomeForm implements OnInit {
  @Input() home?: Home;
  @Input() loading = false;
  @Output() submitForm = new EventEmitter<{data: CreateHomeDto | UpdateHomeDto; imagen?: File}>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private homeService: Homeservice
  ) {
    this.form = this.createForm();
  } 

  ngOnInit(): void {
    if (this.home) {
      this.loadHomeData();
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      subtitulo: ['', [Validators.maxLength(255)]],
      esVisible: [true]
    });
  }

  loadHomeData(): void {
    if (!this.home) return;

    this.form.patchValue({
      titulo: this.home.titulo,
      subtitulo: this.home.subtitulo || '',
      esVisible: this.home.esVisible
    });

    // Si tiene imagen, cargar URL
    if (this.home.imagenFondo) {
      this.previewUrl = this.homeService.getImagenUrl(this.home.imagenFondo);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validar que sea imagen
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Solo se permiten archivos de imagen (JPG, PNG, WEBP, GIF)');
        input.value = '';
        return;
      }

      // Validar tamaño (máximo 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('El archivo no debe superar 5MB');
        input.value = '';
        return;
      }

      this.selectedFile = file;
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeFile(): void {
    this.selectedFile = null;
    if (!this.home) {
      this.previewUrl = null;
    } else if (this.home.imagenFondo) {
      this.previewUrl = this.homeService.getImagenUrl(this.home.imagenFondo);
    }
    const fileInput = document.getElementById('imagen') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Validar que haya imagen al crear (no al editar)
    if (!this.home && !this.selectedFile) {
      alert('Debes seleccionar una imagen de fondo');
      return;
    }

    this.submitForm.emit({
      data: this.form.value,
      imagen: this.selectedFile || undefined
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }

  get titulo() { return this.form.get('titulo'); }
  get subtitulo() { return this.form.get('subtitulo'); }
}
