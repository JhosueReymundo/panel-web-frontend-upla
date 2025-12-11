import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Encuesta, Opcion, Pregunta, TipoPregunta } from '../../models/encuesta.interface';
import { Encuestaservice } from '../../services/encuestaservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-encuesta-builder',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './encuesta-builder.html',
  styleUrl: './encuesta-builder.scss',
})
export class EncuestaBuilder implements OnInit {

  encuesta?: Encuesta;
  encuestaId!: number;
  loadingData = true;
  saving = false;

  preguntas: Pregunta[] = [];
  preguntaEditando: Pregunta | null = null;
  
  TipoPregunta = TipoPregunta;
  
  // Formulario para nueva pregunta
  preguntaForm: FormGroup;
  mostrarFormPregunta = false;

  constructor(
    private fb: FormBuilder,
    private encuestasService: Encuestaservice,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {
    this.preguntaForm = this.createPreguntaForm();
  }

  ngOnInit(): void {
    this.encuestaId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEncuesta();
  }

  createPreguntaForm(): FormGroup {
    return this.fb.group({
      texto: ['', [Validators.required, Validators.minLength(5)]],
      tipo: [TipoPregunta.ABIERTA, Validators.required],
      opciones: this.fb.array([])
    });
  }

  get opciones(): FormArray {
    return this.preguntaForm.get('opciones') as FormArray;
  }

  loadEncuesta(): void {
    this.encuestasService.getById(this.encuestaId).subscribe({
      next: (data) => {
        this.encuesta = data;
        this.preguntas = data.preguntas || [];
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar la encuesta');
        console.error('Error:', err);
        this.router.navigate(['/encuestas']);
      }
    });
  }

  // ========== GESTIÓN DE PREGUNTAS ==========
  
  toggleFormPregunta(): void {
    this.mostrarFormPregunta = !this.mostrarFormPregunta;
    if (this.mostrarFormPregunta) {
      this.preguntaEditando = null;
      this.preguntaForm.reset({
        tipo: TipoPregunta.ABIERTA
      });
      this.opciones.clear();
    }
  }

  onTipoPreguntaChange(): void {
    const tipo = this.preguntaForm.get('tipo')?.value;
    
    // Limpiar opciones
    this.opciones.clear();
    
    // Si es tipo OPCION, agregar 2 opciones por defecto
    if (tipo === TipoPregunta.OPCION) {
      this.agregarOpcion();
      this.agregarOpcion();
    }
  }

  agregarOpcion(): void {
    const opcionGroup = this.fb.group({
      texto: ['', Validators.required]
    });
    this.opciones.push(opcionGroup);
  }

  eliminarOpcion(index: number): void {
    this.opciones.removeAt(index);
  }

  guardarPregunta(): void {
    if (this.preguntaForm.invalid) {
      this.preguntaForm.markAllAsTouched();
      return;
    }

    const formValue = this.preguntaForm.value;
    const dto = {
      encuesta_id: this.encuestaId,
      texto: formValue.texto,
      tipo: formValue.tipo,
      orden: this.preguntas.length
    };

    this.saving = true;

    this.encuestasService.createPregunta(dto).subscribe({
      next: (pregunta) => {
        // Si es tipo OPCION, crear las opciones
        if (formValue.tipo === TipoPregunta.OPCION && formValue.opciones.length > 0) {
          this.guardarOpciones(pregunta.id, formValue.opciones);
        } else {
          this.finalizarGuardado();
        }
      },
      error: (err) => {
        alert('Error al guardar la pregunta');
        this.saving = false;
        console.error('Error:', err);
      }
    });
  }

  guardarOpciones(preguntaId: number, opciones: any[]): void {
    let completed = 0;
    const total = opciones.length;

    opciones.forEach((opcion, index) => {
      const dto = {
        pregunta_id: preguntaId,
        texto: opcion.texto,
        orden: index
      };

      this.encuestasService.createOpcion(dto).subscribe({
        next: () => {
          completed++;
          if (completed === total) {
            this.finalizarGuardado();
          }
        },
        error: (err) => {
          console.error('Error al guardar opción:', err);
          completed++;
          if (completed === total) {
            this.finalizarGuardado();
          }
        }
      });
    });
  }

  finalizarGuardado(): void {
    this.saving = false;
    this.mostrarFormPregunta = false;
    this.preguntaForm.reset();
    this.loadEncuesta();
  }

  eliminarPregunta(pregunta: Pregunta): void {
    if (confirm(`¿Eliminar la pregunta "${pregunta.texto}"?`)) {
      this.encuestasService.deletePregunta(pregunta.id).subscribe({
        next: () => {
          alert('Pregunta eliminada');
          this.loadEncuesta();
        },
        error: (err) => {
          alert('Error al eliminar la pregunta');
          console.error('Error:', err);
        }
      });
    }
  }

  eliminarOpcionExistente(opcion: Opcion): void {
    if (confirm('¿Eliminar esta opción?')) {
      this.encuestasService.deleteOpcion(opcion.id).subscribe({
        next: () => {
          alert('Opción eliminada');
          this.loadEncuesta();
        },
        error: (err) => {
          alert('Error al eliminar la opción');
          console.error('Error:', err);
        }
      });
    }
  }

  // ========== HELPERS ==========

  getTipoLabel(tipo: TipoPregunta): string {
    switch (tipo) {
      case TipoPregunta.ABIERTA: return 'Abierta';
      case TipoPregunta.OPCION: return 'Opción Múltiple';
      case TipoPregunta.NUMERICA: return 'Numérica';
      default: return tipo;
    }
  }

  getTipoIcon(tipo: TipoPregunta): string {
    switch (tipo) {
      case TipoPregunta.ABIERTA: return '📝';
      case TipoPregunta.OPCION: return '☑️';
      case TipoPregunta.NUMERICA: return '🔢';
      default: return '❓';
    }
  }

  volver(): void {
    this.router.navigate(['/encuestas']);
  }
}
