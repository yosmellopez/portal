import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import './vendor';
import {AuthInterceptor} from './blocks/interceptor/auth.interceptor';
import {AuthExpiredInterceptor} from './blocks/interceptor/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from './blocks/interceptor/errorhandler.interceptor';
import {NotificationInterceptor} from './blocks/interceptor/notification.interceptor';
import {PortalAppRoutingModule} from './app-routing.module';
import {PortalEntityModule} from './entities/entity.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {JhiMainComponent} from './layouts/main/main.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableExporterModule} from 'mat-table-exporter';
import {MatSelectModule} from '@angular/material/select';
import {NgChartsModule} from 'ng2-charts';
import localeMx from '@angular/common/locales/es-MX';
import {registerLocaleData} from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PDFExportModule} from '@progress/kendo-angular-pdf-export';
import {
    NgxUiLoaderConfig,
    NgxUiLoaderHttpModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    SPINNER
} from "ngx-ui-loader";
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from "@angular/material-moment-adapter";
import {Moment} from "moment";
import {AppNgxUiLoaderService} from "./app-ngx-ui-loader.service";
import {ConfigService} from "./shared/config-service";
import {TranslationModule} from "./shared/language/translation.module";
import {JhMaterialModule} from "./shared/jh-material.module";
import {MensajeModule} from "./mensaje/mensaje.module";
import {PortalCoreModule} from "./core/core.module";
import {PortalSharedModule} from "./shared/shared.module";
import {SidebarComponent} from "./layouts/sidebar/sidebar.component";
import {getSpanishPaginatorIntl} from "./es-locale-paginator";
// background-color: rgb(79, 195, 247);
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: '#4fc3f7',
    // bgsOpacity: 0.5,
    // bgsPosition: POSITION.bottomCenter,
    // bgsSize: 60,
    bgsType: SPINNER.threeBounce,
    fgsColor: '#4fc3f7',
    // fgsPosition: POSITION.topCenter,
    // fgsSize: 60,
    fgsType: SPINNER.fadingCircle,
    pbColor: 'blue'
    // pbDirection: PB_DIRECTION.leftToRight,
    // pbThickness: 5,
    // text: 'Welcome to ngx-ui-loader'
    // textColor: '#FFFFFF',
    // textPosition: POSITION.centerCenter
};
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
registerLocaleData(localeMx, 'es-MX');

const MY_NATIVE_DATE_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatDatepickerModule,
        MatMomentDateModule,
        PortalSharedModule,
        PortalCoreModule,
        PerfectScrollbarModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        PortalEntityModule,
        NgChartsModule,
        JhMaterialModule,
        PortalAppRoutingModule,
        MatDatepickerModule,
        NativeDateModule,
        ReactiveFormsModule,
        MatTableExporterModule,
        MensajeModule,
        MatSelectModule,
        PDFExportModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxUiLoaderRouterModule, // import this module for showing loader automatically when navigating between app routes
        NgxUiLoaderHttpModule.forRoot({exclude: ['/api/account'], showForeground: false}),
        TranslationModule,
    ],
    declarations: [JhiMainComponent],
    providers: [
        AppNgxUiLoaderService, ConfigService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        },
        {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
        {provide: MAT_DATE_FORMATS, useValue: MY_NATIVE_DATE_FORMATS},
        {provide: LOCALE_ID, useValue: 'es-MX'},
        {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
        {provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl()},
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
    exports: [
        SidebarComponent,
        FooterComponent
    ],
    bootstrap: [JhiMainComponent]
})
export class PortalAppModule {
    constructor(private dateAdapter: DateAdapter<Date>, private momentDateAdapter: DateAdapter<Moment>) {
        dateAdapter.setLocale('es-MX');
        momentDateAdapter.setLocale('es-MX');
    }
}


