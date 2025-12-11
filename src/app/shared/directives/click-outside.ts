import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutside {

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(target: EventTarget | null): void {
    // Si target es null, claramente no clickeó dentro del elemento
    if (!target) {
      this.clickOutside.emit();
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(target as Node);

    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }

}
