@component('vendor.mail.markdown.message')
    # E-mail de bienvenida

    Hola estimado usuario, {{ $nombreUsuario }}!

    Usted ha recibido este correo debido a que ha solicitado cambiar su contraseña en {{ config('app.name') }}.

    Usted puede cambiar la contraseña accediendo click
    <a href="{{config('app.url')}}account/reset/finish?token={{$usuarioToken}}">Aqui</a>

    This is your logo
    ![Some option text][logo]

    [logo]: {{asset('/content/img/cover.jpeg')}} "Logo"

    Saludos, y que estés bien !
@endcomponent