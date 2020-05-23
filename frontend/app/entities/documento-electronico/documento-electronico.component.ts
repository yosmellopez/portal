import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {merge, of, Subscription} from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {JhiEventManager} from 'ng-jhipster';
import {DocumentoElectronico, IDocumentoElectronico, TipoDocumento} from 'app/shared/model/documento-electronico.model';
import {AccountService} from 'app/core/auth/account.service';
import {DocumentoElectronicoService} from './documento-electronico.service';
import {DateAdapter, ErrorStateMatcher, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {catchError, filter, map, startWith, switchMap} from 'rxjs/operators';
import {
    AppResponseBody,
    Estado,
    MessageResponse,
    ProgressStatus,
    ProgressStatusEnum,
    Serie,
    TipoMoneda
} from 'app/shared/model/generic-model';
import * as FileSaver from 'file-saver';
import {ExcelOptions, ExportType, MatTableExporterDirective} from 'mat-table-exporter';
import {MatExpansionPanel} from '@angular/material/expansion';
import {Properties} from 'xlsx';
import {PDFExportComponent} from '@progress/kendo-angular-pdf-export';
import {MatDialog} from '@angular/material/dialog';
import {Confirm, MensajeToast} from 'app/mensaje/window.mensaje';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from "@angular/material/sort";
import {MatDatepicker} from "@angular/material/datepicker";
// @ts-ignore
import * as moment from 'moment';
import {Moment} from 'moment';
import {animate, state, style, transition, trigger} from "@angular/animations";

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
    styleUrls: ['./documento-electronico.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    providers: [{
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    }, {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}]
})
export class DocumentoElectronicoComponent implements OnInit, OnDestroy, AfterViewInit {
    documentoElectronicos: IDocumentoElectronico[];
    tiposMoneda: TipoMoneda[] = [];
    estados: Estado[] = [];
    series: Serie[] = [];
    dataSource: MatTableDataSource<IDocumentoElectronico> = new MatTableDataSource<IDocumentoElectronico>([]);
    expandedElement: IDocumentoElectronico;
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: { rucClient: '', numSerie: '', numero: '', fechaEmisionInicio: any, fechaEmisionFin: any, estadoSunat: '', monedaTransaccion: '', tipoDoc: any, razonSocial: '' };
    initCurrentSearch: { rucClient: '', numSerie: '', numero: '', fechaEmisionInicio: any, fechaEmisionFin: any, estadoSunat: '', monedaTransaccion: '', tipoDoc: any, razonSocial: '' };
    tipoDocumento: TipoDocumento = {tipo: 'factura', title: 'Facturas'};
    resultsLength = 0;
    isLoadingResults = true;
    matcher: ErrorStateMatcher = new ErrorStateMatcher();
    displayedColumns: string[] = ['expandido', 'rucClient', 'numSerie', 'fecEmisionDoc', 'estadoSunat', 'total', 'docPdf', 'docXml', 'docCdr', 'correo'];
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    formulario: FormGroup;
    @ViewChild('tableMat', {static: false}) table: ElementRef;
    @ViewChild('exporter', {static: false}) exporter: MatTableExporterDirective;
    @ViewChild('pdf', {static: false}) pdfExporter: PDFExportComponent;
    @ViewChild('expansionPanel', {static: false}) expansionPanel: MatExpansionPanel;
    @ViewChild('fechaInicio', {static: true}) fechaInicio: MatDatepicker<Moment>;
    @ViewChild('fechaFin', {static: true}) fechaFin: MatDatepicker<Moment>;
    @Output() public downloadStatus: EventEmitter<ProgressStatus>;

    constructor(
        protected documentoElectronicoService: DocumentoElectronicoService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected route: Router,
        protected accountService: AccountService,
        protected dialog: MatDialog,
        protected snackBar: MatSnackBar,
        private dateAdapter: DateAdapter<Date>, private momentDateAdapter: DateAdapter<Moment>
    ) {
        this.downloadStatus = new EventEmitter<ProgressStatus>();
        this.createForm();
        this.currentSearch = this.initCurrentSearch;
        dateAdapter.setLocale('es');
        momentDateAdapter.setLocale('es');
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
            }, (res: HttpErrorResponse) => this.onError(res)
        );
        const monedasTipo = this.documentoElectronicoService.getTiposMonedas();
        if (monedasTipo.length === 0) {
            this.documentoElectronicoService.findTipoMoneda().pipe(
                filter((res: HttpResponse<TipoMoneda[]>) => res.ok),
                map((res: HttpResponse<TipoMoneda[]>) => res.body)
            ).subscribe((data: TipoMoneda[]) => {
                    this.tiposMoneda = data;
                    this.documentoElectronicoService.setTiposMoneda(this.tiposMoneda);
                }, (res: HttpErrorResponse) => this.onError(res)
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
                }, (res: HttpErrorResponse) => this.onError(res)
            );
        } else {
            this.estados = estadosTemp;
        }
        this.documentoElectronicoService.findSeriesDocumentos(this.tipoDocumento.tipo).pipe(
            filter((res: HttpResponse<Serie[]>) => res.ok),
            map((res: HttpResponse<Serie[]>) => res.body)
        ).subscribe((data: Serie[]) => {
                this.series = data;
                this.documentoElectronicoService.setSeries(this.series);
            }, (res: HttpErrorResponse) => this.onError(res)
        );
    }

    search() {
        if (this.formulario.valid) {
            this.isLoadingResults = true;
            const values = this.formulario.value;
            this.currentSearch = {...values};
            if (values.fechaEmisionInicio) {
                const fechaInicio = values.fechaEmisionInicio as Moment;
                this.currentSearch.fechaEmisionInicio = fechaInicio.format('DD/MM/YYYY');
            } else {
                this.currentSearch.fechaEmisionInicio = moment("1990-01-01").format('DD/MM/YYYY');
            }
            if (values.fechaEmisionFin) {
                const fechaFin = values.fechaEmisionFin as Moment;
                this.currentSearch.fechaEmisionFin = fechaFin.format('DD/MM/YYYY');
            } else {
                this.currentSearch.fechaEmisionFin = moment().format('DD/MM/YYYY');
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
                (res: HttpErrorResponse) => this.onError(res));
        }
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
        this.accountService.identity().subscribe(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDocumentoElectronicos();
        this.route.events.subscribe(route => {
            this.expansionPanel.close();
            this.formulario.reset({
                rucClient: '',
                numSerie: '',
                numero: '',
                fechaEmisionInicio: '',
                fechaEmisionFin: '',
                estadoSunat: '',
                monedaTransaccion: '',
                razonSocial: ''
            });
            if (route instanceof NavigationEnd && paso) {
                this.loadAll();
            }
        });
    }

    ngAfterViewInit() {
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
            }, (res: HttpErrorResponse) => this.onError(res));
    }

    downloadDocument(document: DocumentoElectronico, tipo: string) {
        this.downloadStatus.emit({status: ProgressStatusEnum.START});
        this.documentoElectronicoService.downloadDocument(document, tipo).subscribe(
            data => {
                switch (data.type) {
                    case HttpEventType.DownloadProgress:
                        this.downloadStatus.emit({
                            status: ProgressStatusEnum.IN_PROGRESS,
                            percentage: Math.round((data.loaded / data.total) * 100)
                        });
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
        this.loadAll();
    }

    registerChangeInDocumentoElectronicos() {
        this.eventSubscriber = this.eventManager.subscribe('documentoElectronicoListModification', () => this.loadAll());
    }

    protected onError(response: HttpErrorResponse) {
        this.isLoadingResults = false;
        if (this.accountService.isAuthenticated()) {
            if (response.status === 401) {
                this.showToast('Su sesión ha caducado, inicie sesión nuevamente para continuar.', 'Sesión caducada', false);
                this.route.navigate(['/login']);
            } else if (response.status === 400) {
                this.showToast('Ocurrió un error. Los datos enviados no son correctos', 'Error', false);
            } else if (response.status === 500) {
                this.showToast('Ha ocurrido un error interno, por favor inténtelo más tarde o comuníquese con su administrador del sistema.', 'Error Interno', false);
            } else {
                this.showToast(response.message, 'Error', false);
            }
        }
    }

    sendEmail(documento: DocumentoElectronico) {
        const dialogRef = this.dialog.open(Confirm, {
            data: {
                accion: 'Enviar Documento',
                description: `¿Desea enviar por correo el documento [${documento.numSerie}]?`
            },
            width: '400px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.isLoadingResults = true;
                this.documentoElectronicoService.sendEmail(documento).pipe(
                    filter((res: HttpResponse<MessageResponse>) => res.ok),
                    map((res: HttpResponse<MessageResponse>) => res.body)
                ).subscribe(response => {
                    this.isLoadingResults = false;
                    this.showToast(response.mensaje, 'Información', true);
                }, (res: HttpErrorResponse) => this.onError(res));
            }
        });

    }

    exportarTabla() {
        const properties: Properties = {Author: 'Ventura Soluciones', Title: this.tipoDocumento.title};
        const excelOptions: ExcelOptions = {
            fileName: this.tipoDocumento.title,
            sheet: this.tipoDocumento.tipo,
            Props: properties,
            columnWidths: []
        };
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

    showFechaFin() {
        this.fechaFin.open();
    }

    showFechaInicio() {
        this.fechaInicio.open();
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
            razonSocial: new FormControl('', []),
        });
    }

    filterDaysInicial = (fecha: Moment) => {
        const fechaFinal = this.formulario.controls['fechaEmisionFin'].value as Moment;
        const fechaActual = moment();
        if (fechaFinal) {
            return (
                (fecha.year() < fechaActual.year() ? true : fecha.year() > fechaActual.year() ? false : fecha.dayOfYear() <= fechaActual.dayOfYear()) &&
                (fecha.year() < fechaFinal.year() ? true : fecha.year() > fechaFinal.year() ? false : fecha.dayOfYear() <= fechaFinal.dayOfYear())
            );
        } else {
            return fecha.year() < fechaActual.year() ? true : fecha.year() > fechaActual.year() ? false : fecha.dayOfYear() <= fechaActual.dayOfYear();
        }
    };

    filterDaysFinal = (fecha: Moment) => {
        const fechaInicial = this.formulario.controls['fechaEmisionInicio'].value as Moment;
        const fechaActual = moment();
        if (fechaInicial) {
            return (
                (fecha.year() < fechaActual.year() ? true : fecha.year() > fechaActual.year() ? false : fecha.dayOfYear() <= fechaActual.dayOfYear()) &&
                (fecha.year() > fechaInicial.year() ? true : fecha.year() < fechaInicial.year() ? false : fecha.dayOfYear() >= fechaInicial.dayOfYear())
            );
        } else {
            return fecha.year() < fechaActual.year() ? true : fecha.year() > fechaActual.year() ? false : fecha.dayOfYear() <= fechaActual.dayOfYear();
        }
    };

    expandCollapse(event: Event, elemento: IDocumentoElectronico) {
        event.stopPropagation();
        this.expandedElement = this.expandedElement === elemento ? null : elemento;
    }

}