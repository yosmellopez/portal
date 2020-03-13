import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {map} from 'rxjs/operators';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

import {SERVER_API_URL} from 'app/app.constants';

@Injectable({providedIn: 'root'})
export class AuthServerProvider {
    constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {
    }

    getToken() {
        return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
    }

    login(credentials): Observable<any> {
        const data = {
            nombUsuario: credentials.nombUsuario,
            claveUsuario: credentials.claveUsuario,
            rememberMe: credentials.rememberMe
        };

        function authenticateSuccess(resp) {
            const bearerToken = resp.headers.get('authorization');
            if (bearerToken) {
                const jwt = bearerToken;
                this.storeAuthenticationToken(jwt, false);
                return jwt;
            }
        }

        return this.http.post(SERVER_API_URL + 'api/authenticate', data, {observe: 'response'}).pipe(map(authenticateSuccess.bind(this)));
    }

    loginWithToken(jwt, rememberMe) {
        if (jwt) {
            this.storeAuthenticationToken(jwt, rememberMe);
            return Promise.resolve(jwt);
        } else {
            return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
        }
    }

    storeAuthenticationToken(jwt, rememberMe) {
        if (rememberMe) {
            localStorage.setItem('authenticationToken', jwt);
            this.$localStorage.store('authenticationToken', jwt);
        } else {
            sessionStorage.setItem('authenticationToken', jwt);
            this.$sessionStorage.store('authenticationToken', jwt);
        }
    }

    logout(): Observable<any> {
        return new Observable(observer => {
            this.$localStorage.clear('authenticationToken');
            this.$sessionStorage.clear('authenticationToken');
            localStorage.removeItem("authenticationToken");
            sessionStorage.removeItem("authenticationToken");
            observer.complete();
        });
    }
}
