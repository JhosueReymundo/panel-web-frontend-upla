export interface Home {
    id: number;
    titulo: string;
    subtitulo?: string;
    imagenFondo?: string;
    esVisible: boolean;
    updatedAt?: Date;
}

export interface CreateHomeDto {
    titulo: string;
    subtitulo?: string;
    esVisible?: boolean;
}

export interface UpdateHomeDto {
    titulo?: string;
    subtitulo?: string;
    esVisible?: boolean;
}