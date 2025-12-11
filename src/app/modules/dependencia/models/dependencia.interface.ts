export interface Dependencia {
  id: number;
  nombre: string;
}

export interface CreateDependenciaDto {
  nombre: string;
}

export interface UpdateDependenciaDto {
  nombre: string;
}