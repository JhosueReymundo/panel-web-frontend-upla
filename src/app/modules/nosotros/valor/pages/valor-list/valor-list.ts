import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Valor } from '../../models/valor.interface';
import { Valorservice } from '../../services/valorservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ValorCard } from '../../components/valor-card/valor-card';
import { Dialogservice } from '../../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-valor-list',
  imports: [CommonModule, RouterLink, ValorCard],
  templateUrl: './valor-list.html',
  styleUrl: './valor-list.scss',
})
export class ValorList implements OnInit {
  valores: Valor[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private valoresService: Valorservice,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadValores();
  }

  loadValores(): void {
    this.loading = true;
    this.error = null;

    this.valoresService.getAll().subscribe({
      next: (data) => {
        this.valores = data.sort((a, b) => a.orden - b.orden);
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los valores';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

 /*  deleteValor(id: number): void {
    this.valoresService.delete(id).subscribe({
      next: () => {
        alert('Valor eliminado correctamente');
        this.loadValores();
      },
      error: (err) => {
        alert('Error al eliminar el valor');
        console.error('Error:', err);
      }
    });
  }

  toggleVisibility(event: { id: number; isVisible: boolean }): void {
    this.valoresService.toggleVisibility(event.id, event.isVisible).subscribe({
      next: () => {
        const valor = this.valores.find(v => v.id === event.id);
        if (valor) {
          valor.isVisible = event.isVisible;
        }
        alert(`Valor ${event.isVisible ? 'publicado' : 'ocultado'} correctamente`);
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cambiar la visibilidad');
        console.error('Error:', err);
      }
    });
  } */

    async deleteValor(id: number): Promise<void> {
    const valor = this.valores.find(d => d.id === id);
    if (!valor) return;

    const confirmed = await this.dialogService.confirmDeletevalor(
      valor.titulo
    );

    if (!confirmed) return;

    this.valoresService.delete(id).subscribe({
      next: () => {
        this.dialogService.valorEliminado();
        this.loadValores();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo eliminar el valor');
        console.error('Error:', err);
      }
    });
  }

  async toggleVisibility(event: { id: number; isVisible: boolean }): Promise<void> {
    const valor = this.valores.find(d => d.id === event.id);
    if (!valor) return;

    const confirmed = await this.dialogService.confirmTogglevalor(
      valor.titulo,
      event.isVisible
    );

    if (!confirmed) return;

    this.valoresService.toggleVisibility(event.id, event.isVisible).subscribe({
      next: () => {

        valor.isVisible = event.isVisible;
        
        if (event.isVisible) {
          this.dialogService.valorPublicado();
        } else {
          this.dialogService.valorOculto();
        }

        this.cd.detectChanges();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo cambiar el estado del valor');
        console.error('Error:', err);
      }
    });
  }
}
