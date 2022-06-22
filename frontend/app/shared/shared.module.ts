import {NgModule} from '@angular/core';
import {PortalSharedLibsModule} from './shared-libs.module';
import {JhiLoginModalComponent} from './login/login.component';
import {HasAnyAuthorityDirective} from './auth/has-any-authority.directive';

import {RouterModule} from "@angular/router";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JhMaterialModule} from './jh-material.module';
import {EstadoPipe} from "./util/estado.pipe";
import {ClienteDireccionPipe, ClienteEmailPipe, ClientePipe, ClienteRazonPipe} from "./util/cliente.pipe";
import {SidebarComponent} from "../layouts/sidebar/sidebar.component";
import {NavbarComponent} from "../layouts/navbar/navbar.component";
import {ErrorComponent} from "../layouts/error/error.component";
import {ConfigPipe} from "./config-pipe";
import {SigninComponent} from "../layouts/signin/signin.component";
import {PageRibbonComponent} from "../layouts/profiles/page-ribbon.component";
import {FooterComponent} from "../layouts/footer/footer.component";

@NgModule({
    imports: [JhMaterialModule, PortalSharedLibsModule, RouterModule, PerfectScrollbarModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, EstadoPipe, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent, SidebarComponent, SigninComponent, ConfigPipe,
        ClientePipe, ClienteRazonPipe, ClienteEmailPipe, ClienteDireccionPipe],
    entryComponents: [JhiLoginModalComponent],
    exports: [JhMaterialModule, PortalSharedLibsModule, JhiLoginModalComponent, HasAnyAuthorityDirective, EstadoPipe, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent,
        SidebarComponent, SigninComponent, ConfigPipe, ClientePipe, ClienteRazonPipe, ClienteEmailPipe, ClienteDireccionPipe]
})
export class PortalSharedModule {
}
