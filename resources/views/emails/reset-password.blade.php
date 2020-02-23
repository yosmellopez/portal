@component('vendor.mail.markdown.message')
    # E-mail de bienvenida

    Hola estimado usuario, {{ $nombreUsuario }}!

    Usted ha recibido este correo debido a que ha solicitado cambiar su contraseña en {{ config('app.name') }}

    Saludos, y que estés bien !
@endcomponent