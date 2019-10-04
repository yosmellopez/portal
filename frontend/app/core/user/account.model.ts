import { IRol } from 'app/shared/model/rol.model';

export class Account {
    constructor(
        public activated: boolean,
        public rol: IRol,
        public email: string,
        public rucCliente: string,
        public langKey: string,
        public nombUsuario: string,
        public imageUrl: string
    ) {
    }
}

