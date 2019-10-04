import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SettingsComponent } from './settings.component';

export const settingsRoute: Route = {
    path: 'settings',
    component: SettingsComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_RECEPTOR'],
        pageTitle: 'Settings'
    },
    canActivate: [UserRouteAccessService]
};
