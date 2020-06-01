import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {forkJoin, Observable, of, Subscription} from 'rxjs';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {LoginModalService} from 'app/core/login/login-modal.service';
import {AccountService} from 'app/core/auth/account.service';
import {Account} from 'app/core/user/account.model';
import {DashboardService} from 'app/application/home/dashboard-service';
import {filter, map,} from 'rxjs/operators';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {DocumentoElectronico, IDocumentoElectronico} from 'app/shared/model/documento-electronico.model';
import {MatTableDataSource} from '@angular/material/table';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label, ThemeService} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {TimeData} from 'app/shared/model/generic-model';
import {MensajeToast} from "app/mensaje/window.mensaje";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

type Theme = 'light-theme' | 'dark-theme';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    account: Account;
    username: Observable<string>;
    tiempo = 'en la semana hasta hoy';
    authSubscription: Subscription;
    modalRef: NgbModalRef;
    isLoadingResults = true;
    private _selectedTheme: Theme = 'light-theme';
    private lastEmmitedDocuments: DocumentoElectronico[] = [];
    private lastAprovedDocuments: DocumentoElectronico[] = [];
    private lastRejectedDocuments: DocumentoElectronico[] = [];
    private lastLowedDocuments: DocumentoElectronico[] = [];

    displayedColumns: string[] = ['rucCliente', 'numSerie', 'fecEmisionDoc', 'estadoSunat', 'total'];
    lastEmmitedDataSource: MatTableDataSource<IDocumentoElectronico> = new MatTableDataSource<IDocumentoElectronico>([]);
    lastAprovedDataSource: MatTableDataSource<IDocumentoElectronico> = new MatTableDataSource<IDocumentoElectronico>([]);
    lastRejectedDataSource: MatTableDataSource<IDocumentoElectronico> = new MatTableDataSource<IDocumentoElectronico>([]);
    lastLowedDataSource: MatTableDataSource<IDocumentoElectronico> = new MatTableDataSource<IDocumentoElectronico>([]);

    public lineChartData: ChartDataSets[] = [
        {data: [0, 0, 0, 0, 0, 0, 0], label: 'Facturas'},
        {data: [0, 0, 0, 0, 0, 0, 0], label: 'Boletas'},
        {data: [0, 0, 0, 0, 0, 0, 0], label: 'Notas de Crédito'},
        {data: [0, 0, 0, 0, 0, 0, 0], label: 'Notas de Débito'},
    ];
    public lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
    public lineChartColors: Color[] = [{ // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#4dd0e1',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }, { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: '#4caf50',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
    }, { // red
        backgroundColor: '#f5f5f5',
        borderColor: '#f44336',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }, { // red
        backgroundColor: '#f5f5f5',
        borderColor: '#fbc02d',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [pluginAnnotations];
    @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private route: Router,
        private dashboardService: DashboardService,
        private themeService: ThemeService,
        protected snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.accountService.identity().subscribe((account: Account) => {
            this.account = account;
            this.username = of(account.nombUsuario);
        });
        this.registerAuthenticationSuccess();
        const allOperations = [];
        allOperations.push(this.observarDocumentos(this.dashboardService.lastEmmitedDocuments()));
        allOperations.push(this.observarDocumentos(this.dashboardService.lastAprovedDocuments()));
        allOperations.push(this.observarDocumentos(this.dashboardService.lastRejectedDocuments()));
        allOperations.push(this.observarDocumentos(this.dashboardService.lastLowedDocuments()));
        this.observarTime(this.dashboardService.weekDocuments()).subscribe(timeData => {
            this.isLoadingResults = false;
            this.lineChartLabels = timeData.columns;
            this.lineChartData = timeData.documentos;
        });
        forkJoin(allOperations).subscribe((responsesBody: Array<any[]>) => {
            this.isLoadingResults = false;
            this.lastEmmitedDocuments = responsesBody[0];
            this.lastAprovedDocuments = responsesBody[1];
            this.lastRejectedDocuments = responsesBody[2];
            this.lastLowedDocuments = responsesBody[3];
            // this.lineChartData.forEach(value => this.lineChartLabels.push(value.label))
            this.lastEmmitedDataSource.connect().next(this.lastEmmitedDocuments);
            this.lastAprovedDataSource.connect().next(this.lastAprovedDocuments);
            this.lastRejectedDataSource.connect().next(this.lastRejectedDocuments);
            this.lastLowedDataSource.connect().next(this.lastLowedDocuments);
        }, (res: HttpErrorResponse) => this.onError(res));
    }

    observarDocumentos(observable: Observable<HttpResponse<IDocumentoElectronico[]>>): Observable<IDocumentoElectronico[]> {
        return observable.pipe(filter((res: HttpResponse<IDocumentoElectronico[]>) => res.ok), map((res: HttpResponse<IDocumentoElectronico[]>) => res.body));
    }

    observarTime(observable: Observable<HttpResponse<TimeData>>): Observable<TimeData> {
        return observable.pipe(filter((res: HttpResponse<TimeData>) => res.ok),
            map((res: HttpResponse<TimeData>) => res.body));
    }

    registerAuthenticationSuccess() {
        this.authSubscription = this.eventManager.subscribe('authenticationSuccess', () => {
            this.accountService.identity().subscribe(account => {
                this.account = account;
            });
        });
    }

    protected onError(response: HttpErrorResponse) {
        this.isLoadingResults = false;
        this.isLoadingResults = false;
        if (this.accountService.isAuthenticated()) {
            if (response.status === 401) {
                this.showToast('Su sesión ha caducado, inicie sesión nuevamente para continuar.', 'Sesión caducada', false);
                this.route.navigate(['/login']);
            } else if (response.status === 400) {
                this.showToast('Ocurrió un error. Los datos enviados no son correctos', 'Error', false);
            } else {
                this.showToast(response.message, 'Error', false);
            }
        }
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    ngOnDestroy() {
        if (this.authSubscription) {
            this.eventManager.destroy(this.authSubscription);
        }
    }

    public get selectedTheme() {
        return this._selectedTheme;
    }

    public set selectedTheme(value) {
        this._selectedTheme = value;
        let overrides: ChartOptions;
        if (this.selectedTheme === 'dark-theme') {
            overrides = {
                legend: {
                    labels: {fontColor: 'white'}
                },
                scales: {
                    xAxes: [{
                        ticks: {fontColor: 'white'},
                        gridLines: {color: 'rgba(255,255,255,0.1)'}
                    }],
                    yAxes: [{
                        ticks: {fontColor: 'white'},
                        gridLines: {color: 'rgba(255,255,255,0.1)'}
                    }]
                }
            };
        } else {
            overrides = {};
        }
        this.themeService.setColorschemesOptions(overrides);
    }

    showToast(mensaje: string, title: string, success: boolean) {
        this.snackBar.openFromComponent(MensajeToast, {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: [success ? 'success-snackbar' : 'failure-snackbar'],
            announcementMessage: 'Esto es una prueba',
            data: {description: mensaje, title: title}
        });
    }

    setCurrentTheme(theme: Theme) {
        this.selectedTheme = theme;
    }

    public lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
        scales: {
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Documentos Emitidos por Fechas'
                    }
                }
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Monto Total'
                    }
                }
            ]
        },
        annotation: {
            annotations: [{
                type: 'line',
                mode: 'vertical',
                scaleID: 'x-axis-0',
                value: 'March',
                borderColor: 'orange',
                borderWidth: 2,
                label: {
                    enabled: true,
                    fontColor: 'orange',
                    content: 'LineAnno'
                }
            }]
        }
    };

    // events
    public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public hideOne() {
        const isHidden = this.chart.isDatasetHidden(1);
        this.chart.hideDataset(1, !isHidden);
    }

    public semanal() {
        this.isLoadingResults = true;
        this.tiempo = 'en la semana hasta hoy';
        this.observarTime(this.dashboardService.weekDocuments()).subscribe(timeData => {
            this.isLoadingResults = false;
            this.lineChartLabels = timeData.columns;
            this.lineChartData = timeData.documentos;
        }, (res: HttpErrorResponse) => this.onError(res));
    }

    public mensual() {
        this.isLoadingResults = true;
        this.tiempo = 'en los últimos 6 meses';
        this.observarTime(this.dashboardService.monthDocuments()).subscribe(timeData => {
            this.isLoadingResults = false;
            this.lineChartLabels = timeData.columns;
            this.lineChartData = timeData.documentos;
        }, (res: HttpErrorResponse) => this.onError(res));
    }

    public anual(): void {
        this.isLoadingResults = true;
        this.tiempo = 'en los últimos 5 años';
        this.observarTime(this.dashboardService.yearDocuments()).subscribe(timeData => {
            this.isLoadingResults = false;
            this.lineChartLabels = timeData.columns;
            this.lineChartData = timeData.documentos;
        }, (res: HttpErrorResponse) => this.onError(res));
    }
}
