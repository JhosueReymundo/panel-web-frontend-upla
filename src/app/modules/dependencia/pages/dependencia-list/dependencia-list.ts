import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Dependencia } from '../../models/dependencia.interface';
import { DependenciaService } from '../../services/dependencia-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-dependencia-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './dependencia-list.html',
  styleUrl: './dependencia-list.scss',
})
export class DependenciaList implements OnInit{

  dependencias: Dependencia[] = [];
  loading = false;
  error: string | null = null;
  deletingIds = new Set<number>();
  
  constructor(private dependenciaService: DependenciaService, private cd: ChangeDetectorRef,
     private dialogService: Dialogservice,
     private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadDependencias();
  }

  loadDependencias(): void {
    this.loading = true;
    this.error = null;

    this.dependenciaService.getAll().subscribe({
      next: (data) => {
        this.dependencias = data;
        this.loading = false;
        this.cd.detectChanges(); 
      }, 
      error: (err) => {
        this.error = 'Error al cargar las dependencias';
        this.loading = false;
      }
    });
  }


  async deleteDependencia(id:number):Promise<void>{
    if (this.deletingIds.has(id)) {
      return;
    }

    const dependencia = this.dependencias.find(e => e.id === id);
    if (!dependencia) return;

    this.deletingIds.add(id);
    this.cd.markForCheck();

    try{
      const confirmed = await this.dialogService.confirmDeleteDependencia(dependencia.nombre);
      
      if (!confirmed) {
        this.deletingIds.delete(id);
        this.cd.markForCheck();
        return;
      }
      this.dependenciaService.delete(id).subscribe({
        next:()=>{
          this.ngZone.run(()=>{
            this.deletingIds.delete(id);
            this.dialogService.dependenciaEliminada();
            this.loadDependencias();
            this.cd.markForCheck();
          });
        },
        error: (err) => {
          console.error('Error:', err);
          this.ngZone.run(() => {
            this.deletingIds.delete(id);
            this.dialogService.errorEliminacion('dependencia');
            this.cd.markForCheck();
          });
        }
      })
    }catch(error){
      this.deletingIds.delete(id);
      this.cd.markForCheck();
    }   
  }
  isDeleting(id: number): boolean {
    return this.deletingIds.has(id);
  }

}
