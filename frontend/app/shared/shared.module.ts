import {NgModule} from '@angular/core';
import {PortalSharedLibsModule} from './shared-libs.module';
import {JhiAlertComponent} from './alert/alert.component';
import {JhiAlertErrorComponent} from './alert/alert-error.component';
import {JhiLoginModalComponent} from './login/login.component';
import {HasAnyAuthorityDirective} from './auth/has-any-authority.directive';

import {JhMaterialModule} from 'app/shared/jh-material.module';
import {EstadoPipe} from 'app/shared/util/estado.pipe';
import {JhiMainComponent} from "app/layouts/main/main.component";
import {NavbarComponent} from "app/layouts/navbar/navbar.component";
import {ErrorComponent} from "app/layouts/error/error.component";
import {PageRibbonComponent} from "app/layouts/profiles/page-ribbon.component";
import {FooterComponent} from "app/layouts/footer/footer.component";
import {SidebarComponent} from "app/layouts/sidebar/sidebar.component";
import {SigninComponent} from "app/layouts/signin/signin.component";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [JhMaterialModule, PortalSharedLibsModule, RouterModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent, JhiLoginModalComponent, HasAnyAuthorityDirective, EstadoPipe, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent, SidebarComponent, SigninComponent],
    entryComponents: [JhiLoginModalComponent],
    exports: [JhMaterialModule, PortalSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent, JhiLoginModalComponent, HasAnyAuthorityDirective, EstadoPipe, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent, SidebarComponent, SigninComponent]
})
export class PortalSharedModule {
}
