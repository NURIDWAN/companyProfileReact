<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MenuItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:120'],
            'position' => ['required', Rule::in(['main', 'header', 'footer'])],
            'type' => ['required', Rule::in(['page', 'category', 'internal', 'external', 'dropdown'])],
            'page_id' => ['nullable', 'exists:pages,id'],
            'target' => ['nullable', 'string', 'max:255'],
            'parent_id' => ['nullable', 'exists:menu_items,id'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'parent_id' => $this->input('parent_id') === '' ? null : $this->input('parent_id'),
            'display_order' => $this->input('display_order') === '' ? null : $this->input('display_order'),
        ]);
    }
}
