import {AfterViewInit, Component, ElementRef, Renderer2, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {MatDialogRef} from '@angular/material/dialog';
import {LoginService} from "../../core/login/login.service";
import {StateStorageService} from "../../core/auth/state-storage.service";

@Component({
    selector: 'jhi-login-modal',
    templateUrl: './login.component.html'
})
export class JhiLoginModalComponent implements AfterViewInit {
    authenticationError = false;
    loginForm: FormGroup;
    @ViewChildren('#username') usernameInput!: HTMLInputElement;

    constructor(
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private Renderer2: Renderer2,
        private router: Router,
        private dialog: MatDialogRef<JhiLoginModalComponent>
    ) {
        this.loginForm = new FormGroup({
            nombUsuario: new FormControl('', [Validators.required]),
            claveUsuario: new FormControl('', [Validators.required]),
            rememberMe: new FormControl('', []),
        });
    }

    ngAfterViewInit() {
        setTimeout(() => this.usernameInput.focus(), 0);
    }

    cancel() {
        this.authenticationError = false;
        this.loginForm.patchValue({
            nombUsuario: '',
            claveUsuario: ''
        });
        this.dialog.close();
    }

    login() {
        this.loginService.login({
            nombUsuario: this.loginForm.controls['nombUsuario'].value,
            claveUsuario: this.loginForm.controls['claveUsuario'].value,
            rememberMe: this.loginForm.controls['rememberMe'].value
        }).then(() => {
            this.authenticationError = false;
            if (
                this.router.url === '/account/register' ||
                this.router.url.startsWith('/account/activate/') ||
                this.router.url.startsWith('/account/reset/')
            ) {
                this.router.navigate(['']);
            }

            // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // since login is successful, go to stored previousState and clear previousState
            const redirect = this.stateStorageService.getUrl();
            this.dialog.close();
            if (redirect) {
                this.stateStorageService.storeUrl('');
                this.router.navigateByUrl(redirect);
            }
        }).catch(() => {
            this.authenticationError = true;
        });
    }

    register() {
        this.router.navigate(['/account/register']);
    }

    requestResetPassword() {
        this.router.navigate(['/account/reset', 'request']);
    }
}
