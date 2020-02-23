@component('vendor.mail.markdown.message')
    # E-mail de bienvenida

    Hola estimado cliente, {{ $nombreCliente }}, bienvenido a **Programación y  más** !

    Usted ha recibido este correo debido a su compra en {{ config('app.name') }} y se le ha enviado el documento {{ $numSerie }}

    Espero que el material del sitio te sea de ayuda, y puedas mejorar tus habilidades en programación.

    Saludos, y que estés bien !
@endcomponent