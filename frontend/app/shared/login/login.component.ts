import {Component, AfterViewInit, Renderer2, ElementRef, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {JhiEventManager} from 'ng-jhipster';

import {LoginService} from 'app/core/login/login.service';
import {StateStorageService} from 'app/core/auth/state-storage.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'jhi-login-modal',
    templateUrl: './login.component.html'
})
export class JhiLoginModalComponent implements AfterViewInit {
    authenticationError: boolean;
    loginForm: FormGroup;
    @ViewChildren('#username') usernameInput;

    constructor(
        private eventManager: JhiEventManager,
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
        setTimeout(() => this.usernameInput.nativeElement.focus(), 0);
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

            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });
            // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // since login is successful, go to stored previousState and clear previousState
            const redirect = this.stateStorageService.getUrl();
            this.dialog.close();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
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
