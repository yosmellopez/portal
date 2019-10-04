import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IUsuario, Usuario } from 'app/shared/model/usuario.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRol, Rol } from 'app/shared/model/rol.model';
import { RolService } from 'app/entities/usuario/rol.service';
import { filter, map, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UsuarioService } from 'app/entities/usuario/usuario.service';
import { MensajeToast } from 'app/mensaje/window.mensaje';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente, ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';

@Component({
    selector: 'jhi-usuario-window',
    templateUrl: './usuario-window.component.html',
    styleUrls: ['./usuario-window.component.scss']
})
export class UsuarioWindowComponent implements OnInit, OnDestroy {
    nuevo: boolean = true;
    formulario: FormGroup;
    roles: IRol[] = [];
    clientes: ICliente[] = [];
    usuarioId = 0;
    username: string;
    public clientesFilterCtrl: FormControl = new FormControl();
    public filteredClientes: ReplaySubject<ICliente[]> = new ReplaySubject<ICliente[]>(1);
    @ViewChild('singleSelect', {static: false}) singleSelect: MatSelect;
    private _onDestroy = new Subject<void>();

    constructor(
        private dialogRef: MatDialogRef<UsuarioWindowComponent>,
        @Inject(MAT_DIALOG_DATA) {idUsuario, nombUsuario, rucClient, email, estadoUsuario, rol, claveUsuario}: Usuario,
        protected usuarioService: UsuarioService,
        protected rolService: RolService,
        protected clientService: ClienteService,
        protected dialog: MatDialog,
        protected snackBar: MatSnackBar
    ) {
        if (idUsuario) {
            this.nuevo = false;
            this.usuarioId = idUsuario;
            this.username = nombUsuario;
        }
        this.formulario = new FormGroup({
            nombUsuario: new FormControl(nombUsuario, [Validators.required]),
            claveUsuario: new FormControl(claveUsuario),
            passwordRepeat: new FormControl(claveUsuario),
            email: new FormControl(email, [Validators.required, Validators.email]),
            rucClient: new FormControl(rucClient, [Validators.required]),
            estadoUsuario: new FormControl(estadoUsuario === '1', [Validators.required]),
            rol: new FormControl(rol, [Validators.required]),
        });
        if (this.nuevo) {
            this.formulario.controls['claveUsuario'].setValidators([Validators.required]);
            this.formulario.controls['passwordRepeat'].setValidators([Validators.required, this.noIgualPasswordRepeat.bind(this.formulario)]);
        } else {
            this.formulario.controls['passwordRepeat'].setValidators([this.noIgualPasswordRepeat.bind(this.formulario)]);
        }
    }

    ngOnInit() {
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
        const clientesTemp = this.clientService.getClientes();
        if (clientesTemp.length === 0) {
            this.clientService
                .findAll()
                .pipe(
                    filter((res: HttpResponse<ICliente[]>) => res.ok),
                    map((res: HttpResponse<ICliente[]>) => res.body))
                .subscribe((res: ICliente[]) => {
                        this.clientes = res;
                        this.clientService.setClientes(res);
                        this.filteredClientes.next(this.clientes.slice());
                    }, (res: HttpErrorResponse) => this.onError(res.message)
                );
        } else {
            this.clientes = clientesTemp;
            this.filteredClientes.next(this.clientes.slice());
        }
        this.clientesFilterCtrl.valueChanges.pipe(
            takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterClientes();
            });
    }

    protected onError(errorMessage: string) {
        // this.jhiAlertService.error(errorMessage, null, null);
    }

    cancel() {
        this.dialogRef.close(false);
    }

    enviarDatos() {
        let usuario: Usuario = this.formulario.value;
        if (usuario.estadoUsuario) {
            usuario.estadoUsuario = '1';
        } else {
            usuario.estadoUsuario = '0';
        }
        if (this.nuevo) {
            this.usuarioService.create(usuario).pipe(
                filter((res: HttpResponse<IUsuario>) => res.ok),
                map((res: HttpResponse<IUsuario>) => res.body))
                .subscribe((res: IUsuario) => {
                    this.showToast(`Usuario ${usuario.nombUsuario} guardado correctamente`, 'Información', true);
                    this.dialogRef.close(res);
                }, (res: HttpErrorResponse) => this.onError(res.message));
        } else {
            usuario.idUsuario = this.usuarioId;
            this.usuarioService.update(usuario).pipe(
                filter((res: HttpResponse<IUsuario>) => res.ok),
                map((res: HttpResponse<IUsuario>) => res.body))
                .subscribe((res: IUsuario) => {
                    this.showToast(`Usuario ${usuario.nombUsuario} actualizado correctamente`, 'Información', true);
                    this.dialogRef.close(res);
                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
    }

    compararRoles(inicio: Rol, fin: Rol) {
        return inicio && fin && inicio.idRoles === fin.idRoles;
    }

    compararClientes(inicio: Cliente, fin: Cliente) {
        return inicio && fin && inicio === fin;
    }

    noIgualPasswordRepeat(control: FormControl) {
        let formulario: any = this;
        if (formulario.controls['claveUsuario'].value !== control.value) {
            return {noigual: true};
        }
        return null;
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

    private filterClientes() {
        if (!this.clientes) {
            return;
        }
        // get the search keyword
        let search = this.clientesFilterCtrl.value;
        if (!search) {
            this.filteredClientes.next(this.clientes.slice());
            return;
        } else {
            console.log(search);
            search = search.toLowerCase();
        }
        // filter the banks
        const filterClientes = this.clientes.filter(cliente => cliente.rucClient.toLowerCase().indexOf(search) > -1 || cliente.nombreClient.toLowerCase().indexOf(search) > -1);
        this.filteredClientes.next(filterClientes);
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
