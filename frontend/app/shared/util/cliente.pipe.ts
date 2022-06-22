import {Pipe, PipeTransform} from '@angular/core';
import {ICliente} from "../model/cliente.model";

@Pipe({name: 'cliente'})
export class ClientePipe implements PipeTransform {

    transform(value: ICliente, ...args: any[]): any {
        return `${value.rucClient} - ${value.nombreClient}`;
    }
}

@Pipe({name: 'clienteRazon'})
export class ClienteRazonPipe implements PipeTransform {

    transform(value: ICliente, ...args: any[]): any {
        return `Razón Social: ${value.nombreClient}`;
    }
}

@Pipe({name: 'clienteEmail'})
export class ClienteEmailPipe implements PipeTransform {

    transform(value: ICliente, ...args: any[]): any {
        return `Correo Electrónico: ${value.email}`;
    }
}

@Pipe({name: 'clienteDireccion'})
export class ClienteDireccionPipe implements PipeTransform {

    transform(value: ICliente, ...args: any[]): any {
        return `Dirección: ${value.direccionClient ? value.direccionClient : 'Sin Dirección'}`;
    }
}
