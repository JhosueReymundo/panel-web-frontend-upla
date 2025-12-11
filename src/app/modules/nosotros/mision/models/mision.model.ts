export interface Mision {
  id: number;
  contenido: string;
  isActive: boolean;
  createdAt?: Date;
  updateAt?: Date;
}

export interface CreateMisionDto {
  contenido: string;
}

export interface UpdateMisionDto {
  contenido?: string;
  isActive?: boolean;
}