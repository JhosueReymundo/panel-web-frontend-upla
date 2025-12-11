export interface Rol {
  id: number;
  nombreRol: string;
}

export interface Escuela {
  id: number;
  nombreEscuela: string;
}

export interface Dependencia {
  id: number;
  nombre: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rolId: number;
  rol: Rol;
  escuelaId?: number;
  escuela?: Escuela;
  dependenciaId?: number;
  dependencia?: Dependencia;
  oficina?: string;
  esActivo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUsuarioDto {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rolId: number;
  escuelaId?: number;
  dependenciaId?: number;
  oficina?: string;
  esActivo?: boolean;
}

export interface UpdateUsuarioDto {
  nombre?: string;
  apellido?: string;
  email?: string;
  password?: string;
  rolId?: number;
  escuelaId?: number;
  dependenciaId?: number;
  oficina?: string;
  esActivo?: boolean;
}