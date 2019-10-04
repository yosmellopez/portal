import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { merge, of, Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUsuario, Usuario } from 'app/shared/model/usuario.model';
import { AccountService } from 'app/core/auth/account.service';
import { UsuarioService } from './usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { ICliente } from 'app/shared/model/cliente.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AppResponseBody } from 'app/shared/model/generic-model';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioWindowComponent } from 'app/entities/usuario/usuario-window/usuario-window.component';
import { Confirm, Information, MensajeToast } from 'app/mensaje/window.mensaje';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { IRol } from 'app/shared/model/rol.model';
import { RolService } from 'app/entities/usuario/rol.service';
import { FormControl, FormGroup } from '@angular/forms';
import { IDocumentoElectronico } from 'app/shared/model/documento-electronico.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'jhi-usuario',
    templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit, OnDestroy, AfterViewInit {
    usuarios: IUsuario[];
    roles: IRol[] = [];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    resultsLength = 0;
    formulario: FormGroup;
    isLoadingResults = true;
    displayedColumns: string[] = ['nombUsuario', 'rucClient', 'email', 'rol', 'acciones'];
    dataSource: MatTableDataSource<IUsuario> = new MatTableDataSource<IUsuario>([]);
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

    constructor(
        protected usuarioService: UsuarioService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService,
        protected rolService: RolService,
        protected dialog: MatDialog,
        protected snackBar: MatSnackBar
    ) {
        this.formulario = new FormGroup({
            rucClient: new FormControl('', []),
            nombUsuario: new FormControl('', []),
            email: new FormControl('', []),
            rol: new FormControl('', []),
        });
    }

    loadAll() {
        if (this.rolService.isRolesEmpty())
            this.rolService
                .findAll()
                .pipe(filter((res: HttpResponse<IRol[]>) => res.ok), map((res: HttpResponse<IRol[]>) => res.body))
                .subscribe((res: IRol[]) => {
                        this.roles = res;
                        this.rolService.setRoles(res);
                    }, (res: HttpErrorResponse) => this.onError(res.message)
                );
        else {
            this.roles = this.rolService.getRoles();
        }
        this.usuarioService
            .query({
                page: this.paginator.pageIndex + 1,
                size: this.paginator.pageSize,
                sort: `${this.sort.active}`,
                direction: `${this.sort.direction}`
            })
            .pipe(
                filter((res: HttpResponse<AppResponseBody<IUsuario[]>>) => res.ok),
                map((res: HttpResponse<AppResponseBody<IUsuario[]>>) => res.body),
                map((res: AppResponseBody<IUsuario[]>) => res.data)
            )
            .subscribe(
                (res: IUsuario[]) => {
                    this.isLoadingResults = false;
                    this.usuarios = res;
                }, (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    search() {
        this.isLoadingResults = true;
        const values = this.formulario.value;
        let searchValues = {...values};
        this.usuarioService.search(searchValues).pipe(
            filter((res: HttpResponse<IUsuario[]>) => res.ok),
            map((res: HttpResponse<IUsuario[]>) => res.body)
        ).subscribe((data: IUsuario[]) => {
            this.usuarios = data;
            this.dataSource.connect().next(this.usuarios);
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
        this.registerChangeInUsuarios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUsuario) {
        return item.idUsuario;
    }

    registerChangeInUsuarios() {
        this.eventSubscriber = this.eventManager.subscribe('usuarioListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.isLoadingResults = false;
        this.jhiAlertService.error(errorMessage, null, null);
    }

    ngAfterViewInit() {
        this.loadAll();
        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                return this.usuarioService.query({
                    page: this.paginator.pageIndex + 1,
                    size: this.paginator.pageSize,
                    sort: `${this.sort.active}`,
                    direction: `${this.sort.direction}`
                });
            }),
            filter((res: HttpResponse<AppResponseBody<IUsuario[]>>) => res.ok),
            map((res: HttpResponse<AppResponseBody<IUsuario[]>>) => res.body),
            map((res: AppResponseBody<IUsuario[]>) => {
                this.resultsLength = res.total;
                return res.data;
            }),
            catchError(() => {
                return of([]);
            }))
            .subscribe((res: IUsuario[]) => {
                this.isLoadingResults = false;
                this.usuarios = res;
                this.dataSource.connect().next(this.usuarios);
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    editUsuario(usuario: Usuario) {
        const dialogRef = this.dialog.open(UsuarioWindowComponent, {
            data: usuario, width: '500px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.paginator.page.emit();
            }
        });
    }

    createUsuario() {
        const dialogRef = this.dialog.open(UsuarioWindowComponent, {
            data: new Usuario(), width: '500px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.paginator.page.emit();
            }
        });
    }

    deleteUsuario(usuario: Usuario) {
        const dialogRef = this.dialog.open(Confirm, {
            data: {accion: 'Eliminar', description: `¿Desea eliminar el usuario ${usuario.nombUsuario}?`}, width: '400px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.usuarioService.delete(usuario.idUsuario).pipe(
                    filter((response: HttpResponse<any>) => response.ok)
                ).subscribe((response: HttpResponse<any>) => {
                    this.showToast(`Usuario ${usuario.nombUsuario} eliminado exitosamente`, 'Usuario Eliminado', true);
                    this.paginator.page.emit();
                }, (res: HttpErrorResponse) => this.onError(res.message));
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

    reset() {
        this.formulario.reset();
    }
}
