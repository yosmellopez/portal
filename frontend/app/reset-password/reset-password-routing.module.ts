import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PasswordResetInitComponent} from "app/reset-password/init/password-reset-init.component";
import {PasswordResetFinishComponent} from "app/reset-password/finish/password-reset-finish.component";

const routes: Routes = [
    {
        path: 'init',
        component: PasswordResetInitComponent,
        data: {
            pageTitle: 'login.acceso.title'
        }
    },
    {
        path: 'finish',
        component: PasswordResetFinishComponent,
        data: {
            pageTitle: 'login.acceso.title'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResetPasswordRoutingModule {
}
