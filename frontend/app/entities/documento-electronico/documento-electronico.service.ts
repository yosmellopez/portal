import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDocumentoElectronico } from 'app/shared/model/documento-electronico.model';
import { AppResponseBody, Estado, MessageResponse, Serie, TipoMoneda } from 'app/shared/model/generic-model';

type AppResponse = AppResponseBody<IDocumentoElectronico>;
type AppResponseArray = AppResponseBody<IDocumentoElectronico[]>;
type EntityResponseType = HttpResponse<AppResponse>;
type EntityArrayResponseType = HttpResponse<AppResponseArray>;
type EntitySearchResponseType = HttpResponse<IDocumentoElectronico[]>;

@Injectable({providedIn: 'root'})
export class DocumentoElectronicoService {
    public resourceUrl = SERVER_API_URL + 'api/documentos';
    public resourceSearchUrl = SERVER_API_URL + 'api/search/documentos';
    public resourceMonedaUrl = SERVER_API_URL + 'api/monedas';
    public resourceEstadoUrl = SERVER_API_URL + 'api/estados';
    public downloadUrl = SERVER_API_URL + 'api/download';
    public sendMailUrl = SERVER_API_URL + 'api/sendMail';
    private tiposMonedas: TipoMoneda[] = [];
    private estados: Estado[] = [];
    private series: Serie[] = [];

    constructor(protected http: HttpClient) {
    }

    create(documentoElectronico: IDocumentoElectronico): Observable<EntityResponseType> {
        return this.http.post<AppResponse>(this.resourceUrl, documentoElectronico, {observe: 'response'});
    }

    update(documentoElectronico: IDocumentoElectronico): Observable<EntityResponseType> {
        return this.http.put<AppResponseBody<IDocumentoElectronico>>(this.resourceUrl, documentoElectronico, {observe: 'response'});
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AppResponse>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<AppResponseArray>(this.resourceUrl, {params: options, observe: 'response'});
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    search(req?: any): Observable<EntitySearchResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDocumentoElectronico[]>(this.resourceSearchUrl, {params: options, observe: 'response'});
    }

    findTipoMoneda(): Observable<HttpResponse<TipoMoneda[]>> {
        return this.http.get<TipoMoneda[]>(this.resourceMonedaUrl, {observe: 'response'});
    }

    findEstados(): Observable<HttpResponse<Estado[]>> {
        return this.http.get<Estado[]>(this.resourceEstadoUrl, {observe: 'response'});
    }

    findSeriesDocumentos(): Observable<HttpResponse<Serie[]>> {
        return this.http.get<Serie[]>(`${this.resourceUrl}/series`, {observe: 'response'});
    }

    sendEmail(documento: IDocumentoElectronico): Observable<HttpResponse<MessageResponse>> {
        return this.http.put<MessageResponse>(`${this.sendMailUrl}/${documento.idDocumento}`, documento, {observe: 'response'});
    }

    downloadDocument(document: IDocumentoElectronico, tipo: string): Observable<HttpEvent<Blob>> {
        return this.http.request(new HttpRequest(
            'GET',
            `${this.downloadUrl}/${document.idDocumento}?tipo=${tipo}`,
            null,
            {
                reportProgress: true,
                responseType: 'blob'
            }));
    }

    setTiposMoneda(tiposMoneda: TipoMoneda[]) {
        this.tiposMonedas = tiposMoneda;
    }

    getTiposMonedas(): TipoMoneda[] {
        return this.tiposMonedas;
    }

    setEstados(estados: Estado[]) {
        this.estados = estados;
    }

    getEstados(): Estado[] {
        return this.estados;
    }

    setSeries(series: Serie[]) {
        this.series = series;
    }

    getSeries(): Serie[] {
        return this.series;
    }
}
