import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PortalSharedModule} from 'app/shared/shared.module';

import {PasswordStrengthBarComponent} from './password/password-strength-bar.component';
import {RegisterComponent} from './register/register.component';
import {ActivateComponent} from './activate/activate.component';
import {PasswordComponent} from './password/password.component';
import {PasswordResetInitComponent} from './password-reset/init/password-reset-init.component';
import {PasswordResetFinishComponent} from './password-reset/finish/password-reset-finish.component';
import {SettingsComponent} from './settings/settings.component';
import {accountState} from './account.route';
import {PasswordLenghtModule} from 'app/password-lenght/password-lenght.module';
import {AccountComponent} from "app/account/account.component";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

@NgModule({
    imports: [PortalSharedModule, RouterModule.forChild(accountState), PasswordLenghtModule, PerfectScrollbarModule],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent,
        AccountComponent
    ],
    exports: [PasswordResetInitComponent]
})
export class PortalAccountModule {
}
