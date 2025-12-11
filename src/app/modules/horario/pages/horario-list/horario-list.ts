import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Horario } from '../../models/horario.interface';
import { Horarioservice } from '../../services/horarioservice';
import { HorarioCard } from '../../components/horario-card/horario-card';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-horario-list',
  imports: [CommonModule, RouterLink, HorarioCard],
  templateUrl: './horario-list.html',
  styleUrl: './horario-list.scss',
})
export class HorarioList implements OnInit {

  horarios: Horario[]=[];
  loading = false;
  error: string | null = null;

  constructor(private horarioService:Horarioservice, private cd:ChangeDetectorRef, 
    private dialogService: Dialogservice,
    private ngZone: NgZone
  ){}

  ngOnInit(): void {
      this.loadHorarios();
  }

  loadHorarios():void{
    this.loading = true;
    this.error = null;

    this.horarioService.getAll().subscribe({
      next:(data)=>{
        this.horarios=data;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los documentos';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  /* deleteHorario(id: number): void {
    this.horarioService.delete(id).subscribe({
      next: () => {
        alert('Documento eliminado correctamente');
        this.loadHorarios();
      },
      error: (err) => {
        alert('Error al eliminar el documento');
        console.error('Error:', err);
      }
    });
  }

  toggleActivo(event: { id: number; esVisible: boolean }): void {
    const action = event.esVisible ? 'activado' : 'desactivado';
    
    this.horarioService.toggleActivo(event.id, event.esVisible).subscribe({
      next: () => {
        const horario = this.horarios.find(d => d.id === event.id);
        if (horario) {
          horario.esVisible = event.esVisible;
        }
        alert(`Horario ${action} correctamente`);
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cambiar el estado');
        console.error('Error:', err);
      }
    });
  } */

    async deleteHorario(id: number): Promise<void> {
    const horario = this.horarios.find(d => d.id === id);
    if (!horario) return;

    const confirmed = await this.dialogService.confirmDeleteDocumento(
      horario.nombre
    );

    if (!confirmed) return;

    this.horarioService.delete(id).subscribe({
      next: () => {
        this.dialogService.horarioEliminado();
        this.loadHorarios();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo eliminar el horario');
        console.error('Error:', err);
      }
    });
  }

  async toggleActivo(event: { id: number; esVisible: boolean }): Promise<void> {
    const horario = this.horarios.find(d => d.id === event.id);
    if (!horario) return;

    const confirmed = await this.dialogService.confirmTogglehorario(
      horario.nombre,
      event.esVisible
    );

    if (!confirmed) return;

    this.horarioService.toggleActivo(event.id, event.esVisible).subscribe({
      next: () => {

        horario.esVisible = event.esVisible;
        
        if (event.esVisible) {
          this.dialogService.horarioPublicado();
        } else {
          this.dialogService.horarioOculto();
        }

        this.cd.detectChanges();
      },
      error: (err) => {
        this.dialogService.error('Error', 'No se pudo cambiar el estado del horario');
        console.error('Error:', err);
      }
    });
  }
}
