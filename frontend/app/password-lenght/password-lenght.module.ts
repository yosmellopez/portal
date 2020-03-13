import {NgModule} from '@angular/core';
import {PasswordLenghtComponent} from './password-lenght.component';
import {CommonModule} from '@angular/common';
import {JhMaterialModule} from 'app/shared/jh-material.module';

@NgModule({
    imports: [CommonModule, JhMaterialModule],
    exports: [PasswordLenghtComponent],
    declarations: [PasswordLenghtComponent],
    providers: []
})
export class PasswordLenghtModule {

}
