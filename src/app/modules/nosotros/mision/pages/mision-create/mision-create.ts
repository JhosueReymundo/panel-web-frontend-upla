import { Component } from '@angular/core';
import { Misionservice } from '../../services/misionservice';
import { Router } from '@angular/router';
import { CreateMisionDto, UpdateMisionDto } from '../../models/mision.model';
import { CommonModule } from '@angular/common';
import { MisionForm } from '../../components/mision-form/mision-form';
import { Dialogservice } from '../../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-mision-create',
  imports: [CommonModule,MisionForm],
  templateUrl: './mision-create.html',
  styleUrl: './mision-create.scss',
})
export class MisionCreate {
  loading = false;

  constructor(
    private misionService: Misionservice,
    private router: Router,
    private dialogService: Dialogservice
  ) {}

  onSubmit(data: CreateMisionDto | UpdateMisionDto): void {
    this.loading = true;

    this.misionService.create(data as CreateMisionDto).subscribe({
      next: () => {
        this.dialogService.misionCreado(); 
        this.router.navigate(['/nosotros/mision']);
      },
      error: (err) => {
        this.dialogService.errorCreacion('mision');
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/nosotros/mision']);
  }
}
