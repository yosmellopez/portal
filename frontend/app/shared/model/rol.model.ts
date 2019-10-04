export interface IRol {
    idRoles?: number;
    nombRoles?: string;
    role?: string;
}

export class Rol implements IRol {
    constructor(public idRoles?: number, public nombRoles?: string, public role?: string) {
    }
}
