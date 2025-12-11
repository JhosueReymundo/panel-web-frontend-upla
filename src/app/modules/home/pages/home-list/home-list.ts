import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeCard } from '../../components/home-card/home-card';
import { Home } from '../../model/home.interface';
import { Homeservice } from '../../services/homeservice';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-home-list',
  imports: [CommonModule, RouterLink, HomeCard],
  templateUrl: './home-list.html',
  styleUrl: './home-list.scss',
})
export class HomeList implements OnInit {
   homeHeros: Home[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private homeService: Homeservice,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadHomeHeros();
  }

  loadHomeHeros(): void {
    this.loading = true;
    this.error = null;

    this.homeService.getAll().subscribe({
      next: (data) => {
        this.homeHeros = data;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los heros';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  /* deleteHome(id: number): void {
    this.homeService.delete(id).subscribe({
      next: () => {
        alert('Hero eliminado correctamente');
        this.loadHomeHeros();
      },
      error: (err) => {
        alert('Error al eliminar el hero');
        console.error('Error:', err);
      }
    });
  }

  toggleVisible(event: { id: number; esVisible: boolean }): void {
    const action = event.esVisible ? 'publicado' : 'ocultado';
    
    this.homeService.toggleVisible(event.id, event.esVisible).subscribe({
      next: () => {
        const home = this.homeHeros.find(h => h.id === event.id);
        if (home) {
          home.esVisible = event.esVisible;
        }
        alert(`Hero ${action} correctamente`);
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cambiar la visibilidad');
        console.error('Error:', err);
      }
    });
  } */

  async deleteHome(id: number): Promise<void> {
    const home = this.homeHeros.find(d => d.id === id);
    if (!home) return;

    const confirmed = await this.dialogService.confirmDeleteDocumento(
      home.titulo
    );

    if (!confirmed) return;

    this.homeService.delete(id).subscribe({
      next: () => {
        this.dialogService.homeEliminado();
        this.loadHomeHeros();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo eliminar la portada');
        console.error('Error:', err);
      }
    });
  }

  async toggleVisible(event: { id: number; esVisible: boolean }): Promise<void> {
    const home = this.homeHeros.find(d => d.id === event.id);
    if (!home) return;

    const confirmed = await this.dialogService.confirmTogglehorario(
      home.titulo,
      event.esVisible
    );

    if (!confirmed) return;

    this.homeService.toggleVisible(event.id, event.esVisible).subscribe({
      next: () => {

        home.esVisible = event.esVisible;
        
        if (event.esVisible) {
          this.dialogService.homePublicado();
        } else {
          this.dialogService.homeOculto();
        }

        this.cd.detectChanges();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo cambiar el estado de la portada');
        console.error('Error:', err);
      }
    });
  }
}
