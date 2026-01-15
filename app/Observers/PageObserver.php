<?php

namespace App\Observers;

use App\Models\MenuItem;
use App\Models\Page;

class PageObserver
{
    /**
     * Handle the Page "created" event.
     */
    public function created(Page $page): void
    {
        // Nothing to do on create - menus are added manually
    }

    /**
     * Handle the Page "updated" event.
     * Sync menu items that reference this page.
     */
    public function updated(Page $page): void
    {
        // Check if title or slug was changed
        if ($page->isDirty(['title', 'slug', 'parent_id'])) {
            $this->syncMenuItems($page);
        }
    }

    /**
     * Handle the Page "deleted" event.
     * Update menu items that reference this page.
     */
    public function deleted(Page $page): void
    {
        // Set menu items to inactive when page is deleted (soft delete)
        MenuItem::where('page_id', $page->id)
            ->update([
                'is_active' => false,
            ]);
    }

    /**
     * Handle the Page "restored" event.
     */
    public function restored(Page $page): void
    {
        // Sync and reactivate menu items when page is restored
        $this->syncMenuItems($page);
        
        MenuItem::where('page_id', $page->id)
            ->update(['is_active' => true]);
    }

    /**
     * Handle the Page "force deleted" event.
     * Permanently remove menu items that reference this page.
     */
    public function forceDeleted(Page $page): void
    {
        // Delete all menu items referencing this page
        MenuItem::where('page_id', $page->id)->delete();
    }

    /**
     * Sync menu item title and target with page data.
     */
    private function syncMenuItems(Page $page): void
    {
        // Reload the page to get fresh full_path
        $page->refresh();

        // Update all menu items that reference this page
        MenuItem::where('page_id', $page->id)
            ->where('type', 'page')
            ->update([
                'title' => $page->title,
                'target' => '/' . ltrim($page->full_path, '/'),
            ]);

        // Also update menu items for child pages (their full_path changed too)
        $this->syncChildPages($page);
    }

    /**
     * Recursively sync child pages' menu items.
     */
    private function syncChildPages(Page $parentPage): void
    {
        $children = Page::where('parent_id', $parentPage->id)->get();

        foreach ($children as $child) {
            // Refresh to get updated full_path
            $child->refresh();

            MenuItem::where('page_id', $child->id)
                ->where('type', 'page')
                ->update([
                    'target' => '/' . ltrim($child->full_path, '/'),
                ]);

            // Recursively update grandchildren
            $this->syncChildPages($child);
        }
    }
}
