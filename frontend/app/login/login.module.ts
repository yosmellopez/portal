import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {JhMaterialModule} from "app/shared/jh-material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, LoginRoutingModule, JhMaterialModule, ReactiveFormsModule, PerfectScrollbarModule]
})
export class LoginModule {
}
