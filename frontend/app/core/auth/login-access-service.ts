import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {AccountService} from 'app/core/auth/account.service';

@Injectable({providedIn: 'root'})
export class LoginAccessService implements CanActivate {
    respuesta: Observable<boolean> = of(true);

    constructor(private router: Router, private accountService: AccountService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkLogin();
    }

    checkLogin(): Observable<boolean> {
        this.accountService
            .identity()
            .pipe(
                map(account => {
                    if (account) {
                        this.router.navigate(['']);
                    }
                    this.respuesta = of(true);
                    return true;
                })
            )
            .subscribe();
        return this.respuesta;
    }
}
