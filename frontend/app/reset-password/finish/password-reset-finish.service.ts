import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResetResponse} from "../../shared/model/usuario.model";
import {SERVER_API_URL} from "../../app.constants";


@Injectable({providedIn: 'root'})
export class PasswordResetFinishService {
    constructor(private http: HttpClient) {
    }

    save(keyAndPassword: any): Observable<HttpResponse<ResetResponse>> {
        return this.http.post<ResetResponse>(SERVER_API_URL + 'api/account/reset-password/finish', keyAndPassword, {observe: 'response'});
    }

    validateToken(keyAndPassword: string): Observable<HttpResponse<ResetResponse>> {
        return this.http.post<ResetResponse>(SERVER_API_URL + 'api/token/validate', {token: keyAndPassword}, {observe: 'response'});
    }
}
