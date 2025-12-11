import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EncuestaCard } from '../../components/encuesta-card/encuesta-card';
import { Encuesta, EstadoEncuesta } from '../../models/encuesta.interface';
import { Encuestaservice } from '../../services/encuestaservice';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-encuesta-list',
  imports: [CommonModule, RouterLink, EncuestaCard],
  templateUrl: './encuesta-list.html',
  styleUrl: './encuesta-list.scss',
})
export class EncuestaList implements OnInit {

  encuestas: Encuesta[] = [];
  encuestasFiltradas: Encuesta[] = [];
  loading = false;
  error: string | null = null;
  
  filtroEstado: string = 'todos';
  filtroVisibilidad: string = 'todos';
  searchTerm: string = '';

  constructor(
    private encuestasService: Encuestaservice,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadEncuestas();
  }

  loadEncuestas(): void {
    this.loading = true;
    this.error = null;

    this.encuestasService.getAll().subscribe({
      next: (data) => {
        this.encuestas = data;
        this.aplicarFiltros();
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar las encuestas';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  aplicarFiltros(): void {
    let resultado = [...this.encuestas];

    if (this.filtroEstado !== 'todos') {
      resultado = resultado.filter(e => e.estado === this.filtroEstado);
    }

    if (this.filtroVisibilidad === 'visible') {
      resultado = resultado.filter(e => e.esVisible);
    } else if (this.filtroVisibilidad === 'oculto') {
      resultado = resultado.filter(e => !e.esVisible);
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      resultado = resultado.filter(e => 
        e.nombre.toLowerCase().includes(term) ||
        (e.descripcion && e.descripcion.toLowerCase().includes(term))
      );
    }

    this.encuestasFiltradas = resultado;
  }

  onFiltroEstadoChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filtroEstado = select.value;
    this.aplicarFiltros();
  }

  onFiltroVisibilidadChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.filtroVisibilidad = select.value;
    this.aplicarFiltros();
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.aplicarFiltros();
  }

  /* deleteEncuesta(id: number): void {
    this.encuestasService.delete(id).subscribe({
      next: () => {
        alert('Encuesta eliminada correctamente');
        this.loadEncuestas();
      },
      error: (err) => {
        alert('Error al eliminar la encuesta');
        console.error('Error:', err);
      }
    });
  }

  toggleVisible(event: { id: number; esVisible: boolean }): void {
    this.encuestasService.toggleVisibilidad(event.id, event.esVisible).subscribe({
      next: () => {
        const encuesta = this.encuestas.find(e => e.id === event.id);
        if (encuesta) {
          encuesta.esVisible = event.esVisible;
        }
        alert(`Encuesta ${event.esVisible ? 'publicada' : 'ocultada'} correctamente`);
        this.aplicarFiltros();
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cambiar la visibilidad');
        console.error('Error:', err);
      }
    });
  } */

  async deleteEncuesta(id: number): Promise<void> {
    const encuesta = this.encuestas.find(d => d.id === id);
    if (!encuesta) return;

    const confirmed = await this.dialogService.confirmDeleteencuesta(
      encuesta.nombre
    );

    if (!confirmed) return;

    this.encuestasService.delete(id).subscribe({
      next: () => {
        this.dialogService.encuestaEliminado();
        this.loadEncuestas();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo eliminar la encuesta');
        console.error('Error:', err);
      }
    });
  }

  async toggleVisible(event: { id: number; esVisible: boolean }): Promise<void> {
    const encuesta = this.encuestas.find(d => d.id === event.id);
    if (!encuesta) return;

    const confirmed = await this.dialogService.confirmToggleencuesta(
      encuesta.nombre,
      event.esVisible
    );

    if (!confirmed) return;

    this.encuestasService.toggleVisibilidad(event.id, event.esVisible).subscribe({
      next: () => {

        encuesta.esVisible = event.esVisible;
        
        if (event.esVisible) {
          this.dialogService.encuestaPublicado();
        } else {
          this.dialogService.encuestaOculto();
        }

        this.cd.detectChanges();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo cambiar el estado de la encuesta');
        console.error('Error:', err);
      }
    });
  }

  cambiarEstado(event: { id: number; estado: EstadoEncuesta }): void {
    this.encuestasService.cambiarEstado(event.id, event.estado).subscribe({
      next: () => {
        alert(`Estado cambiado a "${event.estado}" correctamente`);
        this.loadEncuestas();
      },
      error: (err) => {
        alert('Error al cambiar el estado');
        console.error('Error:', err);
      }
    });
  }

  get estadisticas() {
    return {
      total: this.encuestas.length,
      activas: this.encuestas.filter(e => e.estado === EstadoEncuesta.ACTIVA).length,
      borradores: this.encuestas.filter(e => e.estado === EstadoEncuesta.BORRADOR).length,
      visibles: this.encuestas.filter(e => e.esVisible).length
    };
  }
}
