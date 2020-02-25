@component('vendor.mail.markdown.message')
    # E-mail de bienvenida

    Hola estimado usuario, {{ $nombreUsuario }}!

    Usted ha recibido este correo debido a que ha solicitado cambiar su contraseña en {{ config('app.name') }}.

    Usted puede cambiar la contraseña accediendo click
    <a href="{{config('app.url')}}reset/finish?token={{$usuarioToken}}">Aqui</a>

    This is your logo
    ![Some option text][logo]

    [logo]: {{asset('/content/img/cover.jpeg')}} "Logo"

    <p>
        <img src="https://portalventura.herokuapp.com/content/9db278d630f5fabd8e7ba16c2e329a3a.png" data-auto-embed="attachment">
    </p>

    <tr>
        <td class="header">
            <a href="{{ $url }}">
                {{ Illuminate\Mail\Markdown::parse($slot) }}
            </a>
        </td>
    </tr>

    Saludos, y que estés bien !
@endcomponent

{{--@component('mail::message')--}}
{{--    # Order Shipped--}}

{{--    Your order has been shipped!--}}

{{--    @component('mail::button', ['url' => $url])--}}
{{--        View Order--}}
{{--    @endcomponent--}}

{{--    Purchased product:--}}

{{--    ![product](https://domain.com/products/product-1.png)--}}

{{--    Thanks,<br>--}}
{{--    {{ config('app.name') }}--}}
{{--@endcomponent--}}