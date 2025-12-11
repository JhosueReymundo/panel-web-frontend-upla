import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vision } from '../../models/vision.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vision-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './vision-card.html',
  styleUrl: './vision-card.scss',
})
export class VisionCard {

  @Input() vision!: Vision;
  @Output() delete = new EventEmitter<number>();
  @Output() activate = new EventEmitter<number>();

  onDelete(): void {
    /* if (confirm('¿Estás seguro de eliminar esta misión?')) {
      this.delete.emit(this.vision.id);
    } */
    this.delete.emit(this.vision.id);
  }

  onActivate(): void {
    if (confirm('¿Activar esta misión? (Se desactivará la misión actual)')) {
      this.activate.emit(this.vision.id);
    }
  }
}
