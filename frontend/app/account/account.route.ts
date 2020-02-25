import {Routes} from '@angular/router';

import {activateRoute} from './activate/activate.route';
import {passwordRoute} from './password/password.route';
import {settingsRoute} from './settings/settings.route';
import {AccountComponent} from "app/account/account.component";
import {navbarRoute} from "app/layouts/navbar/navbar.route";
import {errorRoute} from "app/layouts/error/error.route";

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];
const ACCOUNT_ROUTES = [activateRoute, passwordRoute, settingsRoute, ...LAYOUT_ROUTES];

export const accountState: Routes = [
    {
        path: '',
        component: AccountComponent,
        children: ACCOUNT_ROUTES
    }
];
