export interface DocumentoGestion {
  id: number;
  nombreDoc: string;
  descripcion: string;
  archivoPdf: string | null;
  orden: number;
  esActivo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateDocumentoDto {
  nombreDoc: string;
  descripcion: string;
  esActivo?: boolean;
  orden?: number;
}

export interface UpdateDocumentoDto {
  nombreDoc?: string;
  descripcion?: string;
  esActivo?: boolean;
  orden?: number;
}