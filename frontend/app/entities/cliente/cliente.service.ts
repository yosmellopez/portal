import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { Cliente, ICliente } from 'app/shared/model/cliente.model';
import { AppResponseBody, TipoMoneda } from 'app/shared/model/generic-model';

type AppResponseArray = AppResponseBody<ICliente[]>;
type EntityResponseType = HttpResponse<ICliente>;
type EntityArrayResponseType = HttpResponse<AppResponseArray>;

@Injectable({providedIn: 'root'})
export class ClienteService {
    public resourceUrl = SERVER_API_URL + 'api/clientes';
    public clienteAllResource = SERVER_API_URL + 'api/all/clientes';
    public resourceSearchUrl = SERVER_API_URL + 'api/search/clientes';
    private clientes: Cliente[] = [];

    constructor(protected http: HttpClient) {
    }

    create(cliente: ICliente): Observable<EntityResponseType> {
        return this.http.post<ICliente>(this.resourceUrl, cliente, {observe: 'response'});
    }

    update(cliente: ICliente): Observable<EntityResponseType> {
        return this.http.put<ICliente>(`${this.resourceUrl}/${cliente.rucClient}`, cliente, {observe: 'response'});
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICliente>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<AppResponseArray>(this.resourceUrl, {params: options, observe: 'response'});
    }

    delete(rucClient: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${rucClient}`, {observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ICliente[]>> {
        const options = createRequestOption(req);
        return this.http.get<ICliente[]>(this.resourceSearchUrl, {params: options, observe: 'response'});
    }

    findAll(): Observable<HttpResponse<ICliente[]>> {
        return this.http.get<ICliente[]>(`${this.clienteAllResource}`, {observe: 'response'});
    }

    setClientes(clientes: Cliente[]) {
        this.clientes = clientes;
    }

    getClientes(): Cliente[] {
        return this.clientes;
    }
}
