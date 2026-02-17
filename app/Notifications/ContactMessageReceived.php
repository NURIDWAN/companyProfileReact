<?php

namespace App\Notifications;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContactMessageReceived extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(protected ContactMessage $message) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Pesan Kontak Baru dari '.$this->message->name)
            ->greeting('Halo '.($notifiable->name ?? 'Admin').',')
            ->line('Anda menerima pesan baru dari formulir kontak:')
            ->line('Nama: '.$this->message->name)
            ->line('Email: '.$this->message->email)
            ->when($this->message->phone, fn (MailMessage $mail) => $mail->line('Telepon: '.$this->message->phone))
            ->when($this->message->subject, fn (MailMessage $mail) => $mail->line('Subjek: '.$this->message->subject))
            ->line('Pesan:')
            ->line($this->message->message)
            ->action('Kelola Pesan', route('admin.contact-messages.show', $this->message))
            ->line('Terima kasih telah menjaga komunikasi dengan calon klien.');
    }
}
