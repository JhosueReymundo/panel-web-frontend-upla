import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mision } from '../../models/mision.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mision-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './mision-card.html',
  styleUrl: './mision-card.scss',
})
export class MisionCard {

  @Input() mision!: Mision;
  @Output() delete = new EventEmitter<number>();
  @Output() activate = new EventEmitter<number>();

  onDelete(): void {
    /* if (confirm('¿Estás seguro de eliminar esta misión?')) {
      this.delete.emit(this.mision.id);
    } */
    this.delete.emit(this.mision.id);
  }

  onActivate(): void {
    if (confirm('¿Activar esta misión? (Se desactivará la misión actual)')) {
      this.activate.emit(this.mision.id);
    } 
    //this.activate.emit(this.mision.id);

  }
}
