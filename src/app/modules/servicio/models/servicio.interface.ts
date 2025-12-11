export interface ServicioDetalle {
  id?: number;
  detalle: string;
  orden: number;
}

export interface Servicio {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  orden: number;
  esVisible: boolean;
  detalles: ServicioDetalle[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateServicioDto {
  titulo: string;
  descripcion: string;
  icono: string;
  orden?: number;
  esVisible?: boolean;
  detalles: CreateServicioDetalleDto[];
}

export interface CreateServicioDetalleDto {
  detalle: string;
  orden?: number;
}

export interface UpdateServicioDto {
  titulo?: string;
  descripcion?: string;
  icono?: string;
  orden?: number;
  esVisible?: boolean;
  detalles?: UpdateServicioDetalleDto[];
}

export interface UpdateServicioDetalleDto {
  id?: number;
  detalle?: string;
  orden?: number;
}
