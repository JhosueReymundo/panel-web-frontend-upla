import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Valorservice } from '../../services/valorservice';
import { ActivatedRoute, Router } from '@angular/router';
import {UpdateValorDto, Valor } from '../../models/valor.interface';
import { ValorForm } from '../../components/valor-form/valor-form';
import { CommonModule } from '@angular/common';
import { Dialogservice } from '../../../../../shared/dialog/services/dialogservice';

@Component({
  selector: 'app-valor-edit',
  imports: [CommonModule, ValorForm],
  templateUrl: './valor-edit.html',
  styleUrl: './valor-edit.scss',
})
export class ValorEdit implements OnInit {
  valor?: Valor;
  loading = false;
  loadingData = true;
  valorId!: number;

  constructor(
    private valoresService: Valorservice,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private dialogService: Dialogservice
  ) {}

  ngOnInit(): void {
    this.valorId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadValor();
  }

  loadValor(): void {
    this.valoresService.getById(this.valorId).subscribe({
      next: (data) => {
        this.valor = data;
        this.loadingData = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert('Error al cargar el valor');
        this.loadingData = false;
        console.error('Error:', err);
        this.router.navigate(['/nosotros/valores']);
      }
    });
  }

  onSubmit(data: UpdateValorDto): void {
    this.loading = true;

    this.valoresService.update(this.valorId, data).subscribe({
      next: () => {
        this.dialogService.valorActualizado();
        this.router.navigate(['/nosotros/valores']);
      },
      error: (err) => {
        this.loading = false;
        this.dialogService.errorActualizacion('valor');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/nosotros/valores']);
  }
}
