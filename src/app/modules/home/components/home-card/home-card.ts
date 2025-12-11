import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Home } from '../../model/home.interface';
import { Homeservice } from '../../services/homeservice';

@Component({
  selector: 'app-home-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './home-card.html',
  styleUrl: './home-card.scss',
})
export class HomeCard {
  @Input() home!: Home;
  @Output() delete = new EventEmitter<number>();
  @Output() toggleVisible = new EventEmitter<{ id: number; esVisible: boolean }>();

  constructor(private homeService: Homeservice) {}

  onDelete(): void {
    /* if (confirm(`¿Estás seguro de eliminar "${this.home.titulo}"?`)) {
      this.delete.emit(this.home.id);
    } */
    this.delete.emit(this.home.id);
  }

  onToggleVisible(): void {
    const newStatus = !this.home.esVisible;
    /* const action = newStatus ? 'publicar' : 'ocultar';
    
    if (confirm(`¿Estás seguro de ${action} "${this.home.titulo}"?`)) {
      this.toggleVisible.emit({ 
        id: this.home.id, 
        esVisible: newStatus 
      });
    } */
    this.toggleVisible.emit({ 
        id: this.home.id, 
        esVisible: newStatus 
      });
  }

  onViewImage(): void {
    if (this.home.imagenFondo) {
      const url = this.homeService.getImagenUrl(this.home.imagenFondo);
      window.open(url, '_blank');
    }
  }

  getImageUrl(): string | null {
    if (!this.home.imagenFondo) return null;
    return this.homeService.getImagenUrl(this.home.imagenFondo);
  }

  getImageFileName(): string {
    if (!this.home.imagenFondo) return 'Sin imagen';
    const parts = this.home.imagenFondo.split('/');
    return parts[parts.length - 1];
  }
}
