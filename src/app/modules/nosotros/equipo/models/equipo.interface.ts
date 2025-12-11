export interface Equipo {
  id: number;
  nombre: string;
  cargo: string;
  email: string;
  orden: number;
  esVisible: boolean;
  createdAt?: Date;
  uptatedAt?: Date;
}

export interface CreateEquipoDto {
  nombre: string;
  cargo: string;
  email: string;
  orden?: number;
  esVisible?: boolean;
}

export interface UpdateEquipoDto {
  nombre?: string;
  cargo?: string;
  email?: string;
  orden?: number;
  esVisible?: boolean;
}