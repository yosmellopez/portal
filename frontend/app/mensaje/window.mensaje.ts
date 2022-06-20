import {Component, Inject} from '@angular/core';
import {ConfirmMensaje, Mensaje} from 'app/shared/model/generic-model';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
    selector: 'jhi-confirm-mensaje',
    templateUrl: './confirm.message.html',
    styleUrls: ['./mensaje.component.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class Confirm {
    accion: string = 'Eliminar';
    description: string = 'Eliminar';

    constructor(public dialogRef: MatDialogRef<Confirm>, @Inject(MAT_DIALOG_DATA) {accion, description}: ConfirmMensaje,) {
        if (accion) {
            this.accion = accion;
            this.description = description;
        }
    }

    confirmar(confirm: boolean): void {
        this.dialogRef.close(confirm);
    }
}

@Component({
    selector: 'jhi-information-mensaje',
    templateUrl: './information.message.html',
    styleUrls: ['./mensaje.component.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class Information {
    constructor(public dialogRef: MatDialogRef<Information>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    cerrarDialog(): void {
        this.dialogRef.close();
    }
}

@Component({
    selector: 'jhi-error-mensaje',
    templateUrl: './error.message.html',
    styleUrls: ['./mensaje.component.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class MensajeError {
    constructor(public dialogRef: MatDialogRef<MensajeError>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    cerrarDialog(): void {
        this.dialogRef.close();
    }
}

@Component({
    selector: 'jhi-mensaje-toast',
    templateUrl: './mensaje.toast.html',
    styleUrls: ['./mensaje.component.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class MensajeToast {
    mensaje: Mensaje;
    success: boolean = true;

    constructor(public snackbarRef: MatSnackBarRef<MensajeToast>, @Inject(MAT_SNACK_BAR_DATA) mensaje: Mensaje) {
        this.mensaje = mensaje;
    }

    cerrarSnackbar() {
        this.snackbarRef.dismiss();
    }
}
