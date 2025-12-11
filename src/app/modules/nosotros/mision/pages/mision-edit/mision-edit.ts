import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Mision, UpdateMisionDto } from '../../models/mision.model';
import { Misionservice } from '../../services/misionservice';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MisionForm } from '../../components/mision-form/mision-form';
import { Dialogservice } from '../../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-mision-edit',
  imports: [CommonModule, MisionForm],
  templateUrl: './mision-edit.html',
  styleUrl: './mision-edit.scss',
})
export class MisionEdit implements OnInit {

  mision?: Mision;
  loading = false;
  loadingData = true;
  misionId!: number;

  constructor(
    private misionService: Misionservice,
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
    this.misionService.getById(this.misionId).subscribe({
      next: (data) => {
        this.mision = data;
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar la misión');
        this.loadingData = false;
        console.error('Error:', err);
        this.router.navigate(['/nosotros/mision']);
      }
    });
  }

  onSubmit(data: UpdateMisionDto): void {
    this.loading = true;

    this.misionService.update(this.misionId, data).subscribe({
      next: () => {
        this.dialogService.misionActualizado();
        this.router.navigate(['/nosotros/mision']);
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorActualizacion('mision');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/nosotros/mision']);
  }
}
