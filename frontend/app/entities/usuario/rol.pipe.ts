import { Pipe, PipeTransform } from '@angular/core';
import { Rol } from 'app/shared/model/rol.model';

@Pipe({name: 'rol'})
export class RolPipe implements PipeTransform {

    transform(value: Rol, ...args: any[]): any {
        return value.nombRoles;
    }

}
