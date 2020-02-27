import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from 'app/login/login.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        data: {
            pageTitle: 'Inicio de Sesión de Usuario | Portal Facturación Electrónica'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {
}
