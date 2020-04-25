import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoginService} from 'app/core/login/login.service';
import {Router} from "@angular/router";
import {AccountService} from "app/core/auth/account.service";

@Injectable({providedIn: 'root'})
export class AuthExpiredInterceptor implements HttpInterceptor {
    constructor(
        private loginService: LoginService,
        private accountService: AccountService,
        private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {
                },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status !== 401) {
                            return;
                        }
                        if (this.accountService.isAuthenticated()) {
                            this.loginService.logout();
                            this.router.navigate(['login']);
                        }
                    }
                }
            )
        );
    }
}
