webpackHotUpdate(1,{

/***/ "./frontend/app/account/password-reset/init/password-reset-init.component.html":
/*!*************************************************************************************!*\
  !*** ./frontend/app/account/password-reset/init/password-reset-init.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div style=\\\"position:fixed;min-height:100%;min-width:100%;background-size: 100% 100%;background-image: url('../../../content/img/background.png')\\\"> <div class=\\\"header bg-gradient-primary py-5 py-lg-8\\\"> <div class=\\\"container\\\"> <div class=\\\"header-body text-center\\\"> <div class=\\\"row justify-content-center\\\"> <div class=\\\"col-lg-5 col-md-6\\\"> <h1 class=\\\"text-black-50\\\">Bienvenidos al Portal de Facturación Electrónica.</h1> </div> </div> </div> </div> </div> </div> <div class=\\\"container mt--8 pb-5\\\"> <div class=\\\"row justify-content-center\\\"> <div class=\\\"col-lg-5 col-md-7\\\"> <div class=\\\"card bg-secondary shadow border-0\\\" disabled=\\\"true\\\"> <div class=\\\"card-header bg-transparent pb-3\\\"> <div class=\\\"text-dark text-center mt-2 mb-1\\\"> <h3>Cambiar contraseña</h3> </div> </div> <div class=\\\"card-body px-lg-5 py-lg-5\\\"> <div class=\\\"text-center text-dark mb-4\\\"> <small> Introduzca su correo para cambiar su contraseña. </small> </div> <form role=\\\"form\\\" *ngIf=\\\"!success\\\" name=\\\"form\\\" role=\\\"form\\\" (ngSubmit)=\\\"requestReset()\\\" [formGroup]=\\\"resetRequestForm\\\"> <h1>Reset your password</h1> <div class=\\\"alert alert-danger\\\" *ngIf=\\\"errorEmailNotExists\\\"> <strong>Email address isn't registered!</strong> Please check and try again. </div> <div class=\\\"alert alert-warning\\\" *ngIf=\\\"!success\\\"> <p>Enter the email address you used to register.</p> </div> <div class=\\\"alert alert-success\\\" *ngIf=\\\"success === 'OK'\\\"></div> <div class=\\\"form-group\\\"> <div class=\\\"form-group mb-3\\\"> <div class=\\\"input-group input-group-alternative\\\"> <div class=\\\"input-group-prepend\\\"> <span class=\\\"input-group-text\\\"> <mat-icon style=\\\"position: relative;top: 2px\\\">person_outline</mat-icon> </span> </div> <input class=\\\"form-control\\\" #emailInput placeholder=\\\"Correo\\\" type=\\\"text\\\" id=\\\"email\\\" name=\\\"email\\\" autofocus formControlName=\\\"email\\\"> </div> </div> <div *ngIf=\\\"resetRequestForm.get('email').invalid && (resetRequestForm.get('email').dirty || resetRequestForm.get('email').touched)\\\"> <small class=\\\"form-text text-danger\\\" *ngIf=\\\"resetRequestForm.get('email').errors.required\\\"> Your email is required. </small> <small class=\\\"form-text text-danger\\\" *ngIf=\\\"resetRequestForm.get('email').errors.email\\\"> Your email is invalid. </small> <small class=\\\"form-text text-danger\\\" *ngIf=\\\"resetRequestForm.get('email').errors.minlength\\\"> Your email is required to be at least 5 characters. </small> <small class=\\\"form-text text-danger\\\" *ngIf=\\\"resetRequestForm.get('email').errors.maxlength\\\"> Your email cannot be longer than 100 characters. </small> </div> </div> <div class=\\\"text-center table-actions-theme\\\"> <button mat-raised-button [color]=\\\"true?'warn':'primary'\\\" [disabled]=\\\"resetRequestForm.invalid\\\"> <mat-icon>lock_open</mat-icon> Iniciar Sesión <mat-icon>keyboard_arrow_right</mat-icon> </button> </div> <div class=\\\"center-block text-center\\\" style=\\\"min-height: 40px;position: relative;\\\"> </div> </form> </div> </div> </div> </div> </div>\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9hcHAvYWNjb3VudC9wYXNzd29yZC1yZXNldC9pbml0L3Bhc3N3b3JkLXJlc2V0LWluaXQuY29tcG9uZW50Lmh0bWw/MDY0NCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4Q0FBOEMsZ0JBQWdCLGVBQWUsMkJBQTJCLHlpREFBeWlELDh0Q0FBOHRDLG1CQUFtQiIsImZpbGUiOiIuL2Zyb250ZW5kL2FwcC9hY2NvdW50L3Bhc3N3b3JkLXJlc2V0L2luaXQvcGFzc3dvcmQtcmVzZXQtaW5pdC5jb21wb25lbnQuaHRtbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IHN0eWxlPVxcXCJwb3NpdGlvbjpmaXhlZDttaW4taGVpZ2h0OjEwMCU7bWluLXdpZHRoOjEwMCU7YmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCU7YmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi8uLi8uLi9jb250ZW50L2ltZy9iYWNrZ3JvdW5kLnBuZycpXFxcIj4gPGRpdiBjbGFzcz1cXFwiaGVhZGVyIGJnLWdyYWRpZW50LXByaW1hcnkgcHktNSBweS1sZy04XFxcIj4gPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyXFxcIj4gPGRpdiBjbGFzcz1cXFwiaGVhZGVyLWJvZHkgdGV4dC1jZW50ZXJcXFwiPiA8ZGl2IGNsYXNzPVxcXCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclxcXCI+IDxkaXYgY2xhc3M9XFxcImNvbC1sZy01IGNvbC1tZC02XFxcIj4gPGgxIGNsYXNzPVxcXCJ0ZXh0LWJsYWNrLTUwXFxcIj5CaWVudmVuaWRvcyBhbCBQb3J0YWwgZGUgRmFjdHVyYWNpw7NuIEVsZWN0csOzbmljYS48L2gxPiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJjb250YWluZXIgbXQtLTggcGItNVxcXCI+IDxkaXYgY2xhc3M9XFxcInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj4gPGRpdiBjbGFzcz1cXFwiY29sLWxnLTUgY29sLW1kLTdcXFwiPiA8ZGl2IGNsYXNzPVxcXCJjYXJkIGJnLXNlY29uZGFyeSBzaGFkb3cgYm9yZGVyLTBcXFwiIGRpc2FibGVkPVxcXCJ0cnVlXFxcIj4gPGRpdiBjbGFzcz1cXFwiY2FyZC1oZWFkZXIgYmctdHJhbnNwYXJlbnQgcGItM1xcXCI+IDxkaXYgY2xhc3M9XFxcInRleHQtZGFyayB0ZXh0LWNlbnRlciBtdC0yIG1iLTFcXFwiPiA8aDM+Q2FtYmlhciBjb250cmFzZcOxYTwvaDM+IDwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiY2FyZC1ib2R5IHB4LWxnLTUgcHktbGctNVxcXCI+IDxkaXYgY2xhc3M9XFxcInRleHQtY2VudGVyIHRleHQtZGFyayBtYi00XFxcIj4gPHNtYWxsPiBJbnRyb2R1emNhIHN1IGNvcnJlbyBwYXJhIGNhbWJpYXIgc3UgY29udHJhc2XDsWEuIDwvc21hbGw+IDwvZGl2PiA8Zm9ybSByb2xlPVxcXCJmb3JtXFxcIiAqbmdJZj1cXFwiIXN1Y2Nlc3NcXFwiIG5hbWU9XFxcImZvcm1cXFwiIHJvbGU9XFxcImZvcm1cXFwiIChuZ1N1Ym1pdCk9XFxcInJlcXVlc3RSZXNldCgpXFxcIiBbZm9ybUdyb3VwXT1cXFwicmVzZXRSZXF1ZXN0Rm9ybVxcXCI+IDxoMT5SZXNldCB5b3VyIHBhc3N3b3JkPC9oMT4gPGRpdiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtZGFuZ2VyXFxcIiAqbmdJZj1cXFwiZXJyb3JFbWFpbE5vdEV4aXN0c1xcXCI+IDxzdHJvbmc+RW1haWwgYWRkcmVzcyBpc24ndCByZWdpc3RlcmVkITwvc3Ryb25nPiBQbGVhc2UgY2hlY2sgYW5kIHRyeSBhZ2Fpbi4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LXdhcm5pbmdcXFwiICpuZ0lmPVxcXCIhc3VjY2Vzc1xcXCI+IDxwPkVudGVyIHRoZSBlbWFpbCBhZGRyZXNzIHlvdSB1c2VkIHRvIHJlZ2lzdGVyLjwvcD4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LXN1Y2Nlc3NcXFwiICpuZ0lmPVxcXCJzdWNjZXNzID09PSAnT0snXFxcIj48L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+IDxkaXYgY2xhc3M9XFxcImZvcm0tZ3JvdXAgbWItM1xcXCI+IDxkaXYgY2xhc3M9XFxcImlucHV0LWdyb3VwIGlucHV0LWdyb3VwLWFsdGVybmF0aXZlXFxcIj4gPGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXAtcHJlcGVuZFxcXCI+IDxzcGFuIGNsYXNzPVxcXCJpbnB1dC1ncm91cC10ZXh0XFxcIj4gPG1hdC1pY29uIHN0eWxlPVxcXCJwb3NpdGlvbjogcmVsYXRpdmU7dG9wOiAycHhcXFwiPnBlcnNvbl9vdXRsaW5lPC9tYXQtaWNvbj4gPC9zcGFuPiA8L2Rpdj4gPGlucHV0IGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiICNlbWFpbElucHV0IHBsYWNlaG9sZGVyPVxcXCJDb3JyZW9cXFwiIHR5cGU9XFxcInRleHRcXFwiIGlkPVxcXCJlbWFpbFxcXCIgbmFtZT1cXFwiZW1haWxcXFwiIGF1dG9mb2N1cyBmb3JtQ29udHJvbE5hbWU9XFxcImVtYWlsXFxcIj4gPC9kaXY+IDwvZGl2PiA8ZGl2ICpuZ0lmPVxcXCJyZXNldFJlcXVlc3RGb3JtLmdldCgnZW1haWwnKS5pbnZhbGlkICYmIChyZXNldFJlcXVlc3RGb3JtLmdldCgnZW1haWwnKS5kaXJ0eSB8fCByZXNldFJlcXVlc3RGb3JtLmdldCgnZW1haWwnKS50b3VjaGVkKVxcXCI+IDxzbWFsbCBjbGFzcz1cXFwiZm9ybS10ZXh0IHRleHQtZGFuZ2VyXFxcIiAqbmdJZj1cXFwicmVzZXRSZXF1ZXN0Rm9ybS5nZXQoJ2VtYWlsJykuZXJyb3JzLnJlcXVpcmVkXFxcIj4gWW91ciBlbWFpbCBpcyByZXF1aXJlZC4gPC9zbWFsbD4gPHNtYWxsIGNsYXNzPVxcXCJmb3JtLXRleHQgdGV4dC1kYW5nZXJcXFwiICpuZ0lmPVxcXCJyZXNldFJlcXVlc3RGb3JtLmdldCgnZW1haWwnKS5lcnJvcnMuZW1haWxcXFwiPiBZb3VyIGVtYWlsIGlzIGludmFsaWQuIDwvc21hbGw+IDxzbWFsbCBjbGFzcz1cXFwiZm9ybS10ZXh0IHRleHQtZGFuZ2VyXFxcIiAqbmdJZj1cXFwicmVzZXRSZXF1ZXN0Rm9ybS5nZXQoJ2VtYWlsJykuZXJyb3JzLm1pbmxlbmd0aFxcXCI+IFlvdXIgZW1haWwgaXMgcmVxdWlyZWQgdG8gYmUgYXQgbGVhc3QgNSBjaGFyYWN0ZXJzLiA8L3NtYWxsPiA8c21hbGwgY2xhc3M9XFxcImZvcm0tdGV4dCB0ZXh0LWRhbmdlclxcXCIgKm5nSWY9XFxcInJlc2V0UmVxdWVzdEZvcm0uZ2V0KCdlbWFpbCcpLmVycm9ycy5tYXhsZW5ndGhcXFwiPiBZb3VyIGVtYWlsIGNhbm5vdCBiZSBsb25nZXIgdGhhbiAxMDAgY2hhcmFjdGVycy4gPC9zbWFsbD4gPC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJ0ZXh0LWNlbnRlciB0YWJsZS1hY3Rpb25zLXRoZW1lXFxcIj4gPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBbY29sb3JdPVxcXCJ0cnVlPyd3YXJuJzoncHJpbWFyeSdcXFwiIFtkaXNhYmxlZF09XFxcInJlc2V0UmVxdWVzdEZvcm0uaW52YWxpZFxcXCI+IDxtYXQtaWNvbj5sb2NrX29wZW48L21hdC1pY29uPiBJbmljaWFyIFNlc2nDs24gPG1hdC1pY29uPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9tYXQtaWNvbj4gPC9idXR0b24+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJjZW50ZXItYmxvY2sgdGV4dC1jZW50ZXJcXFwiIHN0eWxlPVxcXCJtaW4taGVpZ2h0OiA0MHB4O3Bvc2l0aW9uOiByZWxhdGl2ZTtcXFwiPiA8L2Rpdj4gPC9mb3JtPiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+XCI7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/app/account/password-reset/init/password-reset-init.component.html\n");

/***/ })

})