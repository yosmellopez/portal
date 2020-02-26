import {Injectable, isDevMode} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';

import {AccountService} from 'app/core/auth/account.service';
import {LoginModalService} from 'app/core/login/login-modal.service';
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {exitCodeFromResult} from "@angular/compiler-cli";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class UserRouteAccessService implements CanActivate, CanActivateChild {
    constructor(private router: Router, private loginModalService: LoginModalService, private accountService: AccountService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const authorities = route.data['authorities'];
        // We need to call the checkLogin / and so the accountService.identity() function, to ensure,
        // that the client has a principal too, if they already logged in by the server.
        // This could happen on a page refresh.
        return this.checkLogin(authorities, state.url);
    }

    checkLogin(authorities: string[], url: string): Observable<boolean> {
        const result = this.accountService.identity(true).pipe(
            map(account => {
                if (account) {
                    if (!authorities || authorities.length === 0) {
                        return true;
                    }
                    const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
                    if (hasAnyAuthority) {
                        return true;
                    }
                    if (isDevMode()) {
                        console.error('User has not any of required authorities: ', authorities);
                    }
                    this.router.navigate(['accessdenied']);
                    return false;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
        result.subscribe(() => {
            return true;
        }, (error: HttpErrorResponse) => {
            console.error(error.message);
            this.router.navigate(['/login']);
        });
        return result;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const authorities = childRoute.data['authorities'];
        return this.checkLogin(authorities, state.url);
    }
}
