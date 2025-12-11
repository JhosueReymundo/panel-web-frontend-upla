import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Authservice } from '../../../modules/auth/services/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {

  userName: string | null = null;
  userEmail: string | null = null;
  userInitials: string = '';
  userRole: string | null = null;
  showUserMenu = false;
  showNotifications = false;
  
  notifications = [
    { id: 1, title: 'Nuevo horario disponible', time: 'Hace 5 min', unread: true },
    { id: 2, title: 'Asignatura actualizada', time: 'Hace 1 hora', unread: true },
    { id: 3, title: 'Reunión programada', time: 'Hace 2 horas', unread: false }
  ];

  constructor(
    private authService: Authservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userName = this.authService.getUserName();
    this.userEmail = this.authService.getUserEmail();
    this.userInitials = this.authService.getUserInitials();
    this.userRole = this.authService.getUserRole();
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showUserMenu = false;
  }

  logout(): void {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
      this.authService.logout().subscribe({
        next: () => {
          console.log('✅ Logout exitoso');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('❌ Error en logout:', err);
          // Hacer logout silencioso si falla la petición
          this.authService.logoutSilent();
        }
      });
    }
  }

  get unreadCount(): number {
    return this.notifications.filter(n => n.unread).length;
  }

  // Método para cerrar menús al hacer click fuera (opcional)
  closeMenus(): void {
    this.showUserMenu = false;
    this.showNotifications = false;
  }
}
