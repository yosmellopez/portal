import {AfterViewInit, Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {JhiEventManager} from 'ng-jhipster';
import {LoginService} from 'app/core/login/login.service';
import {StateStorageService} from 'app/core/auth/state-storage.service';
import {AccountService} from 'app/core/auth/account.service';

@Component({
    selector: 'jhi-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, AfterViewInit {
    authenticationError: boolean;
    imagen: string = '';
    isLoading: boolean = false;
    loginForm: FormGroup;
    @ViewChildren('#login') loginInput;

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private accountService: AccountService,
        private elementRef: ElementRef,
        private router: Router,
    ) {
        this.loginForm = new FormGroup({
            nombUsuario: new FormControl('', [Validators.required]),
            claveUsuario: new FormControl('', [Validators.required]),
            rememberMe: new FormControl('', []),
        });
    }

    ngAfterViewInit() {
        setTimeout(() => this.loginInput.nativeElement.focus(), 0);
    }

    ngOnInit() {
        if (this.accountService.isAuthenticated()) {
            this.router.navigate(['/home']);
        }
    }

    login() {
        this.isLoading = true;
        this.authenticationError = false;
        this.loginService.login({
            nombUsuario: this.loginForm.controls['nombUsuario'].value,
            claveUsuario: this.loginForm.controls['claveUsuario'].value,
            rememberMe: this.loginForm.controls['rememberMe'].value
        }).then(() => {
            this.isLoading = false;
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
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigateByUrl(redirect);
            } else {
                this.router.navigateByUrl('/home');
            }
        }).catch(() => {
            this.isLoading = false;
            this.authenticationError = true;
        });
    }
}
