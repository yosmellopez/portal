import {Pipe, PipeTransform} from '@angular/core';
import {ICliente} from 'app/shared/model/cliente.model';

@Pipe({name: 'cliente'})
export class ClientePipe implements PipeTransform {

  transform(value: ICliente, ...args: any[]): any {
    return `${value.rucClient} - ${value.nombreClient}`;
  }
}
