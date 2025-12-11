import { ChangeDetectorRef, Component, NgZone, OnInit, signal } from '@angular/core';
import { Escuela } from '../../models/escuela.interface';
import { EscuelaService } from '../../services/escuelaService';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-escuela-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './escuela-list.html',
  styleUrl: './escuela-list.scss',
})
export class EscuelaList implements OnInit{

  escuelas: Escuela[] = [];
  loading = false;
  error: string | null = null;
  deletingIds = new Set<number>(); // ✅ Para rastrear qué se está eliminando

  constructor(
    private escuelaService: EscuelaService,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadEscuelas();
  }

  loadEscuelas(): void {
    this.loading = true;
    this.error = null;
    
    this.escuelaService.getAll().subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.escuelas = data;
          this.loading = false;
          this.cd.markForCheck(); // ✅ Marcar para revisión
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.error = 'Error al cargar las escuelas';
          this.loading = false;
          this.cd.markForCheck();
        });
        console.error('Error:', err);
        this.dialogService.errorCarga('escuelas');
      }
    });
  } 

  async deleteEscuela(id: number): Promise<void> {
    // ✅ Prevenir doble clic
    if (this.deletingIds.has(id)) {
      return;
    }

    const escuela = this.escuelas.find(e => e.id === id);
    if (!escuela) return;

    // ✅ Marcar como "en proceso de eliminación"
    this.deletingIds.add(id);
    this.cd.markForCheck();

    try {
      // ✅ Confirmar eliminación
      const confirmed = await this.dialogService.confirmDeleteEscuela(escuela.nombreEscuela);
      
      if (!confirmed) {
        // ✅ Remover del set si se cancela
        this.deletingIds.delete(id);
        this.cd.markForCheck();
        return;
      }

      // ✅ Proceder con eliminación
      this.escuelaService.delete(id).subscribe({
        next: () => {
          this.ngZone.run(() => {
            this.deletingIds.delete(id);
            this.dialogService.escuelaEliminada();
            this.loadEscuelas();
            //this.cd.markForCheck();            
          });
        },
        error: (err) => {
          console.error('Error:', err);
          this.ngZone.run(() => {
            this.deletingIds.delete(id);
            this.dialogService.errorEliminacion('escuela');
            this.cd.markForCheck();
          });
        }
      });
    } catch (error) {
      // ✅ Manejo de errores inesperados
      this.deletingIds.delete(id);
      this.cd.markForCheck();
    }
  }

  // ✅ Método helper para verificar si está eliminando
  isDeleting(id: number): boolean {
    return this.deletingIds.has(id);
  }
  
}
