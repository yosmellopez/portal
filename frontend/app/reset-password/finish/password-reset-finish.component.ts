import {AfterViewInit, Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {PasswordResetFinishService} from './password-reset-finish.service';
import {HttpResponse} from "@angular/common/http";
import {filter, map} from "rxjs/operators";
import {LoginModalService} from "../../core/login/login-modal.service";
import {ResetResponse} from "../../shared/model/usuario.model";

@Component({
    selector: 'jhi-password-reset-finish',
    templateUrl: './password-reset-finish.component.html',
    styleUrls: ['./password-reset-finish.component.scss']
})
export class PasswordResetFinishComponent implements OnInit, AfterViewInit {
    doNotMatch!: string | null;
    error!: string | null;
    keyMissing!: boolean;
    success!: string;
    modalRef!: NgbModalRef;
    key!: string;
    message!: string;
    usuario!: string;
    isLoadingResults = false;
    @ViewChildren('#newPassword') passwordInput!: HTMLInputElement;
    passwordForm = this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    });

    constructor(
        private passwordResetFinishService: PasswordResetFinishService,
        private loginModalService: LoginModalService,
        private route: ActivatedRoute,
        private elementRef: ElementRef,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.key = params['token'];
            this.isLoadingResults = true;
            this.passwordResetFinishService.validateToken(this.key)
                .pipe(
                    filter((res: HttpResponse<ResetResponse>) => res.ok),
                    map((res: HttpResponse<ResetResponse>) => res.body))
                .subscribe((respuesta: ResetResponse | null) => {
                    this.isLoadingResults = false;
                    if (respuesta) {
                        if (this.isNonEmptyString(respuesta.usuario)) {
                            this.usuario = "[" + respuesta.usuario + "]";
                        } else {
                            this.usuario = "";
                        }
                        if (respuesta.success) {
                            this.keyMissing = false;
                        } else {
                            this.error = 'ERROR';
                            this.keyMissing = true;
                            this.message = respuesta.msg;
                        }
                    }
                });
        });
    }

    isNonEmptyString(str: string) {
        return str && str.length > 0;
    }

    ngAfterViewInit() {
        if (this.elementRef.nativeElement.querySelector('#newPassword') != null) {
            this.passwordInput.focus();
        }
    }

    finishReset() {
        this.doNotMatch = null;
        this.error = null;
        const password = this.passwordForm.get(['newPassword'])!.value;
        const confirmPassword = this.passwordForm.get(['confirmPassword'])!.value;
        if (password !== confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.isLoadingResults = true;
            this.passwordResetFinishService.save({token: this.key, newPassword: password})
                .pipe(
                    filter((res: HttpResponse<ResetResponse>) => res.ok),
                    map((res: HttpResponse<ResetResponse>) => res.body))
                .subscribe((respuesta: ResetResponse | null) => {
                        this.isLoadingResults = false;
                        if (respuesta) {
                            if (respuesta.success) {
                                this.success = 'OK';
                            } else {
                                this.message = respuesta.msg;
                                this.error = 'ERROR';
                            }
                        }
                    },
                    () => {
                        this.isLoadingResults = false;
                        this.error = 'ERROR';
                    }
                );
        }
    }
}
