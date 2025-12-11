import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsuarioForm } from '../../components/usuario-form/usuario-form';
import { CommonModule } from '@angular/common';
import { Dependencia, Escuela, Rol, UpdateUsuarioDto, Usuario } from '../../models/usuario.interface';
import { Usuarioservice } from '../../services/usuarioservice';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-usuario-edit',
  imports: [CommonModule, UsuarioForm],
  templateUrl: './usuario-edit.html',
  styleUrl: './usuario-edit.scss',
})
export class UsuarioEdit implements OnInit {

  usuario?: Usuario;
  loading = false;
  loadingData = true;
  usuarioId!: number;
  
  roles: Rol[] = [];
  escuelas: Escuela[] = [];
  dependencias: Dependencia[] = [];

  constructor(
    private usuarioService: Usuarioservice,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {}

  ngOnInit(): void {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData(): void {
    // Cargar usuario y datos del formulario en paralelo
    forkJoin({
      usuario: this.usuarioService.getById(this.usuarioId),
      formData: this.usuarioService.getFormData()
    }).subscribe({
      next: (data) => {
        this.usuario = data.usuario;
        this.roles = data.formData.roles;
        this.escuelas = data.formData.escuelas;
        this.dependencias = data.formData.dependencias;
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar los datos');
        this.loadingData = false;
        console.error('Error:', err);
        this.router.navigate(['/usuarios']);
      }
    });
  }

  onSubmit(data: UpdateUsuarioDto): void {
    this.loading = true;

    this.usuarioService.update(this.usuarioId, data).subscribe({
     next: () => {
        this.dialogService.usuarioActualizado();
        this.router.navigate(['usuarios']);
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorActualizacion('usuario');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/usuarios']);
  }
}
