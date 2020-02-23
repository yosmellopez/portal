<?php

namespace App\Mail;

use App\Entity\Usuario;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;
    protected $usuario;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Usuario $usuario)
    {
        $this->usuario = $usuario;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('ylopez@vsperu.com', 'Portal de Facturación Electrónica')
            ->subject('Reinicio de Contraseña')
            ->markdown('emails.reset-password')
            ->with([
                "nombreUsuario" => $this->usuario->nombUsuario,
            ]);
    }
}
