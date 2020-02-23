import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApplicationComponent} from 'app/application/application.component';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {navbarRoute} from 'app/layouts/navbar/navbar.route';
import {errorRoute} from 'app/layouts/error/error.route';
import {HomeComponent} from "app/application/home/home.component";

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

const routes: Routes = [{
    path: '',
    component: ApplicationComponent,
    children: [
        {
            path: 'admin',
            loadChildren: () => import('../admin/admin.module').then(m => m.PortalAdminModule),
            canActivate: [UserRouteAccessService]
        },
        {
            path: 'account',
            loadChildren: () => import('../account/account.module').then(m => m.PortalAccountModule),
            canActivate: [UserRouteAccessService]
        },
        {
            path: 'clientes',
            loadChildren: () => import('../entities/cliente/cliente.module').then(m => m.PortalClienteModule),
            canActivate: [UserRouteAccessService]
        },
        {
            path: 'documentos',
            loadChildren: () => import('../entities/documento-electronico/documento-electronico.module').then(m => m.PortalDocumentoElectronicoModule),
            canActivate: [UserRouteAccessService]
        },
        {
            path: 'usuarios',
            loadChildren: () => import('../entities/usuario/usuario.module').then(m => m.PortalUsuarioModule),
            canActivate: [UserRouteAccessService]
        },
        {
            path: '',
            component: HomeComponent,
            data: {
                authorities: [],
                pageTitle: 'Bienvenido al Portal de Facturación Electrónica!'
            }
        },
        {
            path: 'home',
            component: HomeComponent,
            data: {
                authorities: [],
                pageTitle: 'Bienvenido al Portal de Facturación Electrónica!'
            }
        },
        ...LAYOUT_ROUTES
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
