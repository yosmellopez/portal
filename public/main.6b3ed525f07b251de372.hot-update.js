webpackHotUpdate("main",{

/***/ "./frontend/app/core/auth/user-route-access-service.ts":
/*!*************************************************************!*\
  !*** ./frontend/app/core/auth/user-route-access-service.ts ***!
  \*************************************************************/
/*! exports provided: UserRouteAccessService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserRouteAccessService\", function() { return UserRouteAccessService; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ \"./node_modules/@angular/core/fesm2015/core.js\");\n/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ \"./node_modules/@angular/router/fesm2015/router.js\");\n/* harmony import */ var app_core_auth_account_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/auth/account.service */ \"./frontend/app/core/auth/account.service.ts\");\n/* harmony import */ var app_core_login_login_modal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/login/login-modal.service */ \"./frontend/app/core/login/login-modal.service.ts\");\n/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ \"./node_modules/rxjs/_esm2015/operators/index.js\");\nvar _a, _b, _c;\r\n\r\n\r\n\r\n\r\n\r\n\r\nlet UserRouteAccessService = class UserRouteAccessService {\r\n    constructor(router, loginModalService, accountService) {\r\n        this.router = router;\r\n        this.loginModalService = loginModalService;\r\n        this.accountService = accountService;\r\n    }\r\n    canActivate(route, state) {\r\n        const authorities = route.data['authorities'];\r\n        // We need to call the checkLogin / and so the accountService.identity() function, to ensure,\r\n        // that the client has a principal too, if they already logged in by the server.\r\n        // This could happen on a page refresh.\r\n        return this.checkLogin(authorities, state.url);\r\n    }\r\n    checkLogin(authorities, url) {\r\n        return this.accountService.identity(true).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__[\"map\"])(account => {\r\n            console.log(account);\r\n            if (account) {\r\n                if (!authorities || authorities.length === 0) {\r\n                    return true;\r\n                }\r\n                const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);\r\n                if (hasAnyAuthority) {\r\n                    return true;\r\n                }\r\n                if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__[\"isDevMode\"])()) {\r\n                    console.error('User has not any of required authorities: ', authorities);\r\n                }\r\n                this.router.navigate(['accessdenied']);\r\n                return false;\r\n            }\r\n            else {\r\n                this.router.navigate(['/login']);\r\n                return false;\r\n            }\r\n        })).subscribe(value => {\r\n            return of();\r\n        });\r\n    }\r\n    canActivateChild(childRoute, state) {\r\n        const authorities = childRoute.data['authorities'];\r\n        return this.checkLogin(authorities, state.url);\r\n    }\r\n};\r\nUserRouteAccessService = tslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\r\n    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__[\"Injectable\"])({ providedIn: 'root' }),\r\n    tslib__WEBPACK_IMPORTED_MODULE_0__[\"__metadata\"](\"design:paramtypes\", [typeof (_a = typeof _angular_router__WEBPACK_IMPORTED_MODULE_2__[\"Router\"] !== \"undefined\" && _angular_router__WEBPACK_IMPORTED_MODULE_2__[\"Router\"]) === \"function\" ? _a : Object, typeof (_b = typeof app_core_login_login_modal_service__WEBPACK_IMPORTED_MODULE_4__[\"LoginModalService\"] !== \"undefined\" && app_core_login_login_modal_service__WEBPACK_IMPORTED_MODULE_4__[\"LoginModalService\"]) === \"function\" ? _b : Object, typeof (_c = typeof app_core_auth_account_service__WEBPACK_IMPORTED_MODULE_3__[\"AccountService\"] !== \"undefined\" && app_core_auth_account_service__WEBPACK_IMPORTED_MODULE_3__[\"AccountService\"]) === \"function\" ? _c : Object])\r\n], UserRouteAccessService);\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9hcHAvY29yZS9hdXRoL3VzZXItcm91dGUtYWNjZXNzLXNlcnZpY2UudHM/MTI3NiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQW9EO0FBUTNCO0FBRW9DO0FBQ1E7QUFFdEI7QUFHL0MsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFDL0IsWUFBb0IsTUFBYyxFQUFVLGlCQUFvQyxFQUFVLGNBQThCO1FBQXBHLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3hILENBQUM7SUFFRCxXQUFXLENBQUMsS0FBNkIsRUFBRSxLQUEwQjtRQUNqRSxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlDLDZGQUE2RjtRQUM3RixnRkFBZ0Y7UUFDaEYsdUNBQXVDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxVQUFVLENBQUMsV0FBcUIsRUFBRSxHQUFXO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMxQywwREFBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQixJQUFJLE9BQU8sRUFBRTtnQkFDVCxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUMxQyxPQUFPLElBQUksQ0FBQztpQkFDZjtnQkFDRCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDekUsSUFBSSxlQUFlLEVBQUU7b0JBQ2pCLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2dCQUNELElBQUksK0RBQVMsRUFBRSxFQUFFO29CQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsNENBQTRDLEVBQUUsV0FBVyxDQUFDLENBQUM7aUJBQzVFO2dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsT0FBTyxLQUFLLENBQUM7YUFDaEI7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxPQUFPLEtBQUssQ0FBQzthQUNoQjtRQUNMLENBQUMsQ0FBQyxDQUNMLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLE9BQU8sRUFBRSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsVUFBa0MsRUFBRSxLQUEwQjtRQUMzRSxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDSjtBQTNDWSxzQkFBc0I7SUFEbEMsZ0VBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsQ0FBQzsrRkFFRCxzREFBTSxvQkFBTixzREFBTSxvREFBNkIsb0ZBQWlCLG9CQUFqQixvRkFBaUIsb0RBQTBCLDRFQUFjLG9CQUFkLDRFQUFjO0dBRC9HLHNCQUFzQixDQTJDbEM7QUEzQ2tDIiwiZmlsZSI6Ii4vZnJvbnRlbmQvYXBwL2NvcmUvYXV0aC91c2VyLXJvdXRlLWFjY2Vzcy1zZXJ2aWNlLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBpc0Rldk1vZGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcclxuICAgIENhbkFjdGl2YXRlLFxyXG4gICAgQ2FuQWN0aXZhdGVDaGlsZCxcclxuICAgIFJvdXRlcixcclxuICAgIFJvdXRlclN0YXRlU25hcHNob3QsXHJcbiAgICBVcmxUcmVlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7QWNjb3VudFNlcnZpY2V9IGZyb20gJ2FwcC9jb3JlL2F1dGgvYWNjb3VudC5zZXJ2aWNlJztcclxuaW1wb3J0IHtMb2dpbk1vZGFsU2VydmljZX0gZnJvbSAnYXBwL2NvcmUvbG9naW4vbG9naW4tbW9kYWwuc2VydmljZSc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHtjYXRjaEVycm9yLCBtYXB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xyXG5cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBVc2VyUm91dGVBY2Nlc3NTZXJ2aWNlIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUsIENhbkFjdGl2YXRlQ2hpbGQge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBsb2dpbk1vZGFsU2VydmljZTogTG9naW5Nb2RhbFNlcnZpY2UsIHByaXZhdGUgYWNjb3VudFNlcnZpY2U6IEFjY291bnRTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICAgICAgY29uc3QgYXV0aG9yaXRpZXMgPSByb3V0ZS5kYXRhWydhdXRob3JpdGllcyddO1xyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gY2FsbCB0aGUgY2hlY2tMb2dpbiAvIGFuZCBzbyB0aGUgYWNjb3VudFNlcnZpY2UuaWRlbnRpdHkoKSBmdW5jdGlvbiwgdG8gZW5zdXJlLFxyXG4gICAgICAgIC8vIHRoYXQgdGhlIGNsaWVudCBoYXMgYSBwcmluY2lwYWwgdG9vLCBpZiB0aGV5IGFscmVhZHkgbG9nZ2VkIGluIGJ5IHRoZSBzZXJ2ZXIuXHJcbiAgICAgICAgLy8gVGhpcyBjb3VsZCBoYXBwZW4gb24gYSBwYWdlIHJlZnJlc2guXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tMb2dpbihhdXRob3JpdGllcywgc3RhdGUudXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0xvZ2luKGF1dGhvcml0aWVzOiBzdHJpbmdbXSwgdXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hY2NvdW50U2VydmljZS5pZGVudGl0eSh0cnVlKS5waXBlKFxyXG4gICAgICAgICAgICBtYXAoYWNjb3VudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhY2NvdW50KTtcclxuICAgICAgICAgICAgICAgIGlmIChhY2NvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhdXRob3JpdGllcyB8fCBhdXRob3JpdGllcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc0FueUF1dGhvcml0eSA9IHRoaXMuYWNjb3VudFNlcnZpY2UuaGFzQW55QXV0aG9yaXR5KGF1dGhvcml0aWVzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzQW55QXV0aG9yaXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVXNlciBoYXMgbm90IGFueSBvZiByZXF1aXJlZCBhdXRob3JpdGllczogJywgYXV0aG9yaXRpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2FjY2Vzc2RlbmllZCddKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApLnN1YnNjcmliZSh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvZigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbkFjdGl2YXRlQ2hpbGQoY2hpbGRSb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB8IFByb21pc2U8Ym9vbGVhbiB8IFVybFRyZWU+IHwgYm9vbGVhbiB8IFVybFRyZWUge1xyXG4gICAgICAgIGNvbnN0IGF1dGhvcml0aWVzID0gY2hpbGRSb3V0ZS5kYXRhWydhdXRob3JpdGllcyddO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrTG9naW4oYXV0aG9yaXRpZXMsIHN0YXRlLnVybCk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/app/core/auth/user-route-access-service.ts\n");

/***/ })

})