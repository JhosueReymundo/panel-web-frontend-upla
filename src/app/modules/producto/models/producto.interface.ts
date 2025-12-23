export type EstadoProducto = 'Activo' | 'En Desarrollo' | 'En Mantenimiento' | 'Descontinuado';

export interface ProductoCaracteristica {
  id?: number;
  descripcion: string;
  orden: number;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  estado: EstadoProducto;
  version: string;
  usuarios: string;
  icono: string;
  enlace?:string;
  orden: number;
  esVisible: boolean;
  caracteristicas: ProductoCaracteristica[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductoDto {
  nombre: string;
  descripcion: string;
  estado?: EstadoProducto;
  version?: string;
  usuarios?: string;
  icono?: string;
  orden?: number;
  esVisible?: boolean;
  caracteristicas?: string[]; // Array simple de strings
}

export interface UpdateProductoDto {
  nombre?: string;
  descripcion?: string;
  estado?: EstadoProducto;
  version?: string;
  usuarios?: string;
  icono?: string;
  orden?: number;
  esVisible?: boolean;
  caracteristicas?: UpdateCaracteristicaDto[];
}

export interface UpdateCaracteristicaDto {
  id?: number;
  descripcion?: string;
  orden?: number;
}
