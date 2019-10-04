import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { merge, of, Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { Cliente, ICliente } from 'app/shared/model/cliente.model';
import { AccountService } from 'app/core/auth/account.service';
import { ClienteService } from './cliente.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppResponseBody } from 'app/shared/model/generic-model';
import { Confirm, MensajeToast } from 'app/mensaje/window.mensaje';
import { MatDialog } from '@angular/material/dialog';
import { ClienteWindowComponent } from 'app/entities/cliente/cliente-window/cliente-window.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { IUsuario } from 'app/shared/model/usuario.model';

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
                (res: HttpErrorResponse) => this.onError(res.message)
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
        }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.accountService.identity().then(account => {
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

    protected onError(errorMessage: string) {
        this.isLoadingResults = false;
        this.jhiAlertService.error(errorMessage, null, null);
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
            }, (res: HttpErrorResponse) => this.onError(res.message));
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
            data: {accion: 'Eliminar', description: `¿Desea eliminar el cliente ${cliente.nombreClient}?`}, width: '400px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.clienteService.delete(cliente.rucClient).pipe(
                    filter((response: HttpResponse<any>) => response.ok)
                ).subscribe((response: HttpResponse<any>) => {
                    this.showToast(`Cliente ${cliente.nombreClient} eliminado exitosamente`, 'Cliente Eliminado');
                    this.paginator.page.emit();
                }, (res: HttpErrorResponse) => this.onError(res.message));
            }
        });
    }

    showToast(mensaje: string, title: string) {
        this.snackBar.openFromComponent(MensajeToast, {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
            announcementMessage: 'Esto es una prueba',
            data: {description: mensaje, title: title}
        });
    }

    reset() {
        this.formulario.reset();
    }
}
