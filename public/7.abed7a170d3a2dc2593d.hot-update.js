webpackHotUpdate(7,{

/***/ "./frontend/app/login/login.component.html":
/*!*************************************************!*\
  !*** ./frontend/app/login/login.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div style=\\\"position:fixed;min-height:100%;min-width:100%;background-size: 100% 100%;background-image: url('../../../content/img/background.png')\\\"> <div class=\\\"header bg-gradient-primary py-5 py-lg-8\\\"> <div class=\\\"container\\\"> <div class=\\\"header-body text-center\\\"> <div class=\\\"row justify-content-center\\\"> <div class=\\\"col-lg-5 col-md-6\\\"> <h1 class=\\\"text-black-50\\\">Bienvenidos al Portal de Facturación Electrónica.</h1> </div> </div> </div> </div> </div> <div class=\\\"container mt--8 pb-5\\\"> <div class=\\\"row justify-content-center\\\"> <div class=\\\"col-lg-5 col-md-7\\\"> <div class=\\\"card bg-secondary shadow border-0\\\" disabled=\\\"true\\\"> <div class=\\\"card-header bg-transparent pb-3\\\"> <div class=\\\"text-dark text-center mt-2 mb-1\\\"> <h3>Inicio de Sesión</h3> </div> </div> <div class=\\\"card-body px-lg-5 py-lg-5\\\"> <div class=\\\"text-center text-dark mb-4\\\"> <small> Inicie Sesión con sus credenciales. </small> </div> <form role=\\\"form\\\" (ngSubmit)=\\\"login()\\\" [formGroup]=\\\"loginForm\\\"> <div class=\\\"form-group mb-3\\\"> <div class=\\\"input-group input-group-alternative\\\"> <div class=\\\"input-group-prepend\\\"> <span class=\\\"input-group-text\\\"> <mat-icon style=\\\"position: relative;top: 2px\\\">person_outline</mat-icon> </span> </div> <input class=\\\"form-control\\\" #loginInput placeholder=\\\"Nombre de Usuario\\\" type=\\\"text\\\" id=\\\"username\\\" name=\\\"username\\\" autofocus formControlName=\\\"nombUsuario\\\"> </div> <span class=\\\"invalid-feedback\\\" style=\\\"display: block;\\\" role=\\\"alert\\\"><strong>{{ imagen }}</strong></span> </div> <div class=\\\"form-group\\\"> <div class=\\\"input-group input-group-alternative\\\"> <div class=\\\"input-group-prepend\\\"> <span class=\\\"input-group-text\\\"> <mat-icon style=\\\"position: relative;top: 2px\\\">vpn_key</mat-icon> </span> </div> <input class=\\\"form-control\\\" name=\\\"password\\\" placeholder=\\\"Contraseña\\\" type=\\\"password\\\" formControlName=\\\"claveUsuario\\\"> </div> <span class=\\\"invalid-feedback\\\" style=\\\"display: block;\\\" role=\\\"alert\\\"><strong></strong></span> </div> <div class=\\\"center-block text-center\\\" style=\\\"min-height: 30px;position: relative;top: 5px\\\"> <div *ngIf=\\\"authenticationError\\\"> <span class=\\\"text-danger\\\">Nombre de usuario o contraseña incorrectos.</span> </div> </div> <div class=\\\"center-block text-center\\\" style=\\\"min-height: 40px;position: relative;top: -35px\\\"> <mat-spinner strokeWidth=\\\"2\\\" diameter=\\\"40\\\" style=\\\"position: relative;left: 45%\\\" *ngIf=\\\"isLoading\\\"></mat-spinner> </div> <div class=\\\"text-center table-actions-theme\\\"> <button mat-raised-button [color]=\\\"authenticationError?'warn':'primary'\\\" [disabled]=\\\"loginForm.invalid\\\"> <mat-icon>lock_open</mat-icon> Iniciar Sesión <mat-icon>keyboard_arrow_right</mat-icon> </button> </div> <div class=\\\"center-block text-center\\\" style=\\\"min-height: 40px;position: relative;\\\"> </div> </form> </div> </div> <div class=\\\"row mt-3 text-center\\\" style=\\\"margin-top: -75px !important;padding-left: 30px;color: #0a0c0d;\\\"> <div class=\\\"col-6\\\"> <a class=\\\"text-dark\\\">¿Olvidó su contraseña?</a> </div> </div> </div> </div> </div> </div>\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50Lmh0bWw/N2E1YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4Q0FBOEMsZ0JBQWdCLGVBQWUsMkJBQTJCLGlsQ0FBaWxDLDBSQUEwUiw0QkFBNEIsVUFBVSxrTkFBa04sMk9BQTJPLG1IQUFtSCxtQkFBbUIsOE1BQThNLG1CQUFtQix3RkFBd0YsNlhBQTZYLG1CQUFtQiwwR0FBMEcsbUJBQW1CLGVBQWUiLCJmaWxlIjoiLi9mcm9udGVuZC9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50Lmh0bWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBzdHlsZT1cXFwicG9zaXRpb246Zml4ZWQ7bWluLWhlaWdodDoxMDAlO21pbi13aWR0aDoxMDAlO2JhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO2JhY2tncm91bmQtaW1hZ2U6IHVybCgnLi4vLi4vLi4vY29udGVudC9pbWcvYmFja2dyb3VuZC5wbmcnKVxcXCI+IDxkaXYgY2xhc3M9XFxcImhlYWRlciBiZy1ncmFkaWVudC1wcmltYXJ5IHB5LTUgcHktbGctOFxcXCI+IDxkaXYgY2xhc3M9XFxcImNvbnRhaW5lclxcXCI+IDxkaXYgY2xhc3M9XFxcImhlYWRlci1ib2R5IHRleHQtY2VudGVyXFxcIj4gPGRpdiBjbGFzcz1cXFwicm93IGp1c3RpZnktY29udGVudC1jZW50ZXJcXFwiPiA8ZGl2IGNsYXNzPVxcXCJjb2wtbGctNSBjb2wtbWQtNlxcXCI+IDxoMSBjbGFzcz1cXFwidGV4dC1ibGFjay01MFxcXCI+QmllbnZlbmlkb3MgYWwgUG9ydGFsIGRlIEZhY3R1cmFjacOzbiBFbGVjdHLDs25pY2EuPC9oMT4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJjb250YWluZXIgbXQtLTggcGItNVxcXCI+IDxkaXYgY2xhc3M9XFxcInJvdyBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyXFxcIj4gPGRpdiBjbGFzcz1cXFwiY29sLWxnLTUgY29sLW1kLTdcXFwiPiA8ZGl2IGNsYXNzPVxcXCJjYXJkIGJnLXNlY29uZGFyeSBzaGFkb3cgYm9yZGVyLTBcXFwiIGRpc2FibGVkPVxcXCJ0cnVlXFxcIj4gPGRpdiBjbGFzcz1cXFwiY2FyZC1oZWFkZXIgYmctdHJhbnNwYXJlbnQgcGItM1xcXCI+IDxkaXYgY2xhc3M9XFxcInRleHQtZGFyayB0ZXh0LWNlbnRlciBtdC0yIG1iLTFcXFwiPiA8aDM+SW5pY2lvIGRlIFNlc2nDs248L2gzPiA8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcImNhcmQtYm9keSBweC1sZy01IHB5LWxnLTVcXFwiPiA8ZGl2IGNsYXNzPVxcXCJ0ZXh0LWNlbnRlciB0ZXh0LWRhcmsgbWItNFxcXCI+IDxzbWFsbD4gSW5pY2llIFNlc2nDs24gY29uIHN1cyBjcmVkZW5jaWFsZXMuIDwvc21hbGw+IDwvZGl2PiA8Zm9ybSByb2xlPVxcXCJmb3JtXFxcIiAobmdTdWJtaXQpPVxcXCJsb2dpbigpXFxcIiBbZm9ybUdyb3VwXT1cXFwibG9naW5Gb3JtXFxcIj4gPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cCBtYi0zXFxcIj4gPGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXAgaW5wdXQtZ3JvdXAtYWx0ZXJuYXRpdmVcXFwiPiA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1ncm91cC1wcmVwZW5kXFxcIj4gPHNwYW4gY2xhc3M9XFxcImlucHV0LWdyb3VwLXRleHRcXFwiPiA8bWF0LWljb24gc3R5bGU9XFxcInBvc2l0aW9uOiByZWxhdGl2ZTt0b3A6IDJweFxcXCI+cGVyc29uX291dGxpbmU8L21hdC1pY29uPiA8L3NwYW4+IDwvZGl2PiA8aW5wdXQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgI2xvZ2luSW5wdXQgcGxhY2Vob2xkZXI9XFxcIk5vbWJyZSBkZSBVc3VhcmlvXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBpZD1cXFwidXNlcm5hbWVcXFwiIG5hbWU9XFxcInVzZXJuYW1lXFxcIiBhdXRvZm9jdXMgZm9ybUNvbnRyb2xOYW1lPVxcXCJub21iVXN1YXJpb1xcXCI+IDwvZGl2PiA8c3BhbiBjbGFzcz1cXFwiaW52YWxpZC1mZWVkYmFja1xcXCIgc3R5bGU9XFxcImRpc3BsYXk6IGJsb2NrO1xcXCIgcm9sZT1cXFwiYWxlcnRcXFwiPjxzdHJvbmc+e3sgaW1hZ2VuIH19PC9zdHJvbmc+PC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cFxcXCI+IDxkaXYgY2xhc3M9XFxcImlucHV0LWdyb3VwIGlucHV0LWdyb3VwLWFsdGVybmF0aXZlXFxcIj4gPGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXAtcHJlcGVuZFxcXCI+IDxzcGFuIGNsYXNzPVxcXCJpbnB1dC1ncm91cC10ZXh0XFxcIj4gPG1hdC1pY29uIHN0eWxlPVxcXCJwb3NpdGlvbjogcmVsYXRpdmU7dG9wOiAycHhcXFwiPnZwbl9rZXk8L21hdC1pY29uPiA8L3NwYW4+IDwvZGl2PiA8aW5wdXQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgbmFtZT1cXFwicGFzc3dvcmRcXFwiIHBsYWNlaG9sZGVyPVxcXCJDb250cmFzZcOxYVxcXCIgdHlwZT1cXFwicGFzc3dvcmRcXFwiIGZvcm1Db250cm9sTmFtZT1cXFwiY2xhdmVVc3VhcmlvXFxcIj4gPC9kaXY+IDxzcGFuIGNsYXNzPVxcXCJpbnZhbGlkLWZlZWRiYWNrXFxcIiBzdHlsZT1cXFwiZGlzcGxheTogYmxvY2s7XFxcIiByb2xlPVxcXCJhbGVydFxcXCI+PHN0cm9uZz48L3N0cm9uZz48L3NwYW4+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJjZW50ZXItYmxvY2sgdGV4dC1jZW50ZXJcXFwiIHN0eWxlPVxcXCJtaW4taGVpZ2h0OiAzMHB4O3Bvc2l0aW9uOiByZWxhdGl2ZTt0b3A6IDVweFxcXCI+IDxkaXYgKm5nSWY9XFxcImF1dGhlbnRpY2F0aW9uRXJyb3JcXFwiPiA8c3BhbiBjbGFzcz1cXFwidGV4dC1kYW5nZXJcXFwiPk5vbWJyZSBkZSB1c3VhcmlvIG8gY29udHJhc2XDsWEgaW5jb3JyZWN0b3MuPC9zcGFuPiA8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcImNlbnRlci1ibG9jayB0ZXh0LWNlbnRlclxcXCIgc3R5bGU9XFxcIm1pbi1oZWlnaHQ6IDQwcHg7cG9zaXRpb246IHJlbGF0aXZlO3RvcDogLTM1cHhcXFwiPiA8bWF0LXNwaW5uZXIgc3Ryb2tlV2lkdGg9XFxcIjJcXFwiIGRpYW1ldGVyPVxcXCI0MFxcXCIgc3R5bGU9XFxcInBvc2l0aW9uOiByZWxhdGl2ZTtsZWZ0OiA0NSVcXFwiICpuZ0lmPVxcXCJpc0xvYWRpbmdcXFwiPjwvbWF0LXNwaW5uZXI+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJ0ZXh0LWNlbnRlciB0YWJsZS1hY3Rpb25zLXRoZW1lXFxcIj4gPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBbY29sb3JdPVxcXCJhdXRoZW50aWNhdGlvbkVycm9yPyd3YXJuJzoncHJpbWFyeSdcXFwiIFtkaXNhYmxlZF09XFxcImxvZ2luRm9ybS5pbnZhbGlkXFxcIj4gPG1hdC1pY29uPmxvY2tfb3BlbjwvbWF0LWljb24+IEluaWNpYXIgU2VzacOzbiA8bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L21hdC1pY29uPiA8L2J1dHRvbj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcImNlbnRlci1ibG9jayB0ZXh0LWNlbnRlclxcXCIgc3R5bGU9XFxcIm1pbi1oZWlnaHQ6IDQwcHg7cG9zaXRpb246IHJlbGF0aXZlO1xcXCI+IDwvZGl2PiA8L2Zvcm0+IDwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwicm93IG10LTMgdGV4dC1jZW50ZXJcXFwiIHN0eWxlPVxcXCJtYXJnaW4tdG9wOiAtNzVweCAhaW1wb3J0YW50O3BhZGRpbmctbGVmdDogMzBweDtjb2xvcjogIzBhMGMwZDtcXFwiPiA8ZGl2IGNsYXNzPVxcXCJjb2wtNlxcXCI+IDxhIGNsYXNzPVxcXCJ0ZXh0LWRhcmtcXFwiPsK/T2x2aWTDsyBzdSBjb250cmFzZcOxYT88L2E+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+XCI7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/app/login/login.component.html\n");

/***/ })

})