import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, Observable, Subscription, tap } from 'rxjs';
import { LoginDto, LoginResponse, RefreshDto } from '../models/auth.interface';
import { environment } from '../../../../environments/environment';
import { ApiConfigServiceTs } from '../../../config/api-config.service.ts';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  
  //private readonly apiUrl= `${environment.apiUrl}/auth`;
  private get apiUrl(): string {
    return `${this.apiConfig.getApiUrl()}/productos`;
  }
  
  
   
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private refreshTokenInterval$?: Subscription;
  private readonly REFRESH_INTERVAL = 13 * 60 * 1000;

  constructor(private http: HttpClient, private router: Router, private apiConfig: ApiConfigServiceTs ) {
    // Cargar usuario del localStorage al iniciar
    const user = this.getUserFromStorage();
    if (user) {
      this.currentUserSubject.next(user);
      this.startRefreshTokenTimer(); 
    }
  }

  // ========== LOGIN ==========
  login(credentials: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.setSession(response);
        this.startRefreshTokenTimer();
      })
    );
  }

  // ========== LOGOUT ==========
  /* logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.clearSession();
      })
    );
  } */
 logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.clearSessionAndRedirect();
      })
    );
  }

  logoutSilent(): void {
    this.clearSessionAndRedirect();
  }

  // ========== REFRESH TOKEN ==========
  refreshToken(): Observable<any> {
    const userId = this.getUserId();
    const refreshToken = this.getRefreshToken();

    if (!userId || !refreshToken) {
      /* this.clearSession(); */
      this.clearSessionAndRedirect();
      return new Observable(observer => observer.error('No refresh token'));
    }

    const payload: RefreshDto = { userId, refreshToken };

    return this.http.post(`${this.apiUrl}/refresh`, payload).pipe(
      tap((response: any) => {
        this.setTokens(response.accessToken, response.refreshToken);
      })
    );
  }

  // ========== AUTO-REFRESH TIMER ==========
  private startRefreshTokenTimer(): void {
    // Detener timer anterior si existe
    this.stopRefreshTokenTimer();

    // Crear nuevo timer que refresca cada 13 minutos
    this.refreshTokenInterval$ = interval(this.REFRESH_INTERVAL).subscribe(() => {
      console.log('🔄 Refrescando tokens automáticamente...');
      this.refreshToken().subscribe({
        next: () => console.log('✅ Auto-refresh exitoso'),
        error: (err) => {
          console.error('❌ Error en auto-refresh:', err);
          this.clearSessionAndRedirect();
        }
      });
    });

    console.log('⏰ Timer de auto-refresh iniciado (cada 13 minutos)');
  }

  private stopRefreshTokenTimer(): void {
    if (this.refreshTokenInterval$) {
      this.refreshTokenInterval$.unsubscribe();
      console.log('⏸️ Timer de auto-refresh detenido');
    }
  }

  // ========== SESSION MANAGEMENT ==========
  private setSession(authResult: LoginResponse): void {
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('refreshToken', authResult.refreshToken);
    localStorage.setItem('userId', authResult.usuario.id.toString());
    localStorage.setItem('user', JSON.stringify(authResult.usuario));
    this.currentUserSubject.next(authResult.usuario);
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  /* private clearSession(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  } */
  clearSessionAndRedirect(): void {
    this.stopRefreshTokenTimer();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // ========== GETTERS ==========
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? parseInt(id, 10) : null;
  }

  getUserFromStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // ========== HELPERS ==========
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.rol?.nombreRol || null;
  }

  getUserName(): string {
    const user = this.getCurrentUser();
    return user ? `${user.nombre} ${user.apellido}` : '';
  }

  getUserEmail(): string {
    const user = this.getCurrentUser();
    return user?.email || '';
  }

  getUserInitials(): string {
    const user = this.getCurrentUser();
    if (!user) return '';
    const firstInitial = user.nombre?.charAt(0).toUpperCase() || '';
    const lastInitial = user.apellido?.charAt(0).toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  }



   // ========== ROLES Y PERMISOS ==========
  
   //igualito esta arriba
  /* getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.rol?.nombreRol || null;
  } */

  getUserRoleId(): number | null {
    const user = this.getCurrentUser();
    return user?.rolId || null;
  }

  // Verificar si el usuario tiene un rol específico
  hasRole(roleName: string): boolean {
    const userRole = this.getUserRole();
    return userRole === roleName;
  }

  // Verificar si el usuario tiene alguno de los roles especificados
  hasAnyRole(roles: string[]): boolean {
    const userRole = this.getUserRole();
    return userRole ? roles.includes(userRole) : false;
  }

  // Verificar si el usuario tiene todos los roles especificados
  hasAllRoles(roles: string[]): boolean {
    const userRole = this.getUserRole();
    if (!userRole) return false;
    return roles.every(role => role === userRole);
  }

  // Sistema de permisos (requiere que el backend devuelva permisos)
  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    // Ejemplo: user.rol.permisos = ['usuarios.crear', 'usuarios.editar', ...]
    const permissions = user?.rol?.permisos || [];
    return permissions.includes(permission);
  }

  // Verificar múltiples permisos
  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some(p => this.hasPermission(p));
  }

  hasAllPermissions(permissions: string[]): boolean {
    return permissions.every(p => this.hasPermission(p));
  }

  // Helpers para roles comunes
  isAdmin(): boolean {
    return this.hasRole('Admin') || this.hasRole('Administrador');
  }

  isModerator(): boolean {
    return this.hasRole('Moderador');
  }

  isUser(): boolean {
    return this.hasRole('Usuario');
  }
}
