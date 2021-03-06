import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Cliente, ICliente} from 'app/shared/model/cliente.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Rol} from 'app/shared/model/rol.model';
import {MensajeToast} from 'app/mensaje/window.mensaje';
import {ClienteService} from 'app/entities/cliente/cliente.service';

@Component({
    selector: 'jhi-cliente-window',
    templateUrl: './cliente-window.component.html',
    styleUrls: ['./cliente-window.component.scss']
})
export class ClienteWindowComponent implements OnInit {
    nuevo: boolean = true;
    formulario: FormGroup;
    clienteId = '';
    isLoadingResults = false;

    constructor(
        private dialogRef: MatDialogRef<ClienteWindowComponent>,
        @Inject(MAT_DIALOG_DATA) {nombreClient, rucClient, email, direccionClient, estadoCliente}: Cliente,
        protected clienteService: ClienteService,
        protected dialog: MatDialog,
        protected snackBar: MatSnackBar
    ) {
        if (rucClient) {
            this.nuevo = false;
            this.clienteId = rucClient;
        }
        this.formulario = new FormGroup({
            nombreClient: new FormControl(nombreClient, [Validators.required]),
            email: new FormControl(email, [Validators.required, Validators.email]),
            rucClient: new FormControl(rucClient, [Validators.required]),
            direccionClient: new FormControl(direccionClient, []),
            estadoCliente: new FormControl(estadoCliente === '1', [Validators.required]),
        });
    }

    ngOnInit() {
    }

    cancel() {
        this.dialogRef.close(false);
    }

    enviarDatos() {
        let cliente: Cliente = this.formulario.value;
        if (cliente.estadoCliente) {
            cliente.estadoCliente = '1';
        } else {
            cliente.estadoCliente = '0';
        }
        this.isLoadingResults = true;
        if (this.nuevo) {
            this.clienteService.create(cliente).pipe(
                filter((res: HttpResponse<ICliente>) => res.ok),
                map((res: HttpResponse<ICliente>) => res.body))
                .subscribe((res: ICliente) => {
                    this.isLoadingResults = false;
                    this.showToast(`Cliente ${cliente.nombreClient} guardado correctamente`, 'Información', true);
                    this.dialogRef.close(res);
                }, (res: HttpErrorResponse) => this.onError(res));
        } else {
            cliente.rucClient = this.clienteId;
            this.clienteService.update(cliente).pipe(
                filter((res: HttpResponse<ICliente>) => res.ok),
                map((res: HttpResponse<ICliente>) => res.body))
                .subscribe((res: ICliente) => {
                    this.isLoadingResults = false;
                    this.showToast(`Cliente ${cliente.nombreClient} actualizado correctamente`, 'Información', true);
                    this.dialogRef.close(res);
                }, (res: HttpErrorResponse) => this.onError(res));
        }
    }

    compararRoles(inicio: Rol, fin: Rol) {
        return inicio && fin && inicio.idRoles === fin.idRoles;
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

    protected onError(response: HttpErrorResponse) {
        this.isLoadingResults = false;
        this.showToast(response.error.message, 'Error', false);
    }
}
