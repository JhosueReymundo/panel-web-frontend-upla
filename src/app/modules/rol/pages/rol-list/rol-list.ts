import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Rolservice } from '../../services/rolservice';
import { Rol } from '../../models/rol.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-rol-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './rol-list.html',
  styleUrl: './rol-list.scss',
})
export class RolList implements OnInit {

  roles: Rol[]=[];
  loading = false;
  error: string | null = null;
  deletingIds = new Set<number>();
  constructor(private rolService:Rolservice,
     private cd:ChangeDetectorRef, 
     private dialogService:Dialogservice,
     private ngZone: NgZone
    ){}

  ngOnInit(): void {
      this.loadRoles();
  }

  loadRoles():void{
    this.loading = true;
    this.error = null;

    this.rolService.getAll().subscribe({
      next:(data)=>{
        this.ngZone.run(()=>{
          this.roles=data;
          this.loading = false;
          this.cd.markForCheck();
        })
        
      }, error:(err)=>{
        this.ngZone.run(()=>{
          this.error = 'Error al cargar los roles';
          this.loading = false;
          this.cd.markForCheck();
        });
        this.dialogService.errorCarga('Roles');        
      }
    })
  }

  async deleteRol(id:number):Promise<void>{
    if (this.deletingIds.has(id)) {
      return;
    }

    const rol = this.roles.find(e => e.id === id);
    if (!rol) return;

    this.deletingIds.add(id);
    this.cd.markForCheck();

    try{
      const confirmed = await this.dialogService.confirmDeleteRol(rol.nombreRol);
      
      if (!confirmed) {
        this.deletingIds.delete(id);
        this.cd.markForCheck();
        return;
      }
      this.rolService.delete(id).subscribe({
        next:()=>{
          this.ngZone.run(()=>{
            this.deletingIds.delete(id);
            this.dialogService.rolEliminado();
            this.loadRoles();
            this.cd.markForCheck();
          });
        },
        error: (err) => {
          console.error('Error:', err);
          this.ngZone.run(() => {
            this.deletingIds.delete(id);
            this.dialogService.errorEliminacion('rol');
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
