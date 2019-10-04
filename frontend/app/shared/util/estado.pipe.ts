import { Pipe, PipeTransform } from '@angular/core';
import { Rol } from 'app/shared/model/rol.model';

@Pipe({name: 'estado'})
export class EstadoPipe implements PipeTransform {

    transform(value: string, ...args: any[]): any {
        switch (value) {
            case 'V':
                return 'Aprobado';
            case 'R':
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