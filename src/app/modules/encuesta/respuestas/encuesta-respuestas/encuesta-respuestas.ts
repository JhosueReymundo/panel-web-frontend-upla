import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Encuesta, Respuesta, TipoPregunta } from '../../models/encuesta.interface';
import { Encuestaservice } from '../../services/encuestaservice';

@Component({
  selector: 'app-encuesta-respuestas',
  imports: [CommonModule],
  templateUrl: './encuesta-respuestas.html',
  styleUrl: './encuesta-respuestas.scss',
})
export class EncuestaRespuestas implements OnInit {

  encuesta: Encuesta | null = null;
  respuestas: Respuesta[] = [];
  estadisticas: any = null;
  loading = true;
  vistaActual: 'respuestas' | 'estadisticas' = 'respuestas';
  TipoPregunta = TipoPregunta;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encuestaService: Encuestaservice
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.cargarDatos(id);
    }
  }

  cargarDatos(encuestaId: number): void {
    this.loading = true;

    // Cargar encuesta
    this.encuestaService.getById(encuestaId).subscribe({
      next: (encuesta) => {
        this.encuesta = encuesta;
      },
      error: (err) => {
        console.error('Error al cargar encuesta:', err);
        alert('Error al cargar la encuesta');
        this.router.navigate(['/encuestas']);
      },
    });

    // Cargar respuestas
    this.encuestaService.getRespuestasByEncuesta(encuestaId).subscribe({
      next: (respuestas) => {
        this.respuestas = respuestas;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar respuestas:', err);
        this.loading = false;
      },
    });

    // Cargar estadísticas
    this.encuestaService.getEstadisticas(encuestaId).subscribe({
      next: (stats) => {
        this.estadisticas = stats;
      },
      error: (err) => {
        console.error('Error al cargar estadísticas:', err);
      },
    });
  }

  cambiarVista(vista: 'respuestas' | 'estadisticas'): void {
    this.vistaActual = vista;
  }

  getFechaRespuesta(fecha: Date): string {
    return new Date(fecha).toLocaleString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  getRespuestaTexto(respuesta: Respuesta, preguntaId: number): string {
    const detalle = respuesta.detalles.find((d) => d.pregunta_id === preguntaId);
    if (!detalle) return 'Sin respuesta';

    const pregunta = this.encuesta?.preguntas.find((p) => p.id === preguntaId);
    if (!pregunta) return 'Sin respuesta';

    switch (pregunta.tipo) {
      case TipoPregunta.ABIERTA:
        return detalle.texto || 'Sin respuesta';
      case TipoPregunta.OPCION:
        const opcion = pregunta.opciones.find((o) => o.id === detalle.opcion_id);
        return opcion?.texto || 'Sin respuesta';
      case TipoPregunta.NUMERICA:
        return detalle.valor_numerico?.toString() || 'Sin respuesta';
      default:
        return 'Sin respuesta';
    }
  }

  exportarCSV(): void {
    if (!this.encuesta || !this.respuestas.length) return;

    // Crear encabezados
    const headers = [
      'ID',
      'Email',
      'Código Estudiante',
      'Escuela',
      'Ciclo',
      'Fecha',
      ...this.encuesta.preguntas.map((p) => `P${p.orden}: ${p.texto}`),
    ];

    // Crear filas
    const rows = this.respuestas.map((r) => [
      r.id,
      r.email,
      r.codigo_estudiante,
      r.escuela?.nombreEscuela || '',
      r.ciclo,
      this.getFechaRespuesta(r.creado_en),
      ...this.encuesta!.preguntas.map((p) => this.getRespuestaTexto(r, p.id)),
    ]);

    // Generar CSV
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    // Descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `respuestas_${this.encuesta.nombre}_${new Date().getTime()}.csv`;
    link.click();
  }

  volver(): void {
    this.router.navigate(['/encuestas']);
  }
}
