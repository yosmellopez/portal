import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { ClienteComponent } from './cliente.component';
import { ClienteDetailComponent } from './cliente-detail.component';
import { ICliente } from 'app/shared/model/cliente.model';

@Injectable({providedIn: 'root'})
export class ClienteResolve implements Resolve<ICliente> {
    constructor(private service: ClienteService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICliente> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Cliente>) => response.ok),
                map((cliente: HttpResponse<Cliente>) => cliente.body)
            );
        }
        return of(new Cliente());
    }
}

export const clienteRoute: Routes = [
    {
        path: '',
        component: ClienteComponent,
        data: {
            authorities: ['ROLE_RECEPTOR', 'ROLE_ADMIN'],
            pageTitle: 'Clientes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ClienteDetailComponent,
        resolve: {
            cliente: ClienteResolve
        },
        data: {
            authorities: ['ROLE_RECEPTOR', 'ROLE_ADMIN'],
            pageTitle: 'Clientes'
        },
        canActivate: [UserRouteAccessService]
    }
];