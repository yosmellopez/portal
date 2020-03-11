<?php

namespace App\Mail;

use App\Entity\Usuario;
use App\Entity\UsuarioToken;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RestorePassword extends Mailable
{
    use Queueable, SerializesModels;
    protected $usuario;
    protected $userEmail;
    protected $password;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Usuario $usuario, $userEmail, $password)
    {
        $this->usuario = $usuario;
        $this->userEmail = $userEmail;
        $this->password = $password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $nombreUsuario = $this->usuario->nombUsuario;
        return $this->from($this->userEmail, config("app.name"))
            ->subject('Reinicio de Contraseña')
            ->view('emails.restore-password')
            ->with([
                "nombreUsuario" => $nombreUsuario,
                "password" => $this->password,
                "direccion" => config('app.name')
            ]);
    }
}
