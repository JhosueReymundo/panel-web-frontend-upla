import { Component } from '@angular/core';
import { Visionservice } from '../../services/visionservice';
import { Router } from '@angular/router';
import { CreateVisionDto, UpdateVisionDto } from '../../models/vision.model';
import { CommonModule } from '@angular/common';
import { VisionForm } from '../../components/vision-form/vision-form';
import { Dialogservice } from '../../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-vision-create',
  imports: [CommonModule, VisionForm],
  templateUrl: './vision-create.html',
  styleUrl: './vision-create.scss',
})
export class VisionCreate {
  loading = false;

  constructor(
    private visionService: Visionservice,
    private router: Router,
    private dialogService: Dialogservice
  ) {}

  onSubmit(data: CreateVisionDto | UpdateVisionDto): void {
    this.loading = true;

    this.visionService.create(data as CreateVisionDto).subscribe({
      next: () => {
        this.dialogService.visionCreado(); 
        this.router.navigate(['/nosotros/vision']);
      },
      error: (err) => {
        this.dialogService.errorCreacion('vision');
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/nosotros/vision']);
  }
}
