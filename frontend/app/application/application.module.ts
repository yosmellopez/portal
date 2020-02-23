import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApplicationRoutingModule} from './application-routing.module';
import {ApplicationComponent} from './application.component';
import {TranslateModule} from "@ngx-translate/core";
import {PortalAppModule} from "app/app.module";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@NgModule({
    declarations: [
        ApplicationComponent
    ],
    imports: [CommonModule, ApplicationRoutingModule, TranslateModule, PortalAppModule, PerfectScrollbarModule]
})
export class ApplicationModule {
}
