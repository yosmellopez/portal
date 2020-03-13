import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {merge, of, Subscription} from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {catchError, filter, map, startWith, switchMap} from 'rxjs/operators';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Cliente, ICliente} from 'app/shared/model/cliente.model';
import {AccountService} from 'app/core/auth/account.service';
import {ClienteService} from './cliente.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {AppResponseBody} from 'app/shared/model/generic-model';
import {Confirm, MensajeToast} from 'app/mensaje/window.mensaje';
import {MatDialog} from '@angular/material/dialog';
import {ClienteWindowComponent} from 'app/entities/cliente/cliente-window/cliente-window.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'jhi-cliente',
    templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit, OnDestroy, AfterViewInit {
    clientes: ICliente[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    resultsLength = 0;
    formulario: FormGroup;
    isLoadingResults = true;
    displayedColumns: string[] = ['rucClient', 'nombreClient', 'email', 'estadoCliente', 'acciones'];
    dataSource: MatTableDataSource<ICliente> = new MatTableDataSource<ICliente>([]);
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

    constructor(
        protected clienteService: ClienteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected route: Router,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService,
        protected dialog: MatDialog,
        protected snackBar: MatSnackBar
    ) {
        this.formulario = new FormGroup({
            rucClient: new FormControl('', []),
            nombreClient: new FormControl('', []),
            email: new FormControl('', []),
        });
    }

    loadAll() {
        this.isLoadingResults = true;
        this.clienteService
            .query({
                page: this.paginator.pageIndex + 1,
                size: this.paginator.pageSize,
                sort: `${this.sort.active}`,
                direction: `${this.sort.direction}`
            })
            .pipe(
                filter((res: HttpResponse<AppResponseBody<ICliente[]>>) => res.ok),
                map((res: HttpResponse<AppResponseBody<ICliente[]>>) => res.body),
                map((res: AppResponseBody<ICliente[]>) => res.data),
            )
            .subscribe(
                (res: ICliente[]) => {
                    this.isLoadingResults = false;
                    this.clientes = res;
                    this.dataSource.connect().next(this.clientes);
                },
                (res: HttpErrorResponse) => this.onError(res)
            );
    }

    search() {
        this.isLoadingResults = true;
        const values = this.formulario.value;
        let searchValues = {...values};
        this.clienteService.search(searchValues).pipe(
            filter((res: HttpResponse<ICliente[]>) => res.ok),
            map((res: HttpResponse<ICliente[]>) => res.body)
        ).subscribe((data: ICliente[]) => {
            this.clientes = data;
            this.dataSource.connect().next(this.clientes);
            this.isLoadingResults = false;
        }, (res: HttpErrorResponse) => this.onError(res));
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.accountService.identity().subscribe(account => {
            this.currentAccount = account;
        });
        this.registerChangeInClientes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICliente) {
        return item.rucClient;
    }

    registerChangeInClientes() {
        this.eventSubscriber = this.eventManager.subscribe('clienteListModification', () => this.loadAll());
    }

    protected onError(response: HttpErrorResponse) {
        this.isLoadingResults = false;
        if (response.status === 401) {
            this.showToast('Su sesión ha caducado, inicie sesión nuevamente para continuar.', 'Sesión caducada', false);
            this.route.navigate(['/login']);
        }
        if (this.accountService.isAuthenticated()) {
            this.showToast(response.message, 'Error', false);
        }
    }

    ngAfterViewInit() {
        this.isLoadingResults = true;
        this.loadAll();
        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(() => {
                return this.clienteService.query({
                    page: this.paginator.pageIndex + 1,
                    size: this.paginator.pageSize,
                    sort: `${this.sort.active}`,
                    direction: `${this.sort.direction}`
                });
            }),
            filter((res: HttpResponse<AppResponseBody<ICliente[]>>) => res.ok),
            map((res: HttpResponse<AppResponseBody<ICliente[]>>) => res.body),
            map((res: AppResponseBody<ICliente[]>) => {
                this.resultsLength = res.total;
                return res.data;
            }),
            catchError(() => {
                return of([]);
            }))
            .subscribe((res: ICliente[]) => {
                this.isLoadingResults = false;
                this.clientes = res;
                this.dataSource.connect().next(this.clientes);
            }, (res: HttpErrorResponse) => this.onError(res));
    }

    editCliente(cliente: Cliente) {
        const dialogRef = this.dialog.open(ClienteWindowComponent, {
            data: cliente, width: '480px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.paginator.page.emit();
            }
        });
    }

    createCliente() {
        const dialogRef = this.dialog.open(ClienteWindowComponent, {
            data: new Cliente(), width: '480px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.paginator.page.emit();
            }
        });
    }

    deleteCliente(cliente: Cliente) {
        const dialogRef = this.dialog.open(Confirm, {
            data: {accion: 'Eliminar', description: `¿Desea eliminar el cliente ${cliente.nombreClient}?`},
            width: '400px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.clienteService.delete(cliente.rucClient).pipe(
                    filter((response: HttpResponse<any>) => response.ok)
                ).subscribe((response: HttpResponse<any>) => {
                    this.showToast(`Cliente ${cliente.nombreClient} eliminado exitosamente`, 'Cliente Eliminado', true);
                    this.paginator.page.emit();
                }, (res: HttpErrorResponse) => this.onError(res));
            }
        });
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

    cambiarEstadoUsuario(cliente: ICliente) {
        this.isLoadingResults = true;
        cliente.estadoCliente = cliente.estadoCliente === '1' ? '0' : '1';
        this.clienteService.update(cliente).pipe(
            filter((res: HttpResponse<ICliente>) => res.ok)
        ).subscribe(() => this.loadAll(), responseError => {
            cliente.estadoCliente = cliente.estadoCliente === '1' ? '0' : '1';
            this.onError(responseError);
        });
    }

    reset() {
        this.formulario.reset();
        this.loadAll();
    }
}
