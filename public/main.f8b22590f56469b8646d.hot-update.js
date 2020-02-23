webpackHotUpdate("main",{

/***/ "./frontend/app/app-routing.module.ts":
/*!********************************************!*\
  !*** ./frontend/app/app-routing.module.ts ***!
  \********************************************/
/*! exports provided: PortalAppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PortalAppRoutingModule\", function() { return PortalAppRoutingModule; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ \"./node_modules/@angular/core/fesm2015/core.js\");\n/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ \"./node_modules/@angular/router/fesm2015/router.js\");\n/* harmony import */ var _layouts_error_error_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layouts/error/error.route */ \"./frontend/app/layouts/error/error.route.ts\");\n/* harmony import */ var _layouts_navbar_navbar_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layouts/navbar/navbar.route */ \"./frontend/app/layouts/navbar/navbar.route.ts\");\n/* harmony import */ var app_core_auth_user_route_access_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/auth/user-route-access-service */ \"./frontend/app/core/auth/user-route-access-service.ts\");\n/* harmony import */ var app_core_auth_login_access_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/auth/login-access-service */ \"./frontend/app/core/auth/login-access-service.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst LAYOUT_ROUTES = [_layouts_navbar_navbar_route__WEBPACK_IMPORTED_MODULE_4__[\"navbarRoute\"], ..._layouts_error_error_route__WEBPACK_IMPORTED_MODULE_3__[\"errorRoute\"]];\r\nlet PortalAppRoutingModule = class PortalAppRoutingModule {\r\n};\r\nPortalAppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\r\n    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__[\"NgModule\"])({\r\n        imports: [\r\n            _angular_router__WEBPACK_IMPORTED_MODULE_2__[\"RouterModule\"].forRoot([\r\n                {\r\n                    path: 'login',\r\n                    loadChildren: () => __webpack_require__.e(/*! import() */ 7).then(__webpack_require__.bind(null, /*! ./login/login.module */ \"./frontend/app/login/login.module.ts\")).then(m => m.LoginModule),\r\n                    canActivate: [app_core_auth_login_access_service__WEBPACK_IMPORTED_MODULE_6__[\"LoginAccessService\"]]\r\n                },\r\n                {\r\n                    path: '',\r\n                    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e(6), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, /*! ./application/application.module */ \"./frontend/app/application/application.module.ts\")).then(m => m.ApplicationModule),\r\n                    canActivateChild: [app_core_auth_user_route_access_service__WEBPACK_IMPORTED_MODULE_5__[\"UserRouteAccessService\"]]\r\n                },\r\n                ...LAYOUT_ROUTES\r\n            ])\r\n        ],\r\n        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__[\"RouterModule\"]]\r\n    })\r\n], PortalAppRoutingModule);\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9hcHAvYXBwLXJvdXRpbmcubW9kdWxlLnRzPzJmZTgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF1QztBQUNNO0FBQ1U7QUFDRztBQUVxQjtBQUNUO0FBRXRFLE1BQU0sYUFBYSxHQUFHLENBQUMsd0VBQVcsRUFBRSxHQUFHLHFFQUFVLENBQUMsQ0FBQztBQXNCbkQsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7Q0FDbEM7QUFEWSxzQkFBc0I7SUFwQmxDLDhEQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCw0REFBWSxDQUFDLE9BQU8sQ0FBQztnQkFDYjtvQkFDSSxJQUFJLEVBQUUsT0FBTztvQkFDYixZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsaUpBQThCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztvQkFDM0UsV0FBVyxFQUFFLENBQUMscUZBQWtCLENBQUM7aUJBQ3BDO2dCQUNEO29CQUNJLElBQUksRUFBRSxFQUFFO29CQUNSLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FBQyxpTkFBMEMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7b0JBQzdGLGdCQUFnQixFQUFFLENBQUMsOEZBQXNCLENBQUM7aUJBQzdDO2dCQUNELEdBQUcsYUFBYTthQUNuQixDQUVKO1NBQ0o7UUFDRCxPQUFPLEVBQUUsQ0FBQyw0REFBWSxDQUFDO0tBQzFCLENBQUM7R0FDVyxzQkFBc0IsQ0FDbEM7QUFEa0MiLCJmaWxlIjoiLi9mcm9udGVuZC9hcHAvYXBwLXJvdXRpbmcubW9kdWxlLnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQge2Vycm9yUm91dGV9IGZyb20gJy4vbGF5b3V0cy9lcnJvci9lcnJvci5yb3V0ZSc7XHJcbmltcG9ydCB7bmF2YmFyUm91dGV9IGZyb20gJy4vbGF5b3V0cy9uYXZiYXIvbmF2YmFyLnJvdXRlJztcclxuaW1wb3J0IHtERUJVR19JTkZPX0VOQUJMRUR9IGZyb20gJ2FwcC9hcHAuY29uc3RhbnRzJztcclxuaW1wb3J0IHtVc2VyUm91dGVBY2Nlc3NTZXJ2aWNlfSBmcm9tICdhcHAvY29yZS9hdXRoL3VzZXItcm91dGUtYWNjZXNzLXNlcnZpY2UnO1xyXG5pbXBvcnQge0xvZ2luQWNjZXNzU2VydmljZX0gZnJvbSBcImFwcC9jb3JlL2F1dGgvbG9naW4tYWNjZXNzLXNlcnZpY2VcIjtcclxuXHJcbmNvbnN0IExBWU9VVF9ST1VURVMgPSBbbmF2YmFyUm91dGUsIC4uLmVycm9yUm91dGVdO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBSb3V0ZXJNb2R1bGUuZm9yUm9vdChbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogJ2xvZ2luJyxcclxuICAgICAgICAgICAgICAgICAgICBsb2FkQ2hpbGRyZW46ICgpID0+IGltcG9ydCgnLi9sb2dpbi9sb2dpbi5tb2R1bGUnKS50aGVuKG0gPT4gbS5Mb2dpbk1vZHVsZSksXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuQWN0aXZhdGU6IFtMb2dpbkFjY2Vzc1NlcnZpY2VdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRDaGlsZHJlbjogKCkgPT4gaW1wb3J0KCcuL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uLm1vZHVsZScpLnRoZW4obSA9PiBtLkFwcGxpY2F0aW9uTW9kdWxlKSxcclxuICAgICAgICAgICAgICAgICAgICBjYW5BY3RpdmF0ZUNoaWxkOiBbVXNlclJvdXRlQWNjZXNzU2VydmljZV1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAuLi5MQVlPVVRfUk9VVEVTXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIC8vIHtlbmFibGVUcmFjaW5nOiBERUJVR19JTkZPX0VOQUJMRUR9XHJcbiAgICAgICAgKVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtSb3V0ZXJNb2R1bGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQb3J0YWxBcHBSb3V0aW5nTW9kdWxlIHtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/app/app-routing.module.ts\n");

/***/ })

})