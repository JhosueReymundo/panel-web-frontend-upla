import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServicioCard } from '../../components/servicio-card/servicio-card';
import { Servicio } from '../../models/servicio.interface';
import { Servicioservice } from '../../services/servicioservice';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-servicio-list',
  imports: [CommonModule, RouterLink, ServicioCard],
  templateUrl: './servicio-list.html',
  styleUrl: './servicio-list.scss',
})
export class ServicioList implements OnInit {

  servicios: Servicio[] = [];
  loading = false;
  error: string | null = null;
  showHidden = true; // Mostrar servicios ocultos por defecto

  constructor(private servicioService: Servicioservice, private cd:ChangeDetectorRef, 
    private dialogService: Dialogservice,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadServicios();
  }

  loadServicios(): void {
    this.loading = true;
    this.error = null;

    const request = this.showHidden 
      ? this.servicioService.getAllAdmin() 
      : this.servicioService.getAll();
    
    request.subscribe({
      next: (data) => {
        this.servicios = data;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los servicios';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  toggleShowHidden(): void {
    this.showHidden = !this.showHidden;
    this.loadServicios();
  }

  /* deleteServicio(id: number): void {
    this.servicioService.delete(id).subscribe({
      next: () => {
        alert('Servicio ocultado correctamente');
        this.loadServicios();
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al eliminar el servicio');
        console.error('Error:', err);
      }
    });
  }

  toggleVisibility(event: { id: number; esVisible: boolean }): void {
    const action = event.esVisible ? 'publicado' : 'ocultado';
    
    this.servicioService.toggleVisibility(event.id, event.esVisible).subscribe({
      next: () => {
        // Actualizar localmente sin recargar todo
        const servicio = this.servicios.find(s => s.id === event.id);
        if (servicio) {
          servicio.esVisible = event.esVisible;
        }
        
        alert(`Servicio ${action} correctamente`);
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cambiar la visibilidad del servicio');
        console.error('Error:', err);
      }
    });
  } */
 async deleteServicio(id: number): Promise<void> {
    const servicio = this.servicios.find(d => d.id === id);
    if (!servicio) return;

    const confirmed = await this.dialogService.confirmDeleteservicio(
      servicio.titulo
    );

    if (!confirmed) return;

    this.servicioService.deletePermanent(id).subscribe({
      next: () => {
        this.dialogService.servicioEliminado();
        this.loadServicios();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo eliminar el servicio');
      }
    });
  }

  async toggleVisibility(event: { id: number; esVisible: boolean }): Promise<void> {
    const servicio = this.servicios.find(d => d.id === event.id);
    if (!servicio) return;

    const confirmed = await this.dialogService.confirmToggleservicio(
      servicio.titulo,
      event.esVisible
    );

    if (!confirmed) return;

    this.servicioService.toggleVisibility(event.id, event.esVisible).subscribe({
      next: () => {

        servicio.esVisible = event.esVisible;
        
        if (event.esVisible) {
          this.dialogService.servicioPublicado();
        } else {
          this.dialogService.servicioOculto();
        }

        this.cd.detectChanges();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo cambiar el estado del servicio');
        console.error('Error:', err);
      }
    });
  }
}
