import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioTable } from '../../components/usuario-table/usuario-table';
import { Usuario } from '../../models/usuario.interface';
import { Usuarioservice } from '../../services/usuarioservice';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-usuario-list',
  imports: [CommonModule, RouterLink, UsuarioTable],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.scss',
})
export class UsuarioList implements OnInit{

   usuarios: Usuario[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private usuarioService: Usuarioservice,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    this.error = null;

    this.usuarioService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los usuarios';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  /* deleteUsuario(id: number): void {
    this.usuarioService.delete(id).subscribe({
      next: () => {
        alert('Usuario eliminado correctamente');
        this.loadUsuarios();
      },
      error: (err) => {
        alert('Error al eliminar el usuario');
        console.error('Error:', err);
      }
    });
  }

  toggleActivo(event: { id: number; esActivo: boolean }): void {
    const action = event.esActivo ? 'activado' : 'desactivado';
    
    this.usuarioService.toggleActivo(event.id, event.esActivo).subscribe({
      next: () => {
        const usuario = this.usuarios.find(u => u.id === event.id);
        if (usuario) {
          usuario.esActivo = event.esActivo;
        }
        alert(`Usuario ${action} correctamente`);
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cambiar el estado');
        console.error('Error:', err);
      }
    });
  } */

    async deleteUsuario(id: number): Promise<void> {
    const usuario = this.usuarios.find(d => d.id === id);
    if (!usuario) return;

    const confirmed = await this.dialogService.confirmDeleteUsuario(
      usuario.nombre
    );

    if (!confirmed) return;

    this.usuarioService.delete(id).subscribe({
      next: () => {
        this.dialogService.usuarioEliminado();
        this.loadUsuarios();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo eliminar el usuario');
      }
    });
  }

  async toggleActivo(event: { id: number; esActivo: boolean }): Promise<void> {
    const usuario = this.usuarios.find(d => d.id === event.id);
    if (!usuario) return;

    const confirmed = await this.dialogService.confirmToggleUsuario(
      usuario.nombre,
      event.esActivo
    );

    if (!confirmed) return;

    this.usuarioService.toggleActivo(event.id, event.esActivo).subscribe({
      next: () => {

        usuario.esActivo = event.esActivo;
        
        if (event.esActivo) {
          this.dialogService.usuarioActivado();
        } else {
          this.dialogService.usuarioDesactivado();
        }

        this.cd.detectChanges();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo cambiar el estado del usuario');
        console.error('Error:', err);
      }
    });
  }
}
