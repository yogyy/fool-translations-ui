<script lang="ts">
  import * as Menubar from '$lib/components/ui/menubar';
  import { formatDate } from '$lib/helper';
  import { cn } from '$lib/utils';
  import type { Notification } from '$lib/types';
  import { toast } from 'svelte-sonner';

  export let chapter: Notification;

  let notificationStatus = chapter.isRead;
  let deleted: boolean | null = null;

  const toggleNotificationReadStatus = async (id: string) => {
    const res = await fetch('/api/notification', {
      method: 'PATCH',
      body: JSON.stringify({ id })
    });

    if (res.ok) {
      if (notificationStatus) {
        notificationStatus = false;
        toast('Notification marked as unread', { position: 'top-center' });
      } else {
        notificationStatus = true;
        toast('Notification marked as read', { position: 'top-center', class: 'text-red-500' });
      }
    }
  };

  const deleteNotification = async (id: string) => {
    const res = await fetch('/api/notification', {
      method: 'DELETE',
      body: JSON.stringify({ id })
    });

    if (res.ok) {
      deleted = true; // or do invalidateAll()
      toast('Notification deleted', { position: 'top-center', class: 'text-red-500' });
    }
  };
</script>

{#if !deleted}
  <div class={cn('relative flex rounded-lg', notificationStatus ? '' : 'bg-cyan-900/20')}>
    <a
      href={`/novels/${chapter.novel.id.slice(4)}`}
      on:click={() => console.error('anchor onclick')}
      class="relative"
      data-sveltekit-preload-data="off">
      <div class="flex flex-col gap-y-2">
        <div class={cn('flex gap-x-2 rounded-lg')}>
          <img
            src={chapter.novel.cover}
            alt={chapter.novel.title}
            class="aspect-[2/3] h-20 rounded-lg" />
          <div class="flex w-full flex-col justify-between text-clip text-start">
            <p class="text-sm text-foreground/75 md:text-base">
              <span class="font-medium text-foreground">a New Chapter</span> of
              <span class="font-medium text-cyan-400">{chapter.novel.title}</span> has been released
            </p>
            <div class="flex items-center justify-start">
              <span class="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              <p class="whitespace-nowrap text-xs text-foreground/60">
                <time
                  title={new Date(chapter.createdAt).toLocaleDateString()}
                  datetime={new Date(chapter.createdAt).toISOString()}>
                  {formatDate(chapter.createdAt)}
                </time>
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
    <Menubar.Root class="absolute right-0 top-0 h-auto space-x-0 border-none bg-transparent p-0">
      <Menubar.Menu>
        <Menubar.Trigger
          class="inline-flex h-8 w-8 cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-0 py-0 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-transparent focus-visible:text-current focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            class="text-muted-foreground">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              ><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle
                cx="5"
                cy="12"
                r="1" /></g>
          </svg>
          <span class="sr-only">notification menu</span>
        </Menubar.Trigger>
        <Menubar.Content align="end" class="bg-background text-muted-foreground">
          <Menubar.Item
            class="flex cursor-pointer gap-1"
            on:click={() => deleteNotification(chapter.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              ><path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6" /></svg>
            <span>Delete this notification</span>
          </Menubar.Item>
          <Menubar.Item
            class="flex cursor-pointer gap-1"
            on:click={() => toggleNotificationReadStatus(chapter.id)}>
            {#if chapter.isRead}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 6L9 17l-5-5" /></svg>
              <span>Mark as unread</span>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                ><path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 6L7 17l-5-5m20-2l-7.5 7.5L13 16" /></svg>
              <span>Mark as read</span>
            {/if}
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  </div>
{/if}
