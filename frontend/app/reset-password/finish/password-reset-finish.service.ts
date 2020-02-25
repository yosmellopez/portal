import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {ResetResponse} from "app/shared/model/usuario.model";

@Injectable({providedIn: 'root'})
export class PasswordResetFinishService {
    constructor(private http: HttpClient) {
    }

    save(keyAndPassword: any): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/account/reset-password/finish', keyAndPassword);
    }

    validateToken(keyAndPassword: string): Observable<HttpResponse<ResetResponse>> {
        return this.http.post<HttpResponse<ResetResponse>>(SERVER_API_URL + 'api/token/validate', {token: keyAndPassword});
    }
}
