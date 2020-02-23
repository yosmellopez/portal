webpackHotUpdate("main",{

/***/ "./frontend/app/core/auth/user-route-access-service.ts":
/*!*************************************************************!*\
  !*** ./frontend/app/core/auth/user-route-access-service.ts ***!
  \*************************************************************/
/*! exports provided: UserRouteAccessService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserRouteAccessService\", function() { return UserRouteAccessService; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ \"./node_modules/@angular/core/fesm2015/core.js\");\n/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ \"./node_modules/@angular/router/fesm2015/router.js\");\n/* harmony import */ var app_core_auth_account_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/auth/account.service */ \"./frontend/app/core/auth/account.service.ts\");\n/* harmony import */ var app_core_login_login_modal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/login/login-modal.service */ \"./frontend/app/core/login/login-modal.service.ts\");\n/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ \"./node_modules/rxjs/_esm2015/operators/index.js\");\nvar _a, _b, _c;\r\n\r\n\r\n\r\n\r\n\r\n\r\nlet UserRouteAccessService = class UserRouteAccessService {\r\n    constructor(router, loginModalService, accountService) {\r\n        this.router = router;\r\n        this.loginModalService = loginModalService;\r\n        this.accountService = accountService;\r\n    }\r\n    canActivate(route, state) {\r\n        const authorities = route.data['authorities'];\r\n        // We need to call the checkLogin / and so the accountService.identity() function, to ensure,\r\n        // that the client has a principal too, if they already logged in by the server.\r\n        // This could happen on a page refresh.\r\n        return this.checkLogin(authorities, state.url);\r\n    }\r\n    checkLogin(authorities, url) {\r\n        return this.accountService.identity(true).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__[\"map\"])(account => {\r\n            if (account) {\r\n                if (!authorities || authorities.length === 0) {\r\n                    return true;\r\n                }\r\n                const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);\r\n                if (hasAnyAuthority) {\r\n                    return true;\r\n                }\r\n                if (Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__[\"isDevMode\"])()) {\r\n                    console.error('User has not any of required authorities: ', authorities);\r\n                }\r\n                this.router.navigate(['accessdenied']);\r\n                return false;\r\n            }\r\n            else {\r\n                this.router.navigate(['/login']);\r\n                return false;\r\n            }\r\n        }));\r\n    }\r\n    canActivateChild(childRoute, state) {\r\n        const authorities = childRoute.data['authorities'];\r\n        return this.checkLogin(authorities, state.url);\r\n    }\r\n};\r\nUserRouteAccessService = tslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\r\n    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__[\"Injectable\"])({ providedIn: 'root' }),\r\n    tslib__WEBPACK_IMPORTED_MODULE_0__[\"__metadata\"](\"design:paramtypes\", [typeof (_a = typeof _angular_router__WEBPACK_IMPORTED_MODULE_2__[\"Router\"] !== \"undefined\" && _angular_router__WEBPACK_IMPORTED_MODULE_2__[\"Router\"]) === \"function\" ? _a : Object, typeof (_b = typeof app_core_login_login_modal_service__WEBPACK_IMPORTED_MODULE_4__[\"LoginModalService\"] !== \"undefined\" && app_core_login_login_modal_service__WEBPACK_IMPORTED_MODULE_4__[\"LoginModalService\"]) === \"function\" ? _b : Object, typeof (_c = typeof app_core_auth_account_service__WEBPACK_IMPORTED_MODULE_3__[\"AccountService\"] !== \"undefined\" && app_core_auth_account_service__WEBPACK_IMPORTED_MODULE_3__[\"AccountService\"]) === \"function\" ? _c : Object])\r\n], UserRouteAccessService);\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9hcHAvY29yZS9hdXRoL3VzZXItcm91dGUtYWNjZXNzLXNlcnZpY2UudHM/MTI3NiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQW9EO0FBUTNCO0FBRW9DO0FBQ1E7QUFFbEM7QUFHbkMsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFDL0IsWUFBb0IsTUFBYyxFQUFVLGlCQUFvQyxFQUFVLGNBQThCO1FBQXBHLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3hILENBQUM7SUFFRCxXQUFXLENBQUMsS0FBNkIsRUFBRSxLQUEwQjtRQUNqRSxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlDLDZGQUE2RjtRQUM3RixnRkFBZ0Y7UUFDaEYsdUNBQXVDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxVQUFVLENBQUMsV0FBcUIsRUFBRSxHQUFXO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUMxQywwREFBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDMUMsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7Z0JBQ0QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3pFLElBQUksZUFBZSxFQUFFO29CQUNqQixPQUFPLElBQUksQ0FBQztpQkFDZjtnQkFDRCxJQUFJLCtEQUFTLEVBQUUsRUFBRTtvQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUM1RTtnQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDakMsT0FBTyxLQUFLLENBQUM7YUFDaEI7UUFDTCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQWtDLEVBQUUsS0FBMEI7UUFDM0UsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0o7QUF4Q1ksc0JBQXNCO0lBRGxDLGdFQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7K0ZBRUQsc0RBQU0sb0JBQU4sc0RBQU0sb0RBQTZCLG9GQUFpQixvQkFBakIsb0ZBQWlCLG9EQUEwQiw0RUFBYyxvQkFBZCw0RUFBYztHQUQvRyxzQkFBc0IsQ0F3Q2xDO0FBeENrQyIsImZpbGUiOiIuL2Zyb250ZW5kL2FwcC9jb3JlL2F1dGgvdXNlci1yb3V0ZS1hY2Nlc3Mtc2VydmljZS50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgaXNEZXZNb2RlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICAgIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXHJcbiAgICBDYW5BY3RpdmF0ZSxcclxuICAgIENhbkFjdGl2YXRlQ2hpbGQsXHJcbiAgICBSb3V0ZXIsXHJcbiAgICBSb3V0ZXJTdGF0ZVNuYXBzaG90LFxyXG4gICAgVXJsVHJlZVxyXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQge0FjY291bnRTZXJ2aWNlfSBmcm9tICdhcHAvY29yZS9hdXRoL2FjY291bnQuc2VydmljZSc7XHJcbmltcG9ydCB7TG9naW5Nb2RhbFNlcnZpY2V9IGZyb20gJ2FwcC9jb3JlL2xvZ2luL2xvZ2luLW1vZGFsLnNlcnZpY2UnO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7bWFwfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcclxuXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgVXNlclJvdXRlQWNjZXNzU2VydmljZSBpbXBsZW1lbnRzIENhbkFjdGl2YXRlLCBDYW5BY3RpdmF0ZUNoaWxkIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgbG9naW5Nb2RhbFNlcnZpY2U6IExvZ2luTW9kYWxTZXJ2aWNlLCBwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSkge1xyXG4gICAgfVxyXG5cclxuICAgIGNhbkFjdGl2YXRlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGNvbnN0IGF1dGhvcml0aWVzID0gcm91dGUuZGF0YVsnYXV0aG9yaXRpZXMnXTtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIGNhbGwgdGhlIGNoZWNrTG9naW4gLyBhbmQgc28gdGhlIGFjY291bnRTZXJ2aWNlLmlkZW50aXR5KCkgZnVuY3Rpb24sIHRvIGVuc3VyZSxcclxuICAgICAgICAvLyB0aGF0IHRoZSBjbGllbnQgaGFzIGEgcHJpbmNpcGFsIHRvbywgaWYgdGhleSBhbHJlYWR5IGxvZ2dlZCBpbiBieSB0aGUgc2VydmVyLlxyXG4gICAgICAgIC8vIFRoaXMgY291bGQgaGFwcGVuIG9uIGEgcGFnZSByZWZyZXNoLlxyXG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrTG9naW4oYXV0aG9yaXRpZXMsIHN0YXRlLnVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tMb2dpbihhdXRob3JpdGllczogc3RyaW5nW10sIHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNjb3VudFNlcnZpY2UuaWRlbnRpdHkodHJ1ZSkucGlwZShcclxuICAgICAgICAgICAgbWFwKGFjY291bnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWF1dGhvcml0aWVzIHx8IGF1dGhvcml0aWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzQW55QXV0aG9yaXR5ID0gdGhpcy5hY2NvdW50U2VydmljZS5oYXNBbnlBdXRob3JpdHkoYXV0aG9yaXRpZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNBbnlBdXRob3JpdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdVc2VyIGhhcyBub3QgYW55IG9mIHJlcXVpcmVkIGF1dGhvcml0aWVzOiAnLCBhdXRob3JpdGllcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnYWNjZXNzZGVuaWVkJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvbG9naW4nXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuQWN0aXZhdGVDaGlsZChjaGlsZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHwgUHJvbWlzZTxib29sZWFuIHwgVXJsVHJlZT4gfCBib29sZWFuIHwgVXJsVHJlZSB7XHJcbiAgICAgICAgY29uc3QgYXV0aG9yaXRpZXMgPSBjaGlsZFJvdXRlLmRhdGFbJ2F1dGhvcml0aWVzJ107XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tMb2dpbihhdXRob3JpdGllcywgc3RhdGUudXJsKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/app/core/auth/user-route-access-service.ts\n");

/***/ })

})