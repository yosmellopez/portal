import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Account} from "../../core/user/account.model";
import {AccountService} from "../../core/auth/account.service";

// declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    authority: string[];
}

export const ROUTES: RouteInfo[] = [
    {
        path: '/documentos/factura',
        title: 'Factura de Venta',
        icon: 'assignment_turned',
        class: '',
        authority: ['ROLE_ADMIN', 'ROLE_RECEPTOR', 'ROLE_USER']
    },
    {
        path: '/documentos/boleta',
        title: 'Boleta de Venta',
        icon: 'assignment',
        class: '',
        authority: ['ROLE_ADMIN', 'ROLE_RECEPTOR', 'ROLE_USER']
    },
    {
        path: '/documentos/nota-credito',
        title: 'Nota de crédito',
        icon: 'content_paste',
        class: '',
        authority: ['ROLE_ADMIN', 'ROLE_RECEPTOR', 'ROLE_USER']
    },
    {
        path: '/documentos/nota-debito',
        title: 'Nota de débito',
        icon: 'receipt',
        class: '',
        authority: ['ROLE_ADMIN', 'ROLE_RECEPTOR', 'ROLE_USER']
    },
    {
        path: '/documentos/comprobante-percepcion',
        title: 'Comprobante de percepción',
        icon: 'description',
        class: '',
        authority: ['ROLE_ADMIN', 'ROLE_RECEPTOR', 'ROLE_USER']
    },
    {
        path: '/documentos/comprobante-retencion',
        title: 'Comprobante de Retención',
        icon: 'assignment_late',
        class: '',
        authority: ['ROLE_ADMIN', 'ROLE_RECEPTOR', 'ROLE_USER']
    },
    {
        path: '/documentos/comunicacion-baja',
        title: 'Comunicación Baja',
        icon: 'cancel',
        class: '',
        authority: ['ROLE_ADMIN', 'ROLE_RECEPTOR', 'ROLE_USER']
    },
    {
        path: '/documentos/guia-remision',
        title: 'Guía de Remisión',
        icon: 'list',
        class: '',
        authority: ['ROLE_ADMIN', 'ROLE_RECEPTOR', 'ROLE_USER']
    },
    {
        path: '/documentos/resumen-boleta',
        title: 'Resumen Diario Boleta',
        icon: 'today',
        class: '',
        authority: ['ROLE_ADMIN', 'ROLE_RECEPTOR', 'ROLE_USER']
    },
    {path: '/clientes', title: 'Clientes', icon: 'group', class: '', authority: ['ROLE_ADMIN']},
    {path: '/usuarios', title: 'Usuarios', icon: 'account_box', class: '', authority: ['ROLE_ADMIN']},
];

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    rutas: RouteInfo[] = ROUTES;
    rutasUsuario: RouteInfo[] = [];
    usuario!: Account;
    appLogo!: string;

    constructor(private route: ActivatedRoute, protected auth: AccountService) {
    }

    ngOnInit() {
        this.auth.identity().subscribe((valor: any) => {
            if (valor) {
                this.usuario = valor;
                this.rutas.forEach(ruta => {
                    if (this.hasAuthority(ruta)) {
                        this.rutasUsuario.push(ruta);
                    }
                });
            }
        });
        this.route.data.subscribe(data => {
            // console.log(data);
        });
    }

    isAuthenticated() {
        return this.auth.isAuthenticated();
    }

    isMobileMenu() {
        // if ($(window).width() > 991) {
        //     return false;
        // }
        return true;
    }

    hasAuthority(menuItem: RouteInfo) {
        return menuItem.authority.includes(this.usuario.rol.role);
    }
}
