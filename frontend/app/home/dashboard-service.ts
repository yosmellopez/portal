import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IDocumentoElectronico } from 'app/shared/model/documento-electronico.model';
import { Observable } from 'rxjs';
import { TimeData } from 'app/shared/model/generic-model';

type EntityArray = IDocumentoElectronico[];
type TimeArray = TimeData;
type EntityArrayResponseType = HttpResponse<EntityArray>;
type TimeArrayResponseType = HttpResponse<TimeArray>;

@Injectable({providedIn: 'root'})
export class DashboardService {
    public resourceUrl = SERVER_API_URL + 'api/documentos';

    constructor(protected http: HttpClient) {
    }

    lastEmmitedDocuments(): Observable<EntityArrayResponseType> {
        return this.http.get<EntityArray>(`${this.resourceUrl}/lastEmmited`, {observe: 'response'});
    }

    lastAprovedDocuments(): Observable<EntityArrayResponseType> {
        return this.http.get<EntityArray>(`${this.resourceUrl}/lastAproved`, {observe: 'response'});
    }

    lastRejectedDocuments(): Observable<EntityArrayResponseType> {
        return this.http.get<EntityArray>(`${this.resourceUrl}/lastRejected`, {observe: 'response'});
    }

    lastLowedDocuments(): Observable<EntityArrayResponseType> {
        return this.http.get<EntityArray>(`${this.resourceUrl}/lastLowed`, {observe: 'response'});
    }

    weekDocuments(): Observable<TimeArrayResponseType> {
        return this.http.get<TimeArray>(`${this.resourceUrl}/week`, {observe: 'response'});
    }

    monthDocuments(): Observable<TimeArrayResponseType> {
        return this.http.get<TimeArray>(`${this.resourceUrl}/month`, {observe: 'response'});
    }

    yearDocuments(): Observable<TimeArrayResponseType> {
        return this.http.get<TimeArray>(`${this.resourceUrl}/year`, {observe: 'response'});
    }
}