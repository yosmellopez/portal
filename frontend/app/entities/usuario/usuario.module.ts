import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PortalSharedModule} from 'app/shared/shared.module';
import {UsuarioComponent} from './usuario.component';
import {UsuarioDetailComponent} from './usuario-detail.component';
import {usuarioRoute} from './usuario.route';
import {RolPipe} from 'app/entities/usuario/rol.pipe';
import {UsuarioWindowComponent} from 'app/entities/usuario/usuario-window/usuario-window.component';
import {PasswordLenghtModule} from 'app/password-lenght/password-lenght.module';
import {ClientePipe} from 'app/entities/usuario/cliente.pipe';
import {MatSelectSearchModule} from 'app/mat-select-search/mat-select-search.module';

const ENTITY_STATES = [...usuarioRoute];

@NgModule({
    imports: [PortalSharedModule, PasswordLenghtModule, RouterModule.forChild(ENTITY_STATES), MatSelectSearchModule],
    declarations: [
        UsuarioComponent,
        UsuarioDetailComponent,
        RolPipe,
        ClientePipe,
        UsuarioWindowComponent
    ],
    entryComponents: [UsuarioComponent, UsuarioWindowComponent],
    exports: [RolPipe]
})
export class PortalUsuarioModule {
}
