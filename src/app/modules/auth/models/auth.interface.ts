export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  usuario: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    rolId: number;
    rol: {
      id: number;
      nombreRol: string;
    };
    esActivo: boolean;
  };
}

export interface RefreshDto {
  userId: number;
  refreshToken: string;
}