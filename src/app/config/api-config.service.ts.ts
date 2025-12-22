import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';

export interface ApiConfig {
  apiUrl: string;
  baseUrl: string;
  backendHost: string;
  clientRange: string;
  isProduction: boolean;
  source: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiConfigServiceTs {
  private config: ApiConfig;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.config = this.detectConfig();
    this.logConfig();
  }
  
  private detectConfig(): ApiConfig {
    // Si no estamos en el navegador (SSR o build time)
    if (!isPlatformBrowser(this.platformId)) {
      return {
        apiUrl: environment.apiUrl || 'http://localhost:3000/api',
        baseUrl: this.getBaseUrlFromApiUrl(environment.apiUrl),
        backendHost: 'localhost',
        clientRange: 'build',
        isProduction: environment.production,
        source: 'environment'
      };
    }
    
    // ===== PRIORIDAD 1: CONFIGURACIÓN INYECTADA POR NGINX =====
    const windowConfig = (window as any).APP_CONFIG;
    if (windowConfig && windowConfig.API_URL) {
      return {
        apiUrl: windowConfig.API_URL,
        baseUrl: windowConfig.BACKEND_URL,
        backendHost: windowConfig.API_HOST,
        clientRange: windowConfig.CLIENT_RANGE || 'nginx',
        isProduction: true,
        source: 'nginx'
      };
    }
    
    // ===== PRIORIDAD 2: DETECCIÓN POR HOSTNAME =====
    const hostname = window.location.hostname;
    const currentUrl = window.location.href;
    
    // Desarrollo local
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return {
        apiUrl: 'http://localhost:3000/api',
        baseUrl: 'http://localhost:3000',
        backendHost: 'localhost',
        clientRange: 'local',
        isProduction: false,
        source: 'localhost'
      };
    }
    
    // Si acceden por IP del rango 106
    if (hostname === '172.16.106.19' || currentUrl.includes('172.16.106.19')) {
      return {
        apiUrl: 'http://172.16.106.19:3000/api',
        baseUrl: 'http://172.16.106.19:3000',
        backendHost: '172.16.106.19',
        clientRange: '106',
        isProduction: true,
        source: 'ip-detection-106'
      };
    }
    
    // Si acceden por IP del rango 50
    if (hostname === '172.16.50.11' || currentUrl.includes('172.16.50.11')) {
      return {
        apiUrl: 'http://172.16.50.11:3000/api',
        baseUrl: 'http://172.16.50.11:3000',
        backendHost: '172.16.50.11',
        clientRange: '50',
        isProduction: true,
        source: 'ip-detection-50'
      };
    }
    
    // ===== PRIORIDAD 3: USAR environment.ts =====
    return {
      apiUrl: environment.apiUrl || 'http://172.16.50.11:3000/api',
      baseUrl: this.getBaseUrlFromApiUrl(environment.apiUrl),
      backendHost: this.extractHostFromUrl(environment.apiUrl),
      clientRange: 'default',
      isProduction: environment.production,
      source: 'environment'
    };
  }
  
  private getBaseUrlFromApiUrl(apiUrl: string): string {
    if (!apiUrl) return 'http://localhost:3000';
    // Quitar /api del final si existe
    return apiUrl.replace(/\/api\/?$/, '');
  }
  
  private extractHostFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return 'localhost';
    }
  }
  
  private logConfig(): void {
    if (isPlatformBrowser(this.platformId)) {
      /* console.group('🌐 Configuración de API Detectada (Angular)');
      console.log('🔧 Fuente:', this.config.source);
      console.log('🌐 API URL:', this.config.apiUrl);
      console.log('🏠 Backend Host:', this.config.backendHost);
      console.log('🎯 Rango:', this.config.clientRange);
      console.log('🚀 Producción:', this.config.isProduction);
      console.log('🖥️  URL actual:', window.location.href);
      console.groupEnd(); */
    }
  }
  
  getApiUrl(): string {
    return this.config.apiUrl;
  }
  
  getBaseUrl(): string {
    return this.config.baseUrl;
  }
  
  getBackendHost(): string {
    return this.config.backendHost;
  }
  
  getFileUrl(filePath: string): string {
    if (!filePath) return '';
    
    // Si ya es una URL completa
    if (filePath.startsWith('http')) return filePath;
    
    // Extraer nombre de archivo si tiene ruta
    const filename = filePath.includes('/') ? filePath.split('/').pop() : filePath;
    
    // Para archivos uploads
    if (filePath.includes('uploads/') || filePath.includes('horarios/')) {
      return `${this.config.baseUrl}/uploads/${filePath}`;
    }
    
    return `${this.config.baseUrl}/${filePath}`;
  }
  
  getConfig(): ApiConfig {
    return { ...this.config };
  }
}
