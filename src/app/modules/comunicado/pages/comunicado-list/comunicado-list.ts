import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComunicadoCard } from '../../components/comunicado-card/comunicado-card';
import { Comunicado } from '../../models/comunicado.interface';
import { Comunicadoservice } from '../../services/comunicadoservice';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';
import { Authservice } from '../../../auth/services/authservice';

@Component({
  selector: 'app-comunicado-list',
  imports: [CommonModule, RouterLink, ComunicadoCard],
  templateUrl: './comunicado-list.html',
  styleUrl: './comunicado-list.scss',
})
export class ComunicadoList implements OnInit {


  soloMios: boolean = false;
  escuelaSeleccionada: number | null = null;
  oficinaSeleccionada: string | null = null;

  escuelas: { id: number; nombre: string }[] = [];
  oficinas: string[] = [];

  comunicados: Comunicado[] = [];
  comunicadosFiltrados: Comunicado[] = [];
  loading = false;
  error: string | null = null;
  
  // Filtros
  filtroVisibilidad: string = 'todos';
  searchTerm: string = '';

  constructor(
    private comunicadosService: Comunicadoservice,
    private cd: ChangeDetectorRef,
    private dialogService:Dialogservice,
    private ngZone: NgZone,
    private authService: Authservice
  ) {}

  ngOnInit(): void {
    this.loadComunicados();
  }

  puedeModificar(comunicado: Comunicado): boolean {
    return this.authService.isAdmin() || comunicado.autor.id === this.authService.getUserId();
  }

  loadComunicados(): void {
    this.loading = true;
    this.error = null;

    this.comunicadosService.getAll().subscribe({
      next: (data) => {
        this.comunicados = data;

        this.escuelas = Array.from(
          new Map(
            data
              .filter(c => c.autor.escuela)
              .map(c => [
                c.autor.escuela!.id,
                {
                  id: c.autor.escuela!.id,
                  nombre: c.autor.escuela!.nombreEscuela
                }
              ])
          ).values()
        );

        this.oficinas = Array.from(
          new Set(
            data
              .map(c => c.autor.oficina)
              .filter(o => o && o.trim() !== '')
          )
        );


        this.aplicarFiltros();
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los comunicados';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  aplicarFiltros(): void {
    let resultado = [...this.comunicados];

    // 🔹 Mis comunicados
    if (this.soloMios) {
      const userId = this.authService.getUserId();
      resultado = resultado.filter(c => c.autor.id === userId);
    }

    // 🔹 Por escuela
    if (this.escuelaSeleccionada) {
      resultado = resultado.filter(
        c => c.autor.escuela?.id === this.escuelaSeleccionada
      );
    }

    // 🔹 Por oficina
    if (this.oficinaSeleccionada) {
      resultado = resultado.filter(
        c => c.autor.oficina === this.oficinaSeleccionada
      );
    }
    // Filtrar por visibilidad
    if (this.filtroVisibilidad === 'visible') {
      resultado = resultado.filter(c => c.esVisible);
    } else if (this.filtroVisibilidad === 'oculto') {
      resultado = resultado.filter(c => !c.esVisible);
    }

    // Filtrar por búsqueda
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      resultado = resultado.filter(c => 
        c.titulo.toLowerCase().includes(term) ||
        c.contenido.toLowerCase().includes(term) ||
        `${c.autor.nombre} ${c.autor.apellido}`.toLowerCase().includes(term)
      );
    }

    this.comunicadosFiltrados = resultado;
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


  /* Esta parte estoy agregando, quitar si no funciona */
  toggleSoloMios(): void {
    this.soloMios = !this.soloMios;
    this.aplicarFiltros();
  }

  onEscuelaChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.escuelaSeleccionada = select.value ? Number(select.value) : null;

    // Si selecciona escuela, limpiamos oficina
    if (this.escuelaSeleccionada) {
      this.oficinaSeleccionada = null;
    }

    this.aplicarFiltros();
  }

  onOficinaChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.oficinaSeleccionada = select.value || null;

    // Si selecciona oficina, limpiamos escuela
    if (this.oficinaSeleccionada) {
      this.escuelaSeleccionada = null;
    }

    this.aplicarFiltros();
  }
  /* hasta qui */

   
  async deleteComunicado(id: number): Promise<void> {
    // Encontrar el comunicado para mostrar su nombre
    const comunicado = this.comunicados.find(c => c.id === id);
    if (!comunicado) return;

    if (!this.puedeModificar(comunicado)) {
      this.dialogService.error(
        'No autorizado',
        'Solo puedes eliminar comunicados que tú creaste'
      );
      return;
    }

    const confirmed = await this.dialogService.confirmDeleteDocumento(
      comunicado.titulo
    );

    if (!confirmed) return;

    this.comunicadosService.delete(id).subscribe({
      next: () => {
        this.dialogService.documentoEliminado();
        this.loadComunicados();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo eliminar el comunicado');
        console.error('Error:', err);
      }
    });
  }

  async toggleVisible(event: { id: number; esVisible: boolean }): Promise<void> {
    const comunicado = this.comunicados.find(c => c.id === event.id);
    if (!comunicado) return;

    if (!this.puedeModificar(comunicado)) {
      this.dialogService.error(
        'No autorizado',
        'No puedes cambiar la visibilidad de este comunicado'
      );
      return;
    }

    const action = event.esVisible ? 'publicar' : 'ocultar';
    const actionText = event.esVisible ? 'Publicar' : 'Ocultar';

    const confirmed = await this.dialogService.confirmToggleDocumento(
      comunicado.titulo,
      event.esVisible
    );

    if (!confirmed) return;

    this.comunicadosService.toggleVisible(event.id, event.esVisible).subscribe({
      next: () => {
        comunicado.esVisible = event.esVisible;
        
        if (event.esVisible) {
          this.dialogService.documentoPublicado();
        } else {
          this.dialogService.documentoOculto();
        }
        
        this.aplicarFiltros();
        this.cd.detectChanges();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo cambiar la visibilidad');
        console.error('Error:', err);
      }
    });
  }

  get estadisticas() {
    return {
      total: this.comunicados.length,
      visibles: this.comunicados.filter(c => c.esVisible).length,
      ocultos: this.comunicados.filter(c => !c.esVisible).length
    };
  }
}
