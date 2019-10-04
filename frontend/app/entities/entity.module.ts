import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'clientes',
                loadChildren: () => import('./cliente/cliente.module').then(m => m.PortalClienteModule),
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'documentos',
                loadChildren: () => import('./documento-electronico/documento-electronico.module').then(m => m.PortalDocumentoElectronicoModule),
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'usuarios',
                loadChildren: () => import('./usuario/usuario.module').then(m => m.PortalUsuarioModule),
                canActivate: [UserRouteAccessService]
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: []
})
export class PortalEntityModule {
}
