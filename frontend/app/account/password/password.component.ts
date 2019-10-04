import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AccountService } from 'app/core/auth/account.service';
import { PasswordService } from './password.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-password',
    templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {
    doNotMatch: string;
    error: string;
    success: string;
    account: any;
    isLoadingResults = false;
    passwordForm: FormGroup;

    constructor(private passwordService: PasswordService, private accountService: AccountService) {
        this.passwordForm = new FormGroup({
            currentPassword: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
            confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)])
        });
        this.passwordForm.controls['confirmPassword'].setValidators([Validators.required, this.noIgualPasswordRepeat.bind(this.passwordForm)]);
    }

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.account = account;
        });
    }

    changePassword() {
        const newPassword = this.passwordForm.get(['newPassword']).value;
        if (newPassword !== this.passwordForm.get(['confirmPassword']).value) {
            this.error = null;
            this.success = null;
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.isLoadingResults = true;
            this.passwordService.save(newPassword, this.passwordForm.get(['currentPassword']).value).subscribe(
                () => {
                    this.isLoadingResults = false;
                    this.error = null;
                    this.success = 'OK';
                    this.passwordForm.reset({currentPassword: '', newPassword: '', confirmPassword: ''});
                }, (res: HttpErrorResponse) => {
                    this.isLoadingResults = false;
                    this.success = null;
                    this.error = res.error.error;
                }
            );
        }
    }

    noIgualPasswordRepeat(control: FormControl) {
        let formulario: any = this;
        if (formulario.controls['newPassword'].value !== control.value) {
            return {noigual: true};
        }
        return null;
    }
}
