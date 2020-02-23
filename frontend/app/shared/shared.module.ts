import {NgModule} from '@angular/core';
import {PortalSharedLibsModule} from './shared-libs.module';
import {JhiAlertComponent} from './alert/alert.component';
import {JhiAlertErrorComponent} from './alert/alert-error.component';
import {JhiLoginModalComponent} from './login/login.component';
import {HasAnyAuthorityDirective} from './auth/has-any-authority.directive';

import {JhMaterialModule} from 'app/shared/jh-material.module';
import {EstadoPipe} from 'app/shared/util/estado.pipe';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [JhMaterialModule, PortalSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent, JhiLoginModalComponent, HasAnyAuthorityDirective, EstadoPipe],
    entryComponents: [JhiLoginModalComponent],
    exports: [JhMaterialModule, PortalSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent, JhiLoginModalComponent, HasAnyAuthorityDirective, EstadoPipe]
})
export class PortalSharedModule {
}
