import {Route} from '@angular/router';

import {ActivateComponent} from './activate.component';

export const activateRoute: Route = {
    path: 'activate',
    component: ActivateComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_RECEPTOR'],
        pageTitle: 'Activation'
    }
};
