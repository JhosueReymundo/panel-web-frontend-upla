import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComunicadoCard } from '../../components/comunicado-card/comunicado-card';
import { Comunicado } from '../../models/comunicado.interface';
import { Comunicadoservice } from '../../services/comunicadoservice';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-comunicado-list',
  imports: [CommonModule, RouterLink, ComunicadoCard],
  templateUrl: './comunicado-list.html',
  styleUrl: './comunicado-list.scss',
})
export class ComunicadoList implements OnInit {

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
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadComunicados();
  }

  loadComunicados(): void {
    this.loading = true;
    this.error = null;

    this.comunicadosService.getAll().subscribe({
      next: (data) => {
        this.comunicados = data;
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

   /* deleteComunicado(id: number): void {
    this.comunicadosService.delete(id).subscribe({
      next: () => {
        alert('Comunicado eliminado correctamente');
        this.loadComunicados();
      },
      error: (err) => {
        alert('Error al eliminar el comunicado');
        console.error('Error:', err);
      }
    });
  }

  toggleVisible(event: { id: number; esVisible: boolean }): void {
    const action = event.esVisible ? 'publicado' : 'ocultado';
    
    this.comunicadosService.toggleVisible(event.id, event.esVisible).subscribe({
      next: () => {
        const comunicado = this.comunicados.find(c => c.id === event.id);
        if (comunicado) {
          comunicado.esVisible = event.esVisible;
        }
        alert(`Comunicado ${action} correctamente`);
        this.aplicarFiltros();
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cambiar la visibilidad');
        console.error('Error:', err);
      }
    });
  }  */
  async deleteComunicado(id: number): Promise<void> {
    // Encontrar el comunicado para mostrar su nombre
    const comunicado = this.comunicados.find(c => c.id === id);
    if (!comunicado) return;

    // USAR DIALOG SERVICE PARA CONFIRMAR
    const confirmed = await this.dialogService.confirmDeleteDocumento(
      comunicado.titulo
    );

    if (!confirmed) return;

    // Si confirma, proceder con la eliminación
    this.comunicadosService.delete(id).subscribe({
      next: () => {
        // USAR DIALOG SERVICE PARA NOTIFICAR ÉXITO
        this.dialogService.documentoEliminado();
        this.loadComunicados();
      },
      error: (err) => {
        // USAR DIALOG SERVICE PARA ERROR
        this.dialogService.error('Error', 'No se pudo eliminar el comunicado');
        console.error('Error:', err);
      }
    });
  }

  async toggleVisible(event: { id: number; esVisible: boolean }): Promise<void> {
    const comunicado = this.comunicados.find(c => c.id === event.id);
    if (!comunicado) return;

    const action = event.esVisible ? 'publicar' : 'ocultar';
    const actionText = event.esVisible ? 'Publicar' : 'Ocultar';

    // USAR DIALOG SERVICE PARA CONFIRMAR
    const confirmed = await this.dialogService.confirmToggleDocumento(
      comunicado.titulo,
      event.esVisible
    );

    if (!confirmed) return;

    // Si confirma, proceder
    this.comunicadosService.toggleVisible(event.id, event.esVisible).subscribe({
      next: () => {
        // Actualizar estado local
        comunicado.esVisible = event.esVisible;
        
        // USAR DIALOG SERVICE PARA NOTIFICAR
        if (event.esVisible) {
          this.dialogService.documentoPublicado();
        } else {
          this.dialogService.documentoOculto();
        }
        
        this.aplicarFiltros();
        this.cd.detectChanges();
      },
      error: (err) => {
        // USAR DIALOG SERVICE PARA ERROR
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
