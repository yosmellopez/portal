import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {EMAIL_NOT_FOUND_TYPE} from 'app/shared/constants/error.constants';
import {PasswordResetInitService} from './password-reset-init.service';
import {HttpResponse} from "@angular/common/http";
import {AppResponse} from "app/shared/model/generic-model";

@Component({
    selector: 'jhi-password-reset-init',
    templateUrl: './password-reset-init.component.html',
    styleUrls: ['./password-reset-init.component.scss']
})
export class PasswordResetInitComponent implements AfterViewInit {
    authenticationError: boolean;
    error: string;
    errorEmailNotExists: string;
    success: string;
    isLoading: boolean = false;
    isLoadingResults = false;
    @ViewChild('emailInput', {static: false}) emailInput: ElementRef;
    resetRequestForm: FormGroup;
    message = '';

    constructor(private passwordResetInitService: PasswordResetInitService) {
        this.resetRequestForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(254)])
        });
    }

    ngAfterViewInit() {
        this.emailInput.nativeElement.focus();
    }

    requestReset() {
        this.isLoading = true;
        this.authenticationError = false;
        this.error = null;
        this.success = null;
        this.errorEmailNotExists = null;
        this.isLoadingResults = true;
        const values = this.resetRequestForm.get(['email']).value;
        this.passwordResetInitService.save(values).subscribe((res: HttpResponse<AppResponse>) => {
                const response = res.body;
                this.isLoading = false;
                this.isLoadingResults = false;
                this.authenticationError = !response.success;
                this.success = response.success ? 'OK' : 'ERROR';
                this.message = response.success ? response.msg : response.error;
            }, response => {
                this.isLoading = false;
                this.isLoadingResults = false;
                this.authenticationError = true;
                this.success = null;
                if (response.status === 404) {
                    this.errorEmailNotExists = 'ERROR';
                } else {
                    this.error = 'ERROR';
                }
                this.message = response.error.error;
            }
        );
    }
}
