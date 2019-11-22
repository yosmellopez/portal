import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { merge, of, Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { DocumentoElectronico, IDocumentoElectronico, TipoDocumento } from 'app/shared/model/documento-electronico.model';
import { AccountService } from 'app/core/auth/account.service';
import { DocumentoElectronicoService } from './documento-electronico.service';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';
import { AppResponseBody, Estado, MessageResponse, ProgressStatus, ProgressStatusEnum, Serie, TipoMoneda } from 'app/shared/model/generic-model';
import * as FileSaver from 'file-saver';
import { ExportType, MatTableExporterDirective, ExcelOptions } from 'mat-table-exporter';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Properties } from 'xlsx';
import { DatePipe } from '@angular/common';
import { PDFExportComponent } from '@progress/kendo-angular-pdf-export';
import { MatDialog } from '@angular/material/dialog';
import { Information, MensajeToast } from 'app/mensaje/window.mensaje';
import { MatSnackBar } from '@angular/material/snack-bar';

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'jhi-documento-electronico',
    templateUrl: './documento-electronico.component.html',
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class DocumentoElectronicoComponent implements OnInit, OnDestroy, AfterViewInit {
    documentoElectronicos: IDocumentoElectronico[];
    tiposMoneda: TipoMoneda[] = [];
    estados: Estado[] = [];
    series: Serie[] = [];
    dataSource: MatTableDataSource<IDocumentoElectronico> = new MatTableDataSource<IDocumentoElectronico>([]);
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: { rucClient: '', numSerie: '', numero: '', fechaEmisionInicio: any, fechaEmisionFin: any, estadoSunat: '', monedaTransaccion: '', tipoDoc: any };
    initCurrentSearch: { rucClient: '', numSerie: '', numero: '', fechaEmisionInicio: any, fechaEmisionFin: any, estadoSunat: '', monedaTransaccion: '', tipoDoc: any };
    tipoDocumento: TipoDocumento = {tipo: 'factura', title: 'Facturas'};
    resultsLength = 0;
    isLoadingResults = true;
    minDate: Date = new Date(1900, 1, 1);
    maxDate: Date = new Date();
    selectedEndDate: Date = new Date();
    selectedStartDate: Date = new Date(1900, 1, 1);
    matcher: ErrorStateMatcher = new ErrorStateMatcher();
    displayedColumns: string[] = ['rucClient', 'numSerie', 'fecEmisionDoc', 'estadoSunat', 'total', 'docPdf', 'docXml', 'docCdr', 'correo'];
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    formulario: FormGroup;
    @ViewChild('tableMat', {static: false}) table: ElementRef;
    @ViewChild('exporter', {static: false}) exporter: MatTableExporterDirective;
    @ViewChild('pdf', {static: false}) pdfExporter: PDFExportComponent;
    @ViewChild('expansionPanel', {static: false}) expansionPanel: MatExpansionPanel;
    @Output() public downloadStatus: EventEmitter<ProgressStatus>;

    constructor(
        protected documentoElectronicoService: DocumentoElectronicoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected route: Router,
        protected accountService: AccountService,
        protected datePipe: DatePipe,
        protected dialog: MatDialog,
        protected snackBar: MatSnackBar
    ) {
        this.downloadStatus = new EventEmitter<ProgressStatus>();
        this.createForm();
        this.currentSearch = this.initCurrentSearch;
    }

    loadAll() {
        this.isLoadingResults = true;
        this.documentoElectronicoService
            .query({
                tipo: this.tipoDocumento.tipo,
                page: this.paginator.pageIndex + 1,
                size: this.paginator.pageSize,
                sort: `${this.sort.active}`,
                direction: `${this.sort.direction}`
            }).pipe(
            filter((res: HttpResponse<AppResponseBody<IDocumentoElectronico[]>>) => res.ok),
            map((res: HttpResponse<AppResponseBody<IDocumentoElectronico[]>>) => res.body),
            map((res: AppResponseBody<IDocumentoElectronico[]>) => {
                this.resultsLength = res.total;
                return res.data;
            })
        ).subscribe(
            (data: IDocumentoElectronico[]) => {
                this.documentoElectronicos = data;
                this.dataSource.connect().next(this.documentoElectronicos);
                this.isLoadingResults = false;
            }, (res: HttpErrorResponse) => this.onError(res.message)
        );
        const monedasTipo = this.documentoElectronicoService.getTiposMonedas();
        if (monedasTipo.length === 0) {
            this.documentoElectronicoService.findTipoMoneda().pipe(
                filter((res: HttpResponse<TipoMoneda[]>) => res.ok),
                map((res: HttpResponse<TipoMoneda[]>) => res.body)
            ).subscribe((data: TipoMoneda[]) => {
                    this.tiposMoneda = data;
                    this.documentoElectronicoService.setTiposMoneda(this.tiposMoneda);
                }, (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.tiposMoneda = monedasTipo;
        }
        const estadosTemp = this.documentoElectronicoService.getEstados();
        if (estadosTemp.length === 0) {
            this.documentoElectronicoService.findEstados().pipe(
                filter((res: HttpResponse<Estado[]>) => res.ok),
                map((res: HttpResponse<Estado[]>) => res.body)
            ).subscribe((data: Estado[]) => {
                    this.estados = data;
                    this.documentoElectronicoService.setEstados(this.estados);
                }, (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.estados = estadosTemp;
        }
        const seriesTemp = this.documentoElectronicoService.getSeries();
        if (seriesTemp.length === 0) {
            this.documentoElectronicoService.findSeriesDocumentos().pipe(
                filter((res: HttpResponse<Serie[]>) => res.ok),
                map((res: HttpResponse<Serie[]>) => res.body)
            ).subscribe((data: Serie[]) => {
                    this.series = data;
                    this.documentoElectronicoService.setSeries(this.series);
                }, (res: HttpErrorResponse) => this.onError(res.message)
            );
        } else {
            this.series = seriesTemp;
        }
    }

    search() {
        this.isLoadingResults = true;
        const values = this.formulario.value;
        this.currentSearch = {...values};
        if (values.fechaEmisionInicio) {
            this.currentSearch.fechaEmisionInicio = this.datePipe.transform(values.fechaEmisionInicio, 'dd/MM/yyyy');
        }
        if (values.fechaEmisionFin) {
            this.currentSearch.fechaEmisionFin = this.datePipe.transform(values.fechaEmisionFin, 'dd/MM/yyyy');
        }
        this.currentSearch.tipoDoc = this.tipoDocumento.tipo;
        this.documentoElectronicoService.search(this.currentSearch).pipe(
            filter((res: HttpResponse<IDocumentoElectronico[]>) => res.ok),
            map((res: HttpResponse<IDocumentoElectronico[]>) => res.body)
        ).subscribe((data: IDocumentoElectronico[]) => {
                this.documentoElectronicos = data;
                this.dataSource.connect().next(this.documentoElectronicos);
                this.isLoadingResults = false;
            },
            (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.currentSearch = this.initCurrentSearch;
        this.loadAll();
    }

    ngOnInit() {
        const paso = true;
        this.activatedRoute.data.subscribe(({tipo}) => {
            this.tipoDocumento = tipo;
        });
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDocumentoElectronicos();
        this.route.events.subscribe(route => {
            this.expansionPanel.close();
            this.formulario.reset({rucClient: '', numSerie: '', numero: '', fechaEmisionInicio: '', fechaEmisionFin: '', estadoSunat: '', monedaTransaccion: ''});
            if (route instanceof NavigationEnd && paso) {
                this.loadAll();
            }
        });
    }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.loadAll();
        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                return this.documentoElectronicoService.query({
                    tipo: this.tipoDocumento.tipo,
                    page: this.paginator.pageIndex + 1,
                    size: this.paginator.pageSize,
                    sort: `${this.sort.active}`,
                    direction: `${this.sort.direction}`
                });
            }),
            filter((res: HttpResponse<AppResponseBody<IDocumentoElectronico[]>>) => res.ok),
            map((res: HttpResponse<AppResponseBody<IDocumentoElectronico[]>>) => res.body),
            map((res: AppResponseBody<IDocumentoElectronico[]>) => {
                this.isLoadingResults = false;
                this.resultsLength = res.total;
                return res.data;
            }),
            catchError(() => {
                return of([]);
            }))
            .subscribe((res: IDocumentoElectronico[]) => {
                this.documentoElectronicos = res;
                this.dataSource.connect().next(this.documentoElectronicos);
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    downloadDocument(document: DocumentoElectronico, tipo: string) {
        this.downloadStatus.emit({status: ProgressStatusEnum.START});
        this.documentoElectronicoService.downloadDocument(document, tipo).subscribe(
            data => {
                switch (data.type) {
                    case HttpEventType.DownloadProgress:
                        this.downloadStatus.emit({status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100)});
                        break;
                    case HttpEventType.Response:
                        switch (tipo) {
                            case 'pdf':
                                FileSaver.saveAs(data.body, document.docPdf);
                                break;
                            case 'xml':
                                FileSaver.saveAs(data.body, document.docXml);
                                break;
                            case 'cdr':
                                FileSaver.saveAs(data.body, document.docCdr);
                                break;
                        }
                        break;
                }
            },
            (error: HttpErrorResponse) => {
                if (error.status === 404) {
                    this.showToast(`No se encontró el documento ${document.numSerie}.${tipo}`, 'Documento no encontrado', false);
                }
            }
        );
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    reset() {
        this.currentSearch = this.initCurrentSearch;
        this.createForm();
    }

    registerChangeInDocumentoElectronicos() {
        this.eventSubscriber = this.eventManager.subscribe('documentoElectronicoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.isLoadingResults = false;
        this.showToast(errorMessage, 'Error', false);
    }

    sendEmail(documento: DocumentoElectronico) {
        this.isLoadingResults = true;
        this.documentoElectronicoService.sendEmail(documento).pipe(
            filter((res: HttpResponse<MessageResponse>) => res.ok),
            map((res: HttpResponse<MessageResponse>) => res.body)
        ).subscribe(response => {
            this.isLoadingResults = false;
            this.showToast(response.message, 'Información', true);
        }, (res: HttpErrorResponse) => this.onError(res.error.error));
    }

    exportarTabla() {
        const properties: Properties = {Author: 'Ventura Soluciones', Title: this.tipoDocumento.title};
        const excelOptions: ExcelOptions = {fileName: this.tipoDocumento.title, sheet: this.tipoDocumento.tipo, Props: properties};
        this.exporter.exportTable(ExportType.XLSX, excelOptions);
    }

    exportarPDF() {
        this.pdfExporter.author = 'Ventura Soluciones';
        this.pdfExporter.title = this.tipoDocumento.title;
        this.pdfExporter.margin = {right: -590};
        this.pdfExporter.saveAs(this.tipoDocumento.title);
    }

    showToast(mensaje: string, title: string = 'Error', success: boolean) {
        this.snackBar.openFromComponent(MensajeToast, {
            duration: 4000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: [success ? 'success-snackbar' : 'failure-snackbar'],
            announcementMessage: 'Esto es una prueba',
            data: {description: mensaje, title: title}
        });
    }

    createForm() {
        this.formulario = new FormGroup({
            rucClient: new FormControl('', []),
            numSerie: new FormControl('', []),
            numero: new FormControl('', []),
            fechaEmisionInicio: new FormControl('', []),
            fechaEmisionFin: new FormControl('', []),
            estadoSunat: new FormControl('', []),
            monedaTransaccion: new FormControl('', []),
        });
        this.formulario.controls['fechaEmisionInicio'].valueChanges.subscribe(value => {
            if (value) {
                const fecha = {year: value._i.year, month: value._i.month, date: value._i.date};
                this.selectedStartDate = new Date(fecha.year, fecha.month, fecha.date);
            }
        });
        this.formulario.controls['fechaEmisionFin'].valueChanges.subscribe(value => {
            if (value) {
                const fecha = {year: value._i.year, month: value._i.month, date: value._i.date};
                this.selectedEndDate = new Date(fecha.year, fecha.month, fecha.date);
            }
        });
    }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
