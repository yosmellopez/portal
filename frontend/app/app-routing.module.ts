import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {errorRoute} from './layouts/error/error.route';
import {navbarRoute} from './layouts/navbar/navbar.route';
import {DEBUG_INFO_ENABLED} from 'app/app.constants';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {SigninComponent} from 'app/layouts/signin/signin.component';
import {HomeComponent} from 'app/home/home.component';
import {LoginAccessService} from "app/core/auth/login-access-service";

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'login',
                    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
                    canActivate: [LoginAccessService]
                },
                {
                    path: '',
                    loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule),
                    canActivateChild: [UserRouteAccessService]
                },
                ...LAYOUT_ROUTES
            ],
            {enableTracing: DEBUG_INFO_ENABLED}
        )
    ],
    exports: [RouterModule]
})
export class PortalAppRoutingModule {
}
