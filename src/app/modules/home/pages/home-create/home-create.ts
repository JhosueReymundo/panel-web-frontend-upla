import { Component } from '@angular/core';
import { Homeservice } from '../../services/homeservice';
import { Router } from '@angular/router';
import { CreateHomeDto, UpdateHomeDto } from '../../model/home.interface';
import { CommonModule } from '@angular/common';
import { HomeForm } from '../../components/home-form/home-form';
import { Dialogservice } from '../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-home-create',
  imports: [CommonModule, HomeForm],
  templateUrl: './home-create.html',
  styleUrl: './home-create.scss',
})
export class HomeCreate {
  loading = false;

  constructor(
    private homeService: Homeservice,
    private router: Router,
    private dialogService: Dialogservice
  ) {}

  onSubmit(event: { data: CreateHomeDto | UpdateHomeDto; imagen?: File }): void {
    this.loading = true;

    this.homeService.create(event.data as CreateHomeDto, event.imagen).subscribe({
      next: () => {
        this.dialogService.homeCreado(); 
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.dialogService.errorCreacion('portada');
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }
}
