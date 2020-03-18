<?php

namespace App\Mail;

use App\Entity\Usuario;
use App\Entity\UsuarioToken;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;
    protected $usuario;
    protected $userEmail;
    protected $usuarioToken;
    protected $cliente;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Usuario $usuario, UsuarioToken $usuarioToken, $userEmail)
    {
        $this->usuario = $usuario;
        $this->usuarioToken = $usuarioToken;
        $this->cliente = $usuario->cliente;
        $this->userEmail = $userEmail;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from($this->userEmail, config("app.mail_sender_name"))
            ->subject('Reinicio de Contraseña')
            ->view('emails.reset-password')
            ->with([
                "nombreUsuario" => $this->usuario->nombUsuario,
                "usuarioToken" => $this->usuarioToken->token,
                "direccion" => $this->cliente->direccionClient
            ]);
    }
}
