export interface ICliente {
    rucClient?: string;
    nombreClient?: string;
    rutaImagen?: string;
    direccionClient?: string;
    email?: string;
    estadoCliente?: string;
}

export class Cliente implements ICliente {
    constructor(
        public rucClient?: string,
        public nombreClient?: string,
        public rutaImagen?: string,
        public direccionClient?: string,
        public email?: string,
        public estadoCliente?: string
    ) {
    }
}
