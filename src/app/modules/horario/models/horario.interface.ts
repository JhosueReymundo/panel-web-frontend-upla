export interface Horario{
    id:number;
    nombre: string;
    archivoPdf:string;
    esVisible:boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateHorarioDto{
    nombre:string;
    esVisible?:boolean;
}

export interface UpdateHorarioDto{
    nombre?:string;
    esVisible?:boolean;
}