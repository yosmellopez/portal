import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SigninComponent } from 'app/layouts/signin/signin.component';
import { HomeComponent } from 'app/home/home.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'signin',
                    component: SigninComponent
                },
                {
                    path: 'home',
                    component: HomeComponent,
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'admin',
                    loadChildren: () => import('./admin/admin.module').then(m => m.PortalAdminModule),
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'account',
                    loadChildren: () => import('./account/account.module').then(m => m.PortalAccountModule),
                    canActivate: [UserRouteAccessService]
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
