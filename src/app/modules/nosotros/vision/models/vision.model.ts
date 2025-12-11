// models/mision.interface.ts

export interface Vision {
  id: number;
  contenido: string;
  isActive: boolean;
  createdAt?: Date;
  updateAt?: Date;
}

export interface CreateVisionDto {
  contenido: string;
}

export interface UpdateVisionDto {
  contenido?: string;
  isActive?: boolean;
}
