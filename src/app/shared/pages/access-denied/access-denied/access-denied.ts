import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Authservice } from '../../../../modules/auth/services/authservice';

@Component({
  selector: 'app-access-denied',
  imports: [CommonModule, RouterLink],
  //templateUrl: './access-denied.html',
  //styleUrl: './access-denied.scss',
  template: `
    <div class="access-denied-container">
      <div class="access-denied-content">
        <div class="icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          </svg>
        </div>
        
        <h1>Acceso Denegado</h1>
        <p>No tienes permisos para acceder a esta sección.</p>
        
        <div class="user-info">
          <p><strong>Usuario:</strong> {{ userName }}</p>
          <p><strong>Rol:</strong> {{ userRole }}</p>
        </div>

        <div class="actions">
          <button class="btn-primary" routerLink="/inicio">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Volver al inicio
          </button>
          <button class="btn-secondary" (click)="logout()">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .access-denied-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
      padding: 2rem;
    }

    .access-denied-content {
      text-align: center;
      max-width: 500px;
    }

    .icon-container {
      margin-bottom: 2rem;
      
      svg {
        color: #ef4444;
        filter: drop-shadow(0 4px 12px rgba(239, 68, 68, 0.3));
      }
    }

    h1 {
      font-size: 2.5rem;
      color: white;
      margin: 0 0 1rem 0;
      font-weight: 700;
    }

    p {
      color: #9ca3af;
      font-size: 1.1rem;
      margin: 0 0 2rem 0;
    }

    .user-info {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;

      p {
        margin: 0.5rem 0;
        color: #d1d5db;
        font-size: 0.95rem;

        strong {
          color: white;
        }
      }
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
      }
    }

    .btn-secondary {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);

      &:hover {
        background: rgba(239, 68, 68, 0.2);
      }
    }
  `]
})
export class AccessDenied {

   userName = '';
  userRole = '';

  constructor(
    private authService: Authservice,
    private router: Router
  ) {
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getUserRole() || 'Sin rol';
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.authService.logoutSilent()
    });
  }
}
