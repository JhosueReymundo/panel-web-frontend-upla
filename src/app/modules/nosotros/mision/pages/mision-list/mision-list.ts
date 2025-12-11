import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Mision } from '../../models/mision.model';
import { Misionservice } from '../../services/misionservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MisionCard } from '../../components/mision-card/mision-card';
import { Dialogservice } from '../../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-mision-list',
  imports: [CommonModule, RouterLink, MisionCard],
  templateUrl: './mision-list.html',
  styleUrl: './mision-list.scss',
})
export class MisionList implements OnInit {

  misiones: Mision[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private misionService: Misionservice,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadMisiones();
  }

  loadMisiones(): void {
    this.loading = true;
    this.error = null;

    this.misionService.getAll().subscribe({
      next: (data) => {
        // Ordenar: activa primero
        this.misiones = data.sort((a, b) => {
          if (a.isActive) return -1;
          if (b.isActive) return 1;
          return 0;
        });
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar las misiones';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

 /*  deleteMision(id: number): void {
    this.misionService.delete(id).subscribe({
      next: () => {
        alert('Misión eliminada correctamente');
        this.loadMisiones();
      },
      error: (err) => {
        alert('Error al eliminar la misión');
        console.error('Error:', err);
      }
    });
  } */

  activateMision(id: number): void {
    this.misionService.setActive(id).subscribe({
      next: () => {
        alert('Misión activada correctamente');
        this.loadMisiones();
      },
      error: (err) => {
        alert('Error al activar la misión');
        console.error('Error:', err);
      }
    });
  } 
 async deleteMision(id: number): Promise<void> {
    const mision = this.misiones.find(d => d.id === id);
    if (!mision) return;

    const confirmed = await this.dialogService.confirmDeletemision(
      mision.contenido
    );

    if (!confirmed) return;

    this.misionService.delete(id).subscribe({
      next: () => {
        this.dialogService.misionEliminado();
        this.loadMisiones();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo eliminar la mision');
        console.error('Error:', err);
      }
    });
  }

 /*  async toggleVisibility(event: { id: number; esVisible: boolean }): Promise<void> {
    const mision = this.misiones.find(d => d.id === event.id);
    if (!mision) return;

    const confirmed = await this.dialogService.confirmTogglemision(
      mision.contenido,
      event.esVisible
    );

    if (!confirmed) return;

    this.misionService.getActive(event.id, event.esVisible).subscribe({
      next: () => {

        mision.esVisible = event.esVisible;
        
        if (event.esVisible) {
          this.dialogService.misionPublicado();
        } else {
          this.dialogService.misionOculto();
        }

        this.cd.detectChanges();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo cambiar el estado de la mision');
        console.error('Error:', err);
      }
    });
  } */
}
