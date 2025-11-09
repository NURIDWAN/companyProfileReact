<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->string('status')->toString();

        $messages = ContactMessage::query()
            ->when($status, fn ($query, $status) => $query->where('status', $status))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/contact-messages/Index', [
            'messages' => $messages->through(fn (ContactMessage $message) => $this->transformMessage($message)),
            'filters' => [
                'status' => $status,
            ],
            'availableStatuses' => $this->statusOptions(),
        ]);
    }

    public function show(ContactMessage $contactMessage): Response
    {
        return Inertia::render('admin/contact-messages/Show', [
            'message' => $this->transformMessage($contactMessage),
            'availableStatuses' => $this->statusOptions(),
        ]);
    }

    public function update(Request $request, ContactMessage $contactMessage): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'string', 'in:new,in_progress,resolved,archived'],
            'notes' => ['nullable', 'string'],
        ]);

        $contactMessage->update([
            'status' => $data['status'],
            'notes' => $data['notes'] ?? null,
            'handled_at' => in_array($data['status'], ['resolved', 'archived'], true) ? Carbon::now() : null,
        ]);

        return back()->with('success', 'Status kontak diperbarui.');
    }

    public function destroy(ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->delete();

        return redirect()->route('admin.contact-messages.index')->with('success', 'Pesan kontak dihapus.');
    }

    private function transformMessage(ContactMessage $message): array
    {
        return [
            'id' => $message->id,
            'name' => $message->name,
            'email' => $message->email,
            'phone' => $message->phone,
            'subject' => $message->subject,
            'message' => $message->message,
            'status' => $message->status,
            'notes' => $message->notes,
            'handled_at' => $message->handled_at?->toIso8601String(),
            'created_at' => $message->created_at?->toIso8601String(),
        ];
    }

    private function statusOptions(): array
    {
        return [
            ['value' => 'new', 'label' => 'Baru'],
            ['value' => 'in_progress', 'label' => 'Diproses'],
            ['value' => 'resolved', 'label' => 'Selesai'],
            ['value' => 'archived', 'label' => 'Arsip'],
        ];
    }
}
