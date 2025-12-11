import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UpdateVisionDto, Vision } from '../../models/vision.model';
import { Visionservice } from '../../services/visionservice';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VisionForm } from '../../components/vision-form/vision-form';
import { Dialogservice } from '../../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-vision-edit',
  imports: [CommonModule, VisionForm],
  templateUrl: './vision-edit.html',
  styleUrl: './vision-edit.scss',
})
export class VisionEdit implements OnInit {

  vision?: Vision;
  loading = false;
  loadingData = true;
  misionId!: number;

  constructor(
    private visionService: Visionservice,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {}

  ngOnInit(): void {
    this.misionId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMision();
  }

  loadMision(): void {
    this.visionService.getById(this.misionId).subscribe({
      next: (data) => {
        this.vision = data;
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar la misión');
        this.loadingData = false;
        console.error('Error:', err);
        this.router.navigate(['/nosotros/vision']);
      }
    });
  }

  onSubmit(data: UpdateVisionDto): void {
    this.loading = true;

    this.visionService.update(this.misionId, data).subscribe({
      next: () => {
        this.dialogService.visionActualizado();
        this.router.navigate(['/nosotros/vision']);
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorActualizacion('valor');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/nosotros/vision']);
  }
}
