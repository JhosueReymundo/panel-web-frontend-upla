
export interface Valor {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  orden: number;
  isVisible: boolean;
  createdAt?: Date;
  uptatedAt?: Date;
}

export interface CreateValorDto {
  titulo: string;
  descripcion: string;
  icono: string;
  orden?: number;
  isVisible?: boolean;
}

export interface UpdateValorDto {
  titulo?: string;
  descripcion?: string;
  icono?: string;
  orden?: number;
  isVisible?: boolean;
}