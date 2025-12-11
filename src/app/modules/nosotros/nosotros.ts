import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

interface SeccionMenu {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  ruta: string;
  color: string;
}
@Component({
  selector: 'app-nosotros',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.scss',
})
export class Nosotros{
  seccionSeleccionada: string | null = null;

  secciones: SeccionMenu[] = [
    {
      id: 'equipo',
      titulo: 'Equipo',
      descripcion: 'Gestiona los miembros del equipo',
      icono: '👥',
      ruta: '/nosotros/equipo',
      color: '#3b82f6'
    },
    {
      id: 'mision',
      titulo: 'Misión',
      descripcion: 'Administra la misión institucional',
      icono: '🎯',
      ruta: '/nosotros/mision',
      color: '#10b981'
    },
    {
      id: 'vision',
      titulo: 'Visión',
      descripcion: 'Define la visión a futuro',
      icono: '🔭',
      ruta: '/nosotros/vision',
      color: '#8b5cf6'
    },
    {
      id: 'valores',
      titulo: 'Valores',
      descripcion: 'Establece los valores institucionales',
      icono: '⭐',
      ruta: '/nosotros/valores',
      color: '#f59e0b'
    }
  ];

  constructor(private router: Router) {
    // Verificar ruta actual para marcar sección activa
    const rutaActual = this.router.url;
    const seccionActiva = this.secciones.find(s => rutaActual.includes(s.id));
    if (seccionActiva) {
      this.seccionSeleccionada = seccionActiva.id;
    }
  }

  navegarA(seccion: SeccionMenu): void {
    this.seccionSeleccionada = seccion.id;
    this.router.navigate([seccion.ruta]);
  }

  estaActiva(id: string): boolean {
    return this.seccionSeleccionada === id;
  }
}