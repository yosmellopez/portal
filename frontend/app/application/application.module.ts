import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApplicationRoutingModule} from './application-routing.module';
import {ApplicationComponent} from './application.component';
import {TranslateModule} from "@ngx-translate/core";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {HomeComponent} from "app/application/home/home.component";
import {JhMaterialModule} from "app/shared/jh-material.module";
import {ChartsModule} from "ng2-charts";
import {PortalSharedModule} from "app/shared/shared.module";

@NgModule({
    declarations: [
        ApplicationComponent, HomeComponent
    ],
    imports: [CommonModule, ApplicationRoutingModule, TranslateModule, PerfectScrollbarModule, JhMaterialModule, ChartsModule, PortalSharedModule],
    exports: [HomeComponent]
})
export class ApplicationModule {
}
