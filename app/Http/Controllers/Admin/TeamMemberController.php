<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Throwable;
use Inertia\Inertia;
use Inertia\Response;

class TeamMemberController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/team-members/Index', [
            'members' => TeamMember::query()->orderBy('display_order')->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/team-members/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $this->validatedData($request);
                TeamMember::create($data);
            });

            return redirect()->route('admin.team-members.index')->with('success', 'Anggota tim berhasil dibuat.');
        } catch (Throwable $e) {
            Log::error('Gagal membuat anggota tim', [
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal menyimpan anggota tim.'])->withInput();
        }
    }

    public function edit(TeamMember $teamMember): Response
    {
        return Inertia::render('admin/team-members/Form', [
            'member' => $teamMember,
        ]);
    }

    public function update(Request $request, TeamMember $teamMember): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $teamMember) {
                $data = $this->validatedData($request, $teamMember);
                $teamMember->update($data);
            });

            return redirect()->route('admin.team-members.index')->with('success', 'Anggota tim berhasil diperbarui.');
        } catch (Throwable $e) {
            Log::error('Gagal memperbarui anggota tim', [
                'team_member_id' => $teamMember->id,
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors(['general' => 'Gagal memperbarui anggota tim.'])->withInput();
        }
    }

    public function destroy(TeamMember $teamMember): RedirectResponse
    {
        $teamMember->delete();

        return redirect()->route('admin.team-members.index')->with('success', 'Anggota tim berhasil dihapus.');
    }

    private function validatedData(Request $request, ?TeamMember $member = null): array
    {
        $member = $member ?? $request->route('team_member');

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'photo' => ['nullable', 'string', 'max:255'],
            'email' => [
                'nullable',
                'email',
                'max:255',
                Rule::unique('team_members', 'email')->ignore($member?->id),
            ],
            'phone' => ['nullable', 'string', 'max:255'],
            'linkedin' => ['nullable', 'string', 'max:255'],
            'display_order' => ['nullable', 'integer', 'min:0', 'max:255'],
            'is_active' => ['nullable'],
            'bio' => ['nullable', 'string'],
        ]);

        $data['is_active'] = $request->boolean('is_active');

        return $data;
    }
}
