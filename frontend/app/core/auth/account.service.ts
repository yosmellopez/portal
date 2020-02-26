import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {Account} from 'app/core/user/account.model';
import {map, shareReplay, tap} from "rxjs/operators";
import {JhiLanguageService} from "ng-jhipster";
import {SessionStorageService} from "ngx-webstorage";

@Injectable({providedIn: 'root'})
export class AccountService {
    private userIdentity: Account;
    private authenticated = false;
    private authenticationState = new Subject<any>();
    private accountCache$: Observable<Account>;

    constructor(private http: HttpClient, private languageService: JhiLanguageService, private sessionStorage: SessionStorageService) {
    }

    fetch(): Observable<Account> {
        return this.http.get<Account>(SERVER_API_URL + 'api/account');
    }

    save(account: Account): Observable<Account> {
        return this.http.post<Account>(SERVER_API_URL + 'api/account', account);
    }

    authenticate(identity) {
        this.userIdentity = identity;
        this.authenticated = identity !== null;
        this.authenticationState.next(this.userIdentity);
    }

    hasAnyAuthority(authorities: string[] | string): boolean {
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.rol) {
            return false;
        }

        if (!Array.isArray(authorities)) {
            authorities = [authorities];
        }
        return authorities.includes(this.userIdentity.rol.role);
    }

    hasAuthority(authority: string): Observable<boolean> {
        if (!this.authenticated) {
            return of(false);
        }
        return this.identity().pipe(map(account => {
            return account.rol && account.rol.role === authority || false;
        }));
    }

    identity(force?: boolean): Observable<Account> {
        if (force) {
            this.accountCache$ = null;
        }

        if (!this.accountCache$) {
            this.accountCache$ = this.fetch().pipe(
                tap(
                    account => {
                        if (account) {
                            this.userIdentity = account;
                            this.authenticated = true;
                            // After retrieve the account info, the language will be changed to
                            // the user's preferred language configured in the account setting
                            if (this.userIdentity.langKey) {
                                const langKey = this.sessionStorage.retrieve('locale') || this.userIdentity.langKey;
                                this.languageService.changeLanguage(langKey);
                            }
                        } else {
                            this.userIdentity = null;
                            this.authenticated = false;
                        }
                        this.authenticationState.next(this.userIdentity);
                    },
                    () => {
                        this.userIdentity = null;
                        this.authenticated = false;
                        this.authenticationState.next(this.userIdentity);
                    }
                ),
                shareReplay()
            );
        }
        return this.accountCache$;
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    isIdentityResolved(): boolean {
        return this.userIdentity !== undefined;
    }

    getAuthenticationState(): Observable<any> {
        return this.authenticationState.asObservable();
    }

    getImageUrl(): string {
        return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
    }
}
