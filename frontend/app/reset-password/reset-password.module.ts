import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResetPasswordRoutingModule} from './reset-password-routing.module';
import {JhMaterialModule} from "app/shared/jh-material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordResetInitComponent} from "app/reset-password/init/password-reset-init.component";
import {PasswordResetFinishComponent} from "app/reset-password/finish/password-reset-finish.component";
import {PortalAccountModule} from "app/account/account.module";

@NgModule({
    declarations: [PasswordResetInitComponent, PasswordResetFinishComponent],
    imports: [CommonModule, ResetPasswordRoutingModule, JhMaterialModule, ReactiveFormsModule, PortalAccountModule]
})
export class ResetPasswordModule {
}
