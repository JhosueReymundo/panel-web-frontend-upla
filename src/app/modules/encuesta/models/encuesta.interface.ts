export enum EstadoEncuesta {
  BORRADOR = 'borrador',
  ACTIVA = 'activa',
  CERRADA = 'cerrada'
}

export enum TipoPregunta {
  ABIERTA = 'abierta',
  OPCION = 'opcion',
  NUMERICA = 'numerica'
}

export enum CicloEnum {
  I = 'I',
  II = 'II',
  III = 'III',
  IV = 'IV',
  V = 'V',
  VI = 'VI',
  VII = 'VII',
  VIII = 'VIII',
  IX = 'IX',
  X = 'X'
}

export interface Encuesta {
  id: number;
  nombre: string;
  descripcion: string | null;
  fecha_creacion: Date;
  fecha_inicio: Date | null;
  fecha_fin: Date | null;
  esVisible: boolean;
  estado: EstadoEncuesta;
  preguntas: Pregunta[];
}

export interface Pregunta {
  id: number;
  encuesta_id: number;
  texto: string;
  tipo: TipoPregunta;
  orden: number;
  opciones: Opcion[];
}

export interface Opcion {
  id: number;
  pregunta_id: number;
  texto: string;
  valor: string | null;
  orden: number;
}

export interface Respuesta {
  id: number;
  encuesta_id: number;
  email: string;
  codigo_estudiante: string;
  escuelaId: number;
  escuela?: {
    id: number;
    nombreEscuela: string;
  };
  ciclo: CicloEnum;
  creado_en: Date;
  detalles: RespuestaDetalle[];
}

export interface RespuestaDetalle {
  id: number;
  respuesta_id: number;
  pregunta_id: number;
  opcion_id: number | null;
  texto: string | null;
  valor_numerico: number | null;
}

// DTOs
export interface CreateEncuestaDto {
  nombre: string;
  descripcion?: string;
  fecha_inicio?: Date;
  fecha_fin?: Date;
  esVisible: boolean;
  estado?: EstadoEncuesta;
}

export interface UpdateEncuestaDto {
  nombre?: string;
  descripcion?: string;
  fecha_inicio?: Date;
  fecha_fin?: Date;
  esVisible?: boolean;
  estado?: EstadoEncuesta;
}

export interface CreatePreguntaDto {
  encuesta_id: number;
  texto: string;
  tipo: TipoPregunta;
  orden?: number;
}

export interface UpdatePreguntaDto {
  texto?: string;
  tipo?: TipoPregunta;
  orden?: number;
}

export interface CreateOpcionDto {
  pregunta_id: number;
  texto: string;
  valor?: string;
  orden?: number;
}

export interface CreateRespuestaDto {
  encuesta_id: number;
  email: string;
  codigo_estudiante: string;
  escuelaId: number;
  ciclo: CicloEnum;
}

export interface CreateRespuestaDetalleDto {
  respuesta_id: number;
  pregunta_id: number;
  opcion_id?: number;
  texto?: string;
  valor_numerico?: number;
}

export interface RespuestaCompletaDto {
  respuesta: CreateRespuestaDto;
  detalles: CreateRespuestaDetalleDto[];
}