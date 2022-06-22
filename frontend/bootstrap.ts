import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {DEBUG_INFO_ENABLED} from './app/app.constants';
import {PortalAppModule} from "./app/app.module";

// disable debug data on prod profile to improve performance
if (!DEBUG_INFO_ENABLED) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(PortalAppModule, {preserveWhitespaces: true})
    // eslint-disable-next-line no-console
    .then(() => console.log('Application started'))
    .catch(err => console.error(err));
