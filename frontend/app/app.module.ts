import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { PortalSharedModule } from 'app/shared/shared.module';
import { PortalCoreModule } from 'app/core/core.module';
import { PortalAppRoutingModule } from './app-routing.module';
import { PortalHomeModule } from './home/home.module';
import { PortalEntityModule } from './entities/entity.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { JhMaterialModule } from 'app/shared/jh-material.module';
import { SidebarComponent } from 'app/layouts/sidebar/sidebar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, NativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from 'app/es-locale-paginator';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MensajeModule } from 'app/mensaje/mensaje.module';
import { SigninComponent } from './layouts/signin/signin.component';
import { MatSelectModule } from '@angular/material/select';
import { ChartsModule } from 'ng2-charts';
import localePe from '@angular/common/locales/es-PE';
import { registerLocaleData } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { PortalAccountModule } from 'app/account/account.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
registerLocaleData(localePe, 'es');

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
        PortalSharedModule,
        PortalCoreModule,
        PortalHomeModule,
        PerfectScrollbarModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        PortalEntityModule,
        ChartsModule,
        JhMaterialModule,
        PortalAppRoutingModule,
        MatDatepickerModule,
        NativeDateModule,
        ReactiveFormsModule,
        MatTableExporterModule,
        MensajeModule,
        MatSelectModule,
        PDFExportModule
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent, SidebarComponent, SigninComponent],
    providers: [
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
        {provide: MAT_DATE_FORMATS, useValue: MY_NATIVE_DATE_FORMATS},
        {provide: LOCALE_ID, useValue: 'es'},
        {provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl()},
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class PortalAppModule {
}


