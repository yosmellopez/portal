import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResetPasswordRoutingModule} from './reset-password-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {JhMaterialModule} from "../shared/jh-material.module";
import {PasswordResetInitComponent} from "./init/password-reset-init.component";
import {PasswordResetFinishComponent} from "./finish/password-reset-finish.component";
import {PortalAccountModule} from "../account/account.module";
import {PasswordLenghtModule} from "../password-lenght/password-lenght.module";

@NgModule({
    declarations: [PasswordResetInitComponent, PasswordResetFinishComponent],
    imports: [CommonModule, ResetPasswordRoutingModule, JhMaterialModule, ReactiveFormsModule, PortalAccountModule, PasswordLenghtModule]
})
export class ResetPasswordModule {
}
