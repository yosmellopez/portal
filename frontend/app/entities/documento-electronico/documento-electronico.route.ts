import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DocumentoElectronico, IDocumentoElectronico, TipoDocumento } from 'app/shared/model/documento-electronico.model';
import { DocumentoElectronicoService } from './documento-electronico.service';
import { DocumentoElectronicoComponent } from './documento-electronico.component';
import { DocumentoElectronicoDetailComponent } from './documento-electronico-detail.component';

export const tiposDocumentos: TipoDocumento[] = [
    {tipo: 'factura', title: 'Facturas de venta'},
    {tipo: 'boleta', title: 'Boletas de venta'},
    {tipo: 'nota-credito', title: 'Notas de crédito'},
    {tipo: 'nota-debito', title: 'Notas de débito'},
    {tipo: 'comprobante-percepcion', title: 'Comprobantes de percepción'},
    {tipo: 'comprobante-retencion', title: 'Comprobantes de retención'},
    {tipo: 'comunicacion-baja', title: 'Comunicación de baja'},
    {tipo: 'guia-remision', title: 'Guías de remisión'},
    {tipo: 'resumen-boleta', title: 'Resumen diario'},
    {tipo: 'registro-documentos', title: 'Registro de documentos'}
];

@Injectable({providedIn: 'root'})
export class DocumentoElectronicoResolve implements Resolve<IDocumentoElectronico> {
    constructor(private service: DocumentoElectronicoService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDocumentoElectronico> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DocumentoElectronico>) => response.ok),
                map((documentoElectronico: HttpResponse<DocumentoElectronico>) => documentoElectronico.body),
            );
        }
        return of(new DocumentoElectronico());
    }
}

@Injectable({providedIn: 'root'})
export class TipoDocumentoElectronicoResolve implements Resolve<TipoDocumento> {
    constructor() {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TipoDocumento> {
        const tipo = route.params['tipo'];
        const tipoDocumento = tiposDocumentos.filter(value => value.tipo === tipo) || tiposDocumentos[0];
        return of(tipoDocumento[0]);
    }
}

export const documentoElectronicoRoute: Routes = [
    {
        path: ':tipo',
        component: DocumentoElectronicoComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_RECEPTOR'],
            pageTitle: 'Documentos Electronicos',
            animation: 'isRight'
        },
        resolve: {
            tipo: TipoDocumentoElectronicoResolve
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DocumentoElectronicoDetailComponent,
        resolve: {
            documentoElectronico: DocumentoElectronicoResolve
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_RECEPTOR'],
            pageTitle: 'DocumentoElectronicos',
            animation: 'isLeft'
        },
        canActivate: [UserRouteAccessService]
    },
];