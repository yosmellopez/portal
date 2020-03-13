import {Component, OnInit} from '@angular/core';
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";
import {Title} from "@angular/platform-browser";
import {ActivatedRouteSnapshot, NavigationEnd, NavigationError, Router, RouterOutlet} from "@angular/router";
import {AccountService} from "app/core/auth/account.service";

@Component({
    selector: 'jhi-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    public config: PerfectScrollbarConfigInterface = {};

    constructor(private titleService: Title, private router: Router, public auth: AccountService) {
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'Portal de Facturación Electrónica';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
            if (event instanceof NavigationError && event.error.status === 404) {
                this.router.navigate(['/home']);
            }
        });
    }
}
