<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class PageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $pageId = $this->route('page')?->id ?? null;
        $parentId = $this->input('parent_id');

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:160',
                Rule::unique('pages', 'slug')
                    ->ignore($pageId)
                    ->where(fn ($query) => $query->where('parent_id', $parentId)),
            ],
            'parent_id' => ['nullable', 'exists:pages,id'],
            'meta_title' => ['nullable', 'string', 'max:180'],
            'meta_description' => ['nullable', 'string'],
            'meta_keywords' => ['nullable', 'string'],
            'status' => ['nullable', Rule::in(['draft', 'published'])],
            'published_at' => ['nullable', 'date'],
            'display_order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['nullable'],
            'sections' => ['nullable', 'array'],
            'sections.*.id' => ['nullable', 'integer'],
            'sections.*.title' => ['nullable', 'string', 'max:255'],
            'sections.*.slug' => ['nullable', 'string', 'max:160'],
            'sections.*.content' => ['nullable', 'string'],
            'sections.*.display_order' => ['nullable', 'integer', 'min:0'],
            'sections.*.is_active' => ['nullable'],
        ];
    }

    protected function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $pageId = $this->route('page')?->id ?? null;
            $parentId = $this->input('parent_id');

            if ($pageId && $parentId && (int) $pageId === (int) $parentId) {
                $validator->errors()->add('parent_id', 'Halaman induk tidak boleh sama dengan halaman ini.');
            }
        });
    }

    protected function prepareForValidation(): void
    {
        // Handle sections as JSON string (from FormData multipart submission)
        $sections = $this->input('sections');
        if (is_string($sections)) {
            $decoded = json_decode($sections, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $sections = $decoded;
            }
        }

        $this->merge([
            'parent_id' => $this->input('parent_id') === '' ? null : $this->input('parent_id'),
            'display_order' => $this->input('display_order') === '' ? null : $this->input('display_order'),
            'slug' => $this->input('slug') ? trim($this->input('slug')) : null,
            'sections' => $sections,
        ]);
    }
}
