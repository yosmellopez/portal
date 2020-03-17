import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IUsuario} from 'app/shared/model/usuario.model';
import {AppResponseBody} from 'app/shared/model/generic-model';

type AppResponseArray = AppResponseBody<IUsuario[]>;
type EntityResponseType = HttpResponse<IUsuario>;
type EntityArrayResponseType = HttpResponse<AppResponseArray>;

@Injectable({providedIn: 'root'})
export class UsuarioService {
    public resourceUrl = SERVER_API_URL + 'api/usuarios';
    public resetUrl = SERVER_API_URL + 'api/user';
    public resetUserUrl = SERVER_API_URL + 'api/user/password-reset';
    public resourceSearchUrl = SERVER_API_URL + 'api/search/usuarios';

    constructor(protected http: HttpClient) {
    }

    create(usuario: IUsuario): Observable<EntityResponseType> {
        return this.http.post<IUsuario>(this.resourceUrl, usuario, {observe: 'response'});
    }

    update(usuario: IUsuario): Observable<EntityResponseType> {
        return this.http.put<IUsuario>(`${this.resourceUrl}/${usuario.idUsuario}`, usuario, {observe: 'response'});
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUsuario>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<AppResponseArray>(this.resourceUrl, {params: options, observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<IUsuario[]>> {
        const options = createRequestOption(req);
        return this.http.get<IUsuario[]>(this.resourceSearchUrl, {params: options, observe: 'response'});
    }

    sendEmailMassive(): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.resetUrl}/resetMasive`, {}, {observe: 'response'});
    }

    sendEmailToUser(usuario: IUsuario): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.resetUserUrl}/${usuario.idUsuario}`, {}, {observe: 'response'});
    }
}
