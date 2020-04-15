import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PortalSharedModule} from 'app/shared/shared.module';
import {ClienteComponent} from './cliente.component';
import {ClienteDetailComponent} from './cliente-detail.component';
import {clienteRoute} from './cliente.route';
import {ClienteWindowComponent} from './cliente-window/cliente-window.component';
import {ClientePipe} from "app/entities/cliente/cliente.pipe";

const ENTITY_STATES = [...clienteRoute];

@NgModule({
    imports: [PortalSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ClienteComponent,
        ClienteDetailComponent,
        ClienteWindowComponent,
        ClientePipe
    ],
    entryComponents: [ClienteComponent, ClienteWindowComponent],
    exports: [ClientePipe]
})
export class PortalClienteModule {
}
