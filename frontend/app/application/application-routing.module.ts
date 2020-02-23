import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApplicationComponent} from 'app/application/application.component';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {navbarRoute} from 'app/layouts/navbar/navbar.route';
import {errorRoute} from 'app/layouts/error/error.route';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

const routes: Routes = [
    {
        path: '',
        component: ApplicationComponent,
        children: [
            {
                path: 'admin',
                loadChildren: () => import('../admin/admin.module').then(m => m.PortalAdminModule),
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'account',
                loadChildren: () => import('../account/account.module').then(m => m.PortalAccountModule),
                canActivate: [UserRouteAccessService]
            },
            {
                path: 'home',
                loadChildren: () => import('../home/home.module').then(m => m.PortalHomeModule),
                canActivate: [UserRouteAccessService]
            },
            ...LAYOUT_ROUTES
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
