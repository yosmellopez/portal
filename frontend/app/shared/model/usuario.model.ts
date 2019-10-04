import { IRol, Rol } from 'app/shared/model/rol.model';

export interface IUsuario {
    idUsuario?: number;
    nombUsuario?: string;
    claveUsuario?: string;
    rucClient?: number;
    email?: string;
    estadoUsuario?: string;
    rol?: IRol;
}

export class Usuario implements IUsuario {
    constructor(
        public idUsuario?: number,
        public nombUsuario?: string,
        public claveUsuario?: string,
        public rucClient?: number,
        public email?: string,
        public estadoUsuario?: string,
        public rol?: Rol) {
    }
}
