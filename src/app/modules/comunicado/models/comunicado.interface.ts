export interface Comunicado {
  id: number;
  titulo: string;
  contenido: string;
  imagenPortada: string | null;
  archivosAdjuntos: string[] | null;
  autorId: number;
  autor: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    escuela?: {
      id: number;
      nombreEscuela: string;
    };
    dependencia?: {
      id: number;
      nombreDependencia: string;
    };
    oficina:string;
  };
  fechaPublicacion: Date | null;
  fechaExpiracion: Date | null;
  estado: 'borrador' | 'publicado' | 'archivado';
  esVisible: boolean;
  vistas: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateComunicadoDto {
  titulo: string;
  contenido: string;
  /* imagenPortada?: string;
  archivosAdjuntos?: string[]; */
  fechaPublicacion?: Date | null;
  fechaExpiracion?: Date | null;
  estado?: string;
  esVisible?: boolean;
  autorId?: number;
}

export interface UpdateComunicadoDto {
  titulo?: string;
  contenido?: string;
  /* imagenPortada?: string;
  archivosAdjuntos?: string[]; */
  fechaPublicacion?: Date | null;
  fechaExpiracion?: Date | null;
  estado?: string;
  esVisible?: boolean;
}