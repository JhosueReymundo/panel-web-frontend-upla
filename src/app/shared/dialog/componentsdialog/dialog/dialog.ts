/* import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DialogConfig, Dialogservice } from '../../services/dialogservice';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class Dialog implements OnInit, OnDestroy {
config: DialogConfig | null = null;
  isVisible = false;
  private subscription?: Subscription;
  private autoCloseTimeout?: any;

  constructor(
    private dialogService: Dialogservice,
    private cd: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.subscription = this.dialogService.dialog$.subscribe((config) => {
      this.showDialog(config);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
    }
  }

  showDialog(config: DialogConfig): void {
    this.config = config;
    this.isVisible = true;
    
  
    this.cd.detectChanges();

   
    if (config.type !== 'confirm' && config.duration) {
      this.autoCloseTimeout = setTimeout(() => {
        this.close();
      }, config.duration);
    }
  }

  close(): void {
    this.isVisible = false;
    
   
    this.cd.detectChanges();
    
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
    }
    setTimeout(() => {
      this.config = null;
      this.cd.detectChanges(); 
    }, 300); 
  }

  onConfirm(): void {
    this.dialogService.sendResult(true);
    this.close();
  }

  onCancel(): void {
    this.dialogService.sendResult(false);
    this.close();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      if (this.config?.type === 'confirm') {
        this.onCancel();
      } else {
        this.close();
      }
    }
  }

  getIcon(): string {
    switch (this.config?.type) {
      case 'success':
        return `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        `;
      case 'error':
        return `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        `;
      case 'warning':
        return `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        `;
      case 'info':
        return `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        `;
      case 'confirm':
        return `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        `;
      default:
        return '';
    }
  }
}
  */
 import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DialogConfig, Dialogservice } from '../../services/dialogservice';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class Dialog implements OnInit, OnDestroy {
  config: DialogConfig | null = null;
  isVisible = false;
  private subscription?: Subscription;
  private autoCloseTimeout?: any;

  constructor(
    private dialogService: Dialogservice,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer // ✅ AGREGAR DomSanitizer
  ) {}

  ngOnInit(): void {
    this.subscription = this.dialogService.dialog$.subscribe((config) => {
      // ✅ Usar setTimeout para evitar ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.showDialog(config);
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
    }
  }

  showDialog(config: DialogConfig): void {
    this.config = config;
    this.isVisible = true;
    //this.cd.detectChanges();
    this.cd.markForCheck();


    // Auto-cerrar notificaciones (no confirmaciones)
    if (config.type !== 'confirm' && config.duration) {
      this.autoCloseTimeout = setTimeout(() => {
        this.close();
      }, config.duration);
    }
  }

  close(): void {
    this.isVisible = false;
    //this.cd.detectChanges();
    this.cd.markForCheck();

    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
    }
    
    setTimeout(() => {
      this.config = null;
      //this.cd.detectChanges();
      this.cd.markForCheck();
    }, 300);
  }

  onConfirm(): void {
    this.dialogService.sendResult(true);
    this.close();
  }

  onCancel(): void {
    this.dialogService.sendResult(false);
    this.close();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      if (this.config?.type === 'confirm') {
        this.onCancel();
      } else {
        this.close();
      }
    }
  }

  // ✅ MÉTODO CORREGIDO - Devuelve SafeHtml
  getIcon(): SafeHtml {
    let svg = '';
    
    switch (this.config?.type) {
      case 'success':
        svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        `;
        break;
      case 'error':
        svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        `;
        break;
      case 'warning':
        svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        `;
        break;
      case 'info':
        svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        `;
        break;
      case 'confirm':
        svg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        `;
        break;
      default:
        svg = '';
    }

    // ✅ SANITIZAR el SVG para que sea seguro
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}

