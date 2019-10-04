import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Usuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from './usuario.service';
import { UsuarioComponent } from './usuario.component';
import { UsuarioDetailComponent } from './usuario-detail.component';
import { IUsuario } from 'app/shared/model/usuario.model';

@Injectable({providedIn: 'root'})
export class UsuarioResolve implements Resolve<IUsuario> {
    constructor(private service: UsuarioService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUsuario> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Usuario>) => response.ok),
                map((response: HttpResponse<Usuario>) => response.body),
            );
        }
        return of(new Usuario());
    }
}

export const usuarioRoute: Routes = [
    {
        path: '',
        component: UsuarioComponent,
        data: {
            authorities: ['ROLE_RECEPTOR', 'ROLE_ADMIN'],
            pageTitle: 'Usuarios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UsuarioDetailComponent,
        resolve: {
            usuario: UsuarioResolve
        },
        data: {
            authorities: ['ROLE_RECEPTOR', 'ROLE_ADMIN'],
            pageTitle: 'Usuarios'
        },
        canActivate: [UserRouteAccessService]
    },
];