webpackHotUpdate(5,{

/***/ "./frontend/app/application/application-routing.module.ts":
/*!****************************************************************!*\
  !*** ./frontend/app/application/application-routing.module.ts ***!
  \****************************************************************/
/*! exports provided: ApplicationRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ApplicationRoutingModule\", function() { return ApplicationRoutingModule; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ \"./node_modules/@angular/core/fesm2015/core.js\");\n/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ \"./node_modules/@angular/router/fesm2015/router.js\");\n/* harmony import */ var app_application_application_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/application/application.component */ \"./frontend/app/application/application.component.ts\");\n/* harmony import */ var app_core_auth_user_route_access_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/auth/user-route-access-service */ \"./frontend/app/core/auth/user-route-access-service.ts\");\n/* harmony import */ var app_layouts_navbar_navbar_route__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/layouts/navbar/navbar.route */ \"./frontend/app/layouts/navbar/navbar.route.ts\");\n/* harmony import */ var app_layouts_error_error_route__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/layouts/error/error.route */ \"./frontend/app/layouts/error/error.route.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst LAYOUT_ROUTES = [app_layouts_navbar_navbar_route__WEBPACK_IMPORTED_MODULE_5__[\"navbarRoute\"], ...app_layouts_error_error_route__WEBPACK_IMPORTED_MODULE_6__[\"errorRoute\"]];\r\nconst routes = [\r\n    {\r\n        path: '',\r\n        component: app_application_application_component__WEBPACK_IMPORTED_MODULE_3__[\"ApplicationComponent\"],\r\n        children: [\r\n            {\r\n                path: 'admin',\r\n                loadChildren: () => __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ../admin/admin.module */ \"./frontend/app/admin/admin.module.ts\")).then(m => m.PortalAdminModule),\r\n                canActivate: [app_core_auth_user_route_access_service__WEBPACK_IMPORTED_MODULE_4__[\"UserRouteAccessService\"]]\r\n            },\r\n            {\r\n                path: 'account',\r\n                loadChildren: () => __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ../account/account.module */ \"./frontend/app/account/account.module.ts\")).then(m => m.PortalAccountModule),\r\n                canActivate: [app_core_auth_user_route_access_service__WEBPACK_IMPORTED_MODULE_4__[\"UserRouteAccessService\"]]\r\n            },\r\n            {\r\n                path: 'home',\r\n                loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./home/home.module */ \"./frontend/app/application/home/home.module.ts\")).then(m => m.PortalHomeModule),\r\n                canActivate: [app_core_auth_user_route_access_service__WEBPACK_IMPORTED_MODULE_4__[\"UserRouteAccessService\"]]\r\n            },\r\n            {\r\n                path: 'clientes',\r\n                loadChildren: () => __webpack_require__.e(/*! import() */ 3).then(__webpack_require__.bind(null, /*! ../entities/cliente/cliente.module */ \"./frontend/app/entities/cliente/cliente.module.ts\")).then(m => m.PortalClienteModule),\r\n                canActivate: [app_core_auth_user_route_access_service__WEBPACK_IMPORTED_MODULE_4__[\"UserRouteAccessService\"]]\r\n            },\r\n            {\r\n                path: 'documentos',\r\n                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e(7), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, /*! ../entities/documento-electronico/documento-electronico.module */ \"./frontend/app/entities/documento-electronico/documento-electronico.module.ts\")).then(m => m.PortalDocumentoElectronicoModule),\r\n                canActivate: [app_core_auth_user_route_access_service__WEBPACK_IMPORTED_MODULE_4__[\"UserRouteAccessService\"]]\r\n            },\r\n            {\r\n                path: 'usuarios',\r\n                loadChildren: () => __webpack_require__.e(/*! import() */ 2).then(__webpack_require__.bind(null, /*! ../entities/usuario/usuario.module */ \"./frontend/app/entities/usuario/usuario.module.ts\")).then(m => m.PortalUsuarioModule),\r\n                canActivate: [app_core_auth_user_route_access_service__WEBPACK_IMPORTED_MODULE_4__[\"UserRouteAccessService\"]]\r\n            },\r\n            ...LAYOUT_ROUTES\r\n        ]\r\n    }\r\n];\r\nlet ApplicationRoutingModule = class ApplicationRoutingModule {\r\n};\r\nApplicationRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\r\n    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__[\"NgModule\"])({\r\n        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__[\"RouterModule\"].forChild(routes)],\r\n        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__[\"RouterModule\"]]\r\n    })\r\n], ApplicationRoutingModule);\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9hcHAvYXBwbGljYXRpb24vYXBwbGljYXRpb24tcm91dGluZy5tb2R1bGUudHM/MDlmNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXVDO0FBQ2M7QUFDc0I7QUFDSTtBQUNuQjtBQUNIO0FBRXpELE1BQU0sYUFBYSxHQUFHLENBQUMsMkVBQVcsRUFBRSxHQUFHLHdFQUFVLENBQUMsQ0FBQztBQUVuRCxNQUFNLE1BQU0sR0FBVztJQUNuQjtRQUNJLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLDBGQUFvQjtRQUMvQixRQUFRLEVBQUU7WUFDTjtnQkFDSSxJQUFJLEVBQUUsT0FBTztnQkFDYixZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsa0pBQStCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO2dCQUNsRixXQUFXLEVBQUUsQ0FBQyw4RkFBc0IsQ0FBQzthQUN4QztZQUNEO2dCQUNJLElBQUksRUFBRSxTQUFTO2dCQUNmLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQywwSkFBbUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3hGLFdBQVcsRUFBRSxDQUFDLDhGQUFzQixDQUFDO2FBQ3hDO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLE1BQU07Z0JBQ1osWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLGlKQUE0QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDOUUsV0FBVyxFQUFFLENBQUMsOEZBQXNCLENBQUM7YUFDeEM7WUFDRDtnQkFDSSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLDRLQUE0QyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDakcsV0FBVyxFQUFFLENBQUMsOEZBQXNCLENBQUM7YUFDeEM7WUFDRDtnQkFDSSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLDRRQUF3RSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQztnQkFDMUksV0FBVyxFQUFFLENBQUMsOEZBQXNCLENBQUM7YUFDeEM7WUFDRDtnQkFDSSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLDRLQUE0QyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDakcsV0FBVyxFQUFFLENBQUMsOEZBQXNCLENBQUM7YUFDeEM7WUFDRCxHQUFHLGFBQWE7U0FDbkI7S0FDSjtDQUNKLENBQUM7QUFNRixJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtDQUNwQztBQURZLHdCQUF3QjtJQUpwQyw4REFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsNERBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsT0FBTyxFQUFFLENBQUMsNERBQVksQ0FBQztLQUMxQixDQUFDO0dBQ1csd0JBQXdCLENBQ3BDO0FBRG9DIiwiZmlsZSI6Ii4vZnJvbnRlbmQvYXBwL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uLXJvdXRpbmcubW9kdWxlLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Um91dGVyTW9kdWxlLCBSb3V0ZXN9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7QXBwbGljYXRpb25Db21wb25lbnR9IGZyb20gJ2FwcC9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQge1VzZXJSb3V0ZUFjY2Vzc1NlcnZpY2V9IGZyb20gJ2FwcC9jb3JlL2F1dGgvdXNlci1yb3V0ZS1hY2Nlc3Mtc2VydmljZSc7XHJcbmltcG9ydCB7bmF2YmFyUm91dGV9IGZyb20gJ2FwcC9sYXlvdXRzL25hdmJhci9uYXZiYXIucm91dGUnO1xyXG5pbXBvcnQge2Vycm9yUm91dGV9IGZyb20gJ2FwcC9sYXlvdXRzL2Vycm9yL2Vycm9yLnJvdXRlJztcclxuXHJcbmNvbnN0IExBWU9VVF9ST1VURVMgPSBbbmF2YmFyUm91dGUsIC4uLmVycm9yUm91dGVdO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogJycsXHJcbiAgICAgICAgY29tcG9uZW50OiBBcHBsaWNhdGlvbkNvbXBvbmVudCxcclxuICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiAnYWRtaW4nLFxyXG4gICAgICAgICAgICAgICAgbG9hZENoaWxkcmVuOiAoKSA9PiBpbXBvcnQoJy4uL2FkbWluL2FkbWluLm1vZHVsZScpLnRoZW4obSA9PiBtLlBvcnRhbEFkbWluTW9kdWxlKSxcclxuICAgICAgICAgICAgICAgIGNhbkFjdGl2YXRlOiBbVXNlclJvdXRlQWNjZXNzU2VydmljZV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogJ2FjY291bnQnLFxyXG4gICAgICAgICAgICAgICAgbG9hZENoaWxkcmVuOiAoKSA9PiBpbXBvcnQoJy4uL2FjY291bnQvYWNjb3VudC5tb2R1bGUnKS50aGVuKG0gPT4gbS5Qb3J0YWxBY2NvdW50TW9kdWxlKSxcclxuICAgICAgICAgICAgICAgIGNhbkFjdGl2YXRlOiBbVXNlclJvdXRlQWNjZXNzU2VydmljZV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogJ2hvbWUnLFxyXG4gICAgICAgICAgICAgICAgbG9hZENoaWxkcmVuOiAoKSA9PiBpbXBvcnQoJy4vaG9tZS9ob21lLm1vZHVsZScpLnRoZW4obSA9PiBtLlBvcnRhbEhvbWVNb2R1bGUpLFxyXG4gICAgICAgICAgICAgICAgY2FuQWN0aXZhdGU6IFtVc2VyUm91dGVBY2Nlc3NTZXJ2aWNlXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiAnY2xpZW50ZXMnLFxyXG4gICAgICAgICAgICAgICAgbG9hZENoaWxkcmVuOiAoKSA9PiBpbXBvcnQoJy4uL2VudGl0aWVzL2NsaWVudGUvY2xpZW50ZS5tb2R1bGUnKS50aGVuKG0gPT4gbS5Qb3J0YWxDbGllbnRlTW9kdWxlKSxcclxuICAgICAgICAgICAgICAgIGNhbkFjdGl2YXRlOiBbVXNlclJvdXRlQWNjZXNzU2VydmljZV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogJ2RvY3VtZW50b3MnLFxyXG4gICAgICAgICAgICAgICAgbG9hZENoaWxkcmVuOiAoKSA9PiBpbXBvcnQoJy4uL2VudGl0aWVzL2RvY3VtZW50by1lbGVjdHJvbmljby9kb2N1bWVudG8tZWxlY3Ryb25pY28ubW9kdWxlJykudGhlbihtID0+IG0uUG9ydGFsRG9jdW1lbnRvRWxlY3Ryb25pY29Nb2R1bGUpLFxyXG4gICAgICAgICAgICAgICAgY2FuQWN0aXZhdGU6IFtVc2VyUm91dGVBY2Nlc3NTZXJ2aWNlXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiAndXN1YXJpb3MnLFxyXG4gICAgICAgICAgICAgICAgbG9hZENoaWxkcmVuOiAoKSA9PiBpbXBvcnQoJy4uL2VudGl0aWVzL3VzdWFyaW8vdXN1YXJpby5tb2R1bGUnKS50aGVuKG0gPT4gbS5Qb3J0YWxVc3VhcmlvTW9kdWxlKSxcclxuICAgICAgICAgICAgICAgIGNhbkFjdGl2YXRlOiBbVXNlclJvdXRlQWNjZXNzU2VydmljZV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLi4uTEFZT1VUX1JPVVRFU1xyXG4gICAgICAgIF1cclxuICAgIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyldLFxyXG4gICAgZXhwb3J0czogW1JvdXRlck1vZHVsZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uUm91dGluZ01vZHVsZSB7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/app/application/application-routing.module.ts\n");

/***/ })

})