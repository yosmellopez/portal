import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AccountService } from 'app/core/auth/account.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { StateStorageService } from './state-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { JhiLoginModalComponent } from 'app/shared/login/login.component';

@Injectable({providedIn: 'root'})
export class UserRouteAccessService implements CanActivate {
    constructor(
        private router: Router,
        private loginModalService: LoginModalService,
        private accountService: AccountService,
        private stateStorageService: StateStorageService,
        private dialog: MatDialog
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        const authorities = route.data['authorities'];
        return this.checkLogin(authorities, state.url);
    }

    checkLogin(authorities: string[], url: string): Promise<boolean> {
        return this.accountService.identity().then(account => {
            if (!authorities || authorities.length === 0) {
                return true;
            }

            if (account) {
                const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
                if (hasAnyAuthority) {
                    return true;
                }
                if (isDevMode()) {
                    console.error('User has not any of required authorities: ', authorities);
                }
                this.router.navigate(['/accessdenied']);
                return false;
            } else {
                this.stateStorageService.storeUrl(url);
                this.router.navigate(['/signin']);
                const dialogRef = this.dialog.open(JhiLoginModalComponent, {width: '450px'});
                return false;
            }
        });
    }
}
