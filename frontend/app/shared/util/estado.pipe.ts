import { Pipe, PipeTransform } from '@angular/core';
import { Rol } from 'app/shared/model/rol.model';

@Pipe({name: 'estado'})
export class EstadoPipe implements PipeTransform {

    transform(value: string, ...args: any[]): any {
        switch (value) {
            case 'R':
            case 'V':
                return 'Aprobado';
            case 'Z':
                return 'Rechazado';
            case 'D':
                return 'Pendiente Respuesta';
            case 'L':
                return 'Leido';
            case 'P':
                return 'Publicado';
        }
    }
}