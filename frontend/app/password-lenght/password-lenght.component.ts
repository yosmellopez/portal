import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'password-lenght',
    templateUrl: './password-lenght.component.html',
    styleUrls: ['./password-lenght.component.scss']
})
export class PasswordLenghtComponent implements OnInit {
    clases = ['sin-fortaleza', 'debil', 'medio-fuerte', 'fuerte', 'super-fuerte'];
    mensajes = ['Sin Fortaleza', 'Débil', 'Medio Fuerte', 'Fuerte', 'Super Fuerte'];
    passwordLenght: number = 0;
    clase: string = "sin-fortaleza";
    mensaje: string = "Sin Fortaleza";

    constructor() {
    }

    ngOnInit() {
    }

    measureStrength(p: string): number {
        let force = 0;
        const regex = /[$-/:-?{-~!"^_`\[\]]/g; // "
        const lowerLetters = /[a-z]+/.test(p);
        const upperLetters = /[A-Z]+/.test(p);
        const numbers = /[0-9]+/.test(p);
        const symbols = regex.test(p);

        const flags = [lowerLetters, upperLetters, numbers, symbols];
        const passedMatches = flags.filter((isMatchedFlag: boolean) => {
            return isMatchedFlag === true;
        }).length;

        force += 2 * p.length + (p.length >= 10 ? 1 : 0);
        force += passedMatches * 25;

        // penality (short password)
        force = p.length <= 6 ? Math.min(force, 10) : force;

        // penality (poor variety of characters)
        force = passedMatches === 1 ? Math.min(force, 25) : force;
        force = passedMatches === 2 ? Math.min(force, 50) : force;
        force = passedMatches === 3 ? Math.min(force, 75) : force;
        force = passedMatches === 4 ? Math.min(force, 100) : force;
        return force;
    }


    getClase(s: number): any {
        let idx = 0;
        if (s <= 10) {
            idx = 0;
        } else if (s <= 25) {
            idx = 1;
        } else if (s <= 50) {
            idx = 2;
        } else if (s <= 75) {
            idx = 3;
        } else {
            idx = 4;
        }
        return {clase: this.clases[idx], mensaje: this.mensajes[idx]};
    }

    @Input()
    set passwordToCheck(password: string) {
        if (password) {
            this.passwordLenght = this.measureStrength(password);
            let obj = this.getClase(this.passwordLenght);
            this.clase = obj.clase;
            this.mensaje = obj.mensaje;
        }
    }
}
