import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {AppResponse} from "app/shared/model/generic-model";

type ApplicationResponse = HttpResponse<AppResponse>;

@Injectable({providedIn: 'root'})
export class PasswordResetInitService {
    private rourceUrl = SERVER_API_URL + 'api/account/reset-password/init';

    constructor(private http: HttpClient) {
    }

    save(mail: string): Observable<ApplicationResponse> {
        return this.http.post<AppResponse>(this.rourceUrl, {email: mail}, {observe: 'response'});
    }
}
