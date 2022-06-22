import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {Confirm, Information, MensajeError, MensajeToast} from "./window.mensaje";
import {JhMaterialModule} from "../shared/jh-material.module";

@NgModule({
    imports: [
        CommonModule,
        JhMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
    ],
    declarations: [Information, MensajeError, Confirm, MensajeToast],
    entryComponents: [Information, MensajeError, Confirm, MensajeToast]
})
export class MensajeModule {
}
