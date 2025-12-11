import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Homeservice } from '../../services/homeservice';
import { ActivatedRoute, Router } from '@angular/router';
import { Home, UpdateHomeDto } from '../../model/home.interface';
import { CommonModule } from '@angular/common';
import { HomeForm } from '../../components/home-form/home-form';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-home-edit',
  imports: [CommonModule, HomeForm],
  templateUrl: './home-edit.html',
  styleUrl: './home-edit.scss',
})
export class HomeEdit implements OnInit {

  home?: Home;
  loading = false;
  loadingData = true;
  homeId!: number;

  constructor(
    private homeService: Homeservice,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {}

  ngOnInit(): void {
    this.homeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadHome();
  }

  loadHome(): void {
    this.homeService.getById(this.homeId).subscribe({
      next: (data) => {
        this.home = data;
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar el hero');
        this.loadingData = false;
        console.error('Error:', err);
        this.router.navigate(['/home']);
      }
    });
  }

  onSubmit(event: { data: UpdateHomeDto; imagen?: File }): void {
    this.loading = true;

    // Si hay imagen nueva, actualizarla primero
    if (event.imagen) {
      this.homeService.updateImagen(this.homeId, event.imagen).subscribe({
        next: () => {
          this.updateDatos(event.data);
        },
        error: (err) => {
          alert('Error al actualizar la imagen');
          this.loading = false;
          console.error('Error:', err);
        }
      });
    } else {
      this.updateDatos(event.data);
    }
  }

  updateDatos(data: UpdateHomeDto): void {
    this.homeService.update(this.homeId, data).subscribe({
      next: () => {
        this.dialogService.homeActualizado();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorActualizacion('home');
      }
    });
  }
  
  onCancel(): void {
    this.router.navigate(['/home']);
  }
}
