<tr class="tr-header">
    <td class="header">
        <a href="{{ $url }}">
            {{ $slot }}
            ![Some option text][logo]

            [logo]: {{asset('/content/img/cover.jpeg')}} "Logo"
        </a>
    </td>
</tr>
