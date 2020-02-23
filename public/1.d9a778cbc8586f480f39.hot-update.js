webpackHotUpdate(1,{

/***/ "./frontend/app/account/settings/settings.component.ts":
/*!*************************************************************!*\
  !*** ./frontend/app/account/settings/settings.component.ts ***!
  \*************************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SettingsComponent\", function() { return SettingsComponent; });\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ \"./node_modules/@angular/core/fesm2015/core.js\");\n/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ \"./node_modules/@angular/forms/fesm2015/forms.js\");\n/* harmony import */ var app_core_auth_account_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/auth/account.service */ \"./frontend/app/core/auth/account.service.ts\");\nvar _a, _b;\r\n\r\n\r\n\r\n\r\nlet SettingsComponent = class SettingsComponent {\r\n    constructor(accountService, fb) {\r\n        this.accountService = accountService;\r\n        this.fb = fb;\r\n        this.settingsForm = this.fb.group({\r\n            firstName: [undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__[\"Validators\"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__[\"Validators\"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_2__[\"Validators\"].maxLength(50)]],\r\n            lastName: [undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__[\"Validators\"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__[\"Validators\"].minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_2__[\"Validators\"].maxLength(50)]],\r\n            email: [undefined, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__[\"Validators\"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__[\"Validators\"].minLength(5), _angular_forms__WEBPACK_IMPORTED_MODULE_2__[\"Validators\"].maxLength(254), _angular_forms__WEBPACK_IMPORTED_MODULE_2__[\"Validators\"].email]],\r\n            activated: [false],\r\n            authorities: [[]],\r\n            langKey: ['en'],\r\n            login: [],\r\n            imageUrl: []\r\n        });\r\n    }\r\n    ngOnInit() {\r\n        this.accountService.identity().subscribe(account => {\r\n            this.updateForm(account);\r\n        });\r\n    }\r\n    save() {\r\n        const settingsAccount = this.accountFromForm();\r\n        this.accountService.save(settingsAccount).subscribe(() => {\r\n            this.error = null;\r\n            this.success = 'OK';\r\n            this.accountService.identity(true).then(account => {\r\n                this.updateForm(account);\r\n            });\r\n        }, () => {\r\n            this.success = null;\r\n            this.error = 'ERROR';\r\n        });\r\n    }\r\n    accountFromForm() {\r\n        const account = {};\r\n        return Object.assign({}, account, { firstName: this.settingsForm.get('firstName').value, lastName: this.settingsForm.get('lastName').value, email: this.settingsForm.get('email').value, activated: this.settingsForm.get('activated').value, authorities: this.settingsForm.get('authorities').value, langKey: this.settingsForm.get('langKey').value, login: this.settingsForm.get('login').value, imageUrl: this.settingsForm.get('imageUrl').value });\r\n    }\r\n    updateForm(account) {\r\n        this.settingsForm.patchValue({\r\n            firstName: account.firstName,\r\n            lastName: account.lastName,\r\n            email: account.email,\r\n            activated: account.activated,\r\n            authorities: account.authorities,\r\n            langKey: account.langKey,\r\n            login: account.login,\r\n            imageUrl: account.imageUrl\r\n        });\r\n    }\r\n};\r\nSettingsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__[\"__decorate\"]([\r\n    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__[\"Component\"])({\r\n        selector: 'jhi-settings',\r\n        template: __webpack_require__(/*! ./settings.component.html */ \"./frontend/app/account/settings/settings.component.html\")\r\n    }),\r\n    tslib__WEBPACK_IMPORTED_MODULE_0__[\"__metadata\"](\"design:paramtypes\", [typeof (_a = typeof app_core_auth_account_service__WEBPACK_IMPORTED_MODULE_3__[\"AccountService\"] !== \"undefined\" && app_core_auth_account_service__WEBPACK_IMPORTED_MODULE_3__[\"AccountService\"]) === \"function\" ? _a : Object, typeof (_b = typeof _angular_forms__WEBPACK_IMPORTED_MODULE_2__[\"FormBuilder\"] !== \"undefined\" && _angular_forms__WEBPACK_IMPORTED_MODULE_2__[\"FormBuilder\"]) === \"function\" ? _b : Object])\r\n], SettingsComponent);\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9hcHAvYWNjb3VudC9zZXR0aW5ncy9zZXR0aW5ncy5jb21wb25lbnQudHM/YjEyOCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFrRDtBQUNPO0FBRU07QUFNL0QsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFlNUIsWUFBb0IsY0FBOEIsRUFBVSxFQUFlO1FBQXZELG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUFVLE9BQUUsR0FBRixFQUFFLENBQWE7UUFYM0UsaUJBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUMzQixTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyx5REFBVSxDQUFDLFFBQVEsRUFBRSx5REFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSx5REFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hHLFFBQVEsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLHlEQUFVLENBQUMsUUFBUSxFQUFFLHlEQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLHlEQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0YsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMseURBQVUsQ0FBQyxRQUFRLEVBQUUseURBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUseURBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUseURBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvRyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbEIsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztZQUNmLEtBQUssRUFBRSxFQUFFO1lBQ1QsUUFBUSxFQUFFLEVBQUU7U0FDYixDQUFDLENBQUM7SUFFMkUsQ0FBQztJQUUvRSxRQUFRO1FBQ04sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJO1FBQ0YsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FDakQsR0FBRyxFQUFFO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxFQUNELEdBQUcsRUFBRTtZQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVPLGVBQWU7UUFDckIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLHlCQUNLLE9BQU8sSUFDVixTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxFQUNuRCxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUNqRCxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUMzQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxFQUNuRCxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxFQUN2RCxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUMvQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUMzQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxJQUNqRDtJQUNKLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBWTtRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUMzQixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7WUFDNUIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztZQUNwQixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVM7WUFDNUIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2hDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztZQUN4QixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDcEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5FWSxpQkFBaUI7SUFKN0IsK0RBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxjQUFjO1FBQ3hCLDZCQUFhLDJGQUEyQjtLQUN6QyxDQUFDOytGQWdCb0MsNEVBQWMsb0JBQWQsNEVBQWMsb0RBQWMsMERBQVcsb0JBQVgsMERBQVc7R0FmaEUsaUJBQWlCLENBbUU3QjtBQW5FNkIiLCJmaWxlIjoiLi9mcm9udGVuZC9hcHAvYWNjb3VudC9zZXR0aW5ncy9zZXR0aW5ncy5jb21wb25lbnQudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEFjY291bnRTZXJ2aWNlIH0gZnJvbSAnYXBwL2NvcmUvYXV0aC9hY2NvdW50LnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdqaGktc2V0dGluZ3MnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZXR0aW5ncy5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBlcnJvcjogc3RyaW5nO1xyXG4gIHN1Y2Nlc3M6IHN0cmluZztcclxuICBsYW5ndWFnZXM6IGFueVtdO1xyXG4gIHNldHRpbmdzRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xyXG4gICAgZmlyc3ROYW1lOiBbdW5kZWZpbmVkLCBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5taW5MZW5ndGgoMSksIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDUwKV1dLFxyXG4gICAgbGFzdE5hbWU6IFt1bmRlZmluZWQsIFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLm1pbkxlbmd0aCgxKSwgVmFsaWRhdG9ycy5tYXhMZW5ndGgoNTApXV0sXHJcbiAgICBlbWFpbDogW3VuZGVmaW5lZCwgW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMubWluTGVuZ3RoKDUpLCBWYWxpZGF0b3JzLm1heExlbmd0aCgyNTQpLCBWYWxpZGF0b3JzLmVtYWlsXV0sXHJcbiAgICBhY3RpdmF0ZWQ6IFtmYWxzZV0sXHJcbiAgICBhdXRob3JpdGllczogW1tdXSxcclxuICAgIGxhbmdLZXk6IFsnZW4nXSxcclxuICAgIGxvZ2luOiBbXSxcclxuICAgIGltYWdlVXJsOiBbXVxyXG4gIH0pO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjY291bnRTZXJ2aWNlOiBBY2NvdW50U2VydmljZSwgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hY2NvdW50U2VydmljZS5pZGVudGl0eSgpLnN1YnNjcmliZShhY2NvdW50ID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVGb3JtKGFjY291bnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzYXZlKCkge1xyXG4gICAgY29uc3Qgc2V0dGluZ3NBY2NvdW50ID0gdGhpcy5hY2NvdW50RnJvbUZvcm0oKTtcclxuICAgIHRoaXMuYWNjb3VudFNlcnZpY2Uuc2F2ZShzZXR0aW5nc0FjY291bnQpLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3VjY2VzcyA9ICdPSyc7XHJcbiAgICAgICAgdGhpcy5hY2NvdW50U2VydmljZS5pZGVudGl0eSh0cnVlKS50aGVuKGFjY291bnQgPT4ge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVGb3JtKGFjY291bnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdWNjZXNzID0gbnVsbDtcclxuICAgICAgICB0aGlzLmVycm9yID0gJ0VSUk9SJztcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWNjb3VudEZyb21Gb3JtKCk6IGFueSB7XHJcbiAgICBjb25zdCBhY2NvdW50ID0ge307XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5hY2NvdW50LFxyXG4gICAgICBmaXJzdE5hbWU6IHRoaXMuc2V0dGluZ3NGb3JtLmdldCgnZmlyc3ROYW1lJykudmFsdWUsXHJcbiAgICAgIGxhc3ROYW1lOiB0aGlzLnNldHRpbmdzRm9ybS5nZXQoJ2xhc3ROYW1lJykudmFsdWUsXHJcbiAgICAgIGVtYWlsOiB0aGlzLnNldHRpbmdzRm9ybS5nZXQoJ2VtYWlsJykudmFsdWUsXHJcbiAgICAgIGFjdGl2YXRlZDogdGhpcy5zZXR0aW5nc0Zvcm0uZ2V0KCdhY3RpdmF0ZWQnKS52YWx1ZSxcclxuICAgICAgYXV0aG9yaXRpZXM6IHRoaXMuc2V0dGluZ3NGb3JtLmdldCgnYXV0aG9yaXRpZXMnKS52YWx1ZSxcclxuICAgICAgbGFuZ0tleTogdGhpcy5zZXR0aW5nc0Zvcm0uZ2V0KCdsYW5nS2V5JykudmFsdWUsXHJcbiAgICAgIGxvZ2luOiB0aGlzLnNldHRpbmdzRm9ybS5nZXQoJ2xvZ2luJykudmFsdWUsXHJcbiAgICAgIGltYWdlVXJsOiB0aGlzLnNldHRpbmdzRm9ybS5nZXQoJ2ltYWdlVXJsJykudmFsdWVcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB1cGRhdGVGb3JtKGFjY291bnQ6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZXR0aW5nc0Zvcm0ucGF0Y2hWYWx1ZSh7XHJcbiAgICAgIGZpcnN0TmFtZTogYWNjb3VudC5maXJzdE5hbWUsXHJcbiAgICAgIGxhc3ROYW1lOiBhY2NvdW50Lmxhc3ROYW1lLFxyXG4gICAgICBlbWFpbDogYWNjb3VudC5lbWFpbCxcclxuICAgICAgYWN0aXZhdGVkOiBhY2NvdW50LmFjdGl2YXRlZCxcclxuICAgICAgYXV0aG9yaXRpZXM6IGFjY291bnQuYXV0aG9yaXRpZXMsXHJcbiAgICAgIGxhbmdLZXk6IGFjY291bnQubGFuZ0tleSxcclxuICAgICAgbG9naW46IGFjY291bnQubG9naW4sXHJcbiAgICAgIGltYWdlVXJsOiBhY2NvdW50LmltYWdlVXJsXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/app/account/settings/settings.component.ts\n");

/***/ })

})