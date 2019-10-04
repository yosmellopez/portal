import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PasswordComponent } from './password.component';

export const passwordRoute: Route = {
    path: 'password',
    component: PasswordComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_RECEPTOR'],
        pageTitle: 'Contraseña de usuario'
    },
    canActivate: [UserRouteAccessService]
};
