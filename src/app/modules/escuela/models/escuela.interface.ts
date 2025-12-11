export interface Escuela {
  id: number;
  nombreEscuela: string;
}

export interface CreateEscuelaDto {
  nombreEscuela: string;
}

export interface UpdateEscuelaDto {
  nombreEscuela?: string;
}