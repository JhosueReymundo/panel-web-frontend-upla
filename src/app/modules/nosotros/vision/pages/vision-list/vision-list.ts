import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Vision } from '../../models/vision.model';
import { Visionservice } from '../../services/visionservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VisionCard } from '../../components/vision-card/vision-card';
import { Dialogservice } from '../../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-vision-list',
  imports: [CommonModule, RouterLink, VisionCard],
  templateUrl: './vision-list.html',
  styleUrl: './vision-list.scss',
})
export class VisionList {
  visiones: Vision[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private visionService: Visionservice,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadVisiones();
  }

  loadVisiones(): void {
    this.loading = true;
    this.error = null;

    this.visionService.getAll().subscribe({
      next: (data) => {
        // Ordenar: activa primero
        this.visiones = data.sort((a, b) => {
          if (a.isActive) return -1;
          if (b.isActive) return 1;
          return 0;
        });
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar las visiones';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

 /*  deleteVision(id: number): void {
    this.visionService.delete(id).subscribe({
      next: () => {
        alert('Visión eliminada correctamente');
        this.loadVisiones();
      },
      error: (err) => {
        alert('Error al eliminar la Visión');
        console.error('Error:', err);
      }
    });
  } */
 async deleteVision(id: number): Promise<void> {
    const vision = this.visiones.find(d => d.id === id);
    if (!vision) return;

    const confirmed = await this.dialogService.confirmDeletevision(
      vision.contenido
    );

    if (!confirmed) return;

    this.visionService.delete(id).subscribe({
      next: () => {
        this.dialogService.visionEliminado();
        this.loadVisiones();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo eliminar la vision');
      }
    });
  }

  activateVision(id: number): void {
    this.visionService.setActive(id).subscribe({
      next: () => {
        alert('Visión activada correctamente');
        this.loadVisiones();
      },
      error: (err) => {
        alert('Error al activar la Visión');
        console.error('Error:', err);
      }
    });
  }
}
