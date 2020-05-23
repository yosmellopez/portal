export class AppResponseBody<T> {
    current_page: number;
    data: T;
    total: number;
}

export class Mensaje {
    title: string;
    description: string;
}

export class ConfirmMensaje {
    accion: string;
    description: string;
}

export class TipoMoneda {
    monedaTransaccion: string;
}

export class Estado {
    estadoSunat: string;
}

export class Serie {
    serie: string;
}

export class MessageResponse {
    mensaje: string;
}

export class ChartData {
    label: string;
    data: number[] = [];
}

export class TimeData {
    documentos: ChartData[] = [];
    columns: string[] = [];
}

export interface ProgressStatus {
    status: ProgressStatusEnum;
    percentage?: number;
}

export enum ProgressStatusEnum {
    START, COMPLETE, IN_PROGRESS, ERROR
}