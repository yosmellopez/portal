import {Component, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {EMAIL_NOT_FOUND_TYPE} from 'app/shared/constants/error.constants';
import {PasswordResetInitService} from './password-reset-init.service';

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
    @ViewChild('emailInput', {static: false}) emailInput: ElementRef;
    resetRequestForm: FormGroup;

    constructor(private passwordResetInitService: PasswordResetInitService) {
        this.resetRequestForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email])
        });
    }

    ngAfterViewInit() {
        this.emailInput.nativeElement.focus();
    }

    requestReset() {
        this.isLoading = true;
        this.authenticationError = false;
        this.error = null;
        this.errorEmailNotExists = null;

        this.passwordResetInitService.save(this.resetRequestForm.get(['email']).value).subscribe(
            () => {
                this.isLoading = false;
                this.authenticationError = false;
                this.success = 'OK';
            },
            response => {
                this.isLoading = false;
                this.authenticationError = true;
                this.success = null;
                if (response.status === 400 && response.error.type === EMAIL_NOT_FOUND_TYPE) {
                    this.errorEmailNotExists = 'ERROR';
                } else {
                    this.error = 'ERROR';
                }
            }
        );
    }
}
