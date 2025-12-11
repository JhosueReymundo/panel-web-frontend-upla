import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsuarioForm } from '../../components/usuario-form/usuario-form';
import { CreateUsuarioDto, Dependencia, Escuela, Rol, UpdateUsuarioDto } from '../../models/usuario.interface';
import { Usuarioservice } from '../../services/usuarioservice';
import { Router } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-usuario-create',
  imports: [CommonModule, UsuarioForm],
  templateUrl: './usuario-create.html',
  styleUrl: './usuario-create.scss',
})
export class UsuarioCreate implements OnInit {

  loading = false;
  loadingData = true;
  
  roles: Rol[] = [];
  escuelas: Escuela[] = [];
  dependencias: Dependencia[] = [];

  constructor(
    private usuarioService: Usuarioservice,
    private router: Router,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {}

  ngOnInit(): void {
    this.loadFormData();
  }

  loadFormData(): void {
    this.usuarioService.getFormData().subscribe({
      next: (data) => {
        this.roles = data.roles;
        this.escuelas = data.escuelas;
        this.dependencias = data.dependencias;
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar los datos del formulario');
        this.loadingData = false;
        console.error('Error:', err);
        this.router.navigate(['/usuarios']);
      }
    });
  }

  onSubmit(data: CreateUsuarioDto | UpdateUsuarioDto): void {
    this.loading = true;

    this.usuarioService.create(data as CreateUsuarioDto).subscribe({
      next: () => {
        this.dialogService.usuarioCreado(); 
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        this.dialogService.errorCreacion('usuario');
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/usuarios']);
  }
}
