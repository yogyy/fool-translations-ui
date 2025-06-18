<script lang="ts">
  import * as Menubar from '$lib/components/ui/menubar';
  import { formatDate } from '$lib/helper';
  import { cn } from '$lib/utils';
  import { toast } from 'svelte-sonner';
  import type { Notification } from '$lib/server/db/schema/notification.schema';
  import type { Novel } from '$lib/server/db/schema/novel.schema';

  import Check from './icons/check.svelte';
  import CheckCheck from './icons/check-check.svelte';
  import Trash_2 from './icons/trash-2.svelte';
  import Ellipsis from './icons/ellipsis.svelte';

  interface Props {
    chapter: Omit<Notification, 'novelId'> & {
      novel: Pick<Novel, 'id' | 'title' | 'cover'>;
    };
  }

  let { chapter }: Props = $props();

  let notificationStatus = $state(chapter.isRead);
  let deleted = $state<boolean | null>(null);

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
        toast('Notification marked as read', {
          position: 'top-center'
        });
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
    } else {
      toast.error('Error occured when deleting notification', {
        position: 'top-center'
      });
    }
  };
</script>

{#if !deleted}
  <div class={cn('relative flex rounded-lg', notificationStatus ? '' : 'bg-cyan-900/20')}>
    <a
      href={`/novels/${chapter.novel.id.slice(4)}`}
      class="relative"
      data-sveltekit-preload-data="off">
      <div class="flex flex-col gap-y-2">
        <div class="flex gap-x-2 rounded-lg">
          <img
            src={chapter.novel.cover}
            alt={chapter.novel.title}
            class="aspect-[2/3] h-20 rounded-lg" />
          <div class="flex w-full flex-col justify-between pr-4 pl-1 text-start text-clip">
            <p class="text-foreground/75 text-sm text-pretty md:text-base">
              <span class="text-foreground font-medium">a New Chapter</span> of
              <span class="font-medium text-cyan-400">{chapter.novel.title}</span> has been released
            </p>
            <div class="flex items-center justify-start">
              <span class="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              <p class="text-foreground/60 text-xs whitespace-nowrap">
                <time
                  title="new chapter notification"
                  datetime={new Date(chapter.createdAt!).toISOString()}>
                  {formatDate(new Date(chapter.createdAt!))}
                </time>
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
    <Menubar.Root class="absolute top-0 right-0 h-auto space-x-0 border-none bg-transparent p-0">
      <Menubar.Menu>
        <Menubar.Trigger
          class="hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md px-0 py-0 text-xs font-medium whitespace-nowrap focus:bg-transparent focus-visible:text-current focus-visible:ring-1 focus-visible:outline-hidden data-[state=open]:bg-transparent">
          <Ellipsis class="size-5" />
          <span class="sr-only">notification menu</span>
        </Menubar.Trigger>
        <Menubar.Content align="end" class="bg-background text-muted-foreground">
          <Menubar.Item onclick={() => deleteNotification(chapter.id)}>
            <div class="flex cursor-pointer gap-1 text-rose-400">
              <Trash_2 class="size-5" />
              <span>Delete this notification</span>
            </div>
          </Menubar.Item>
          <Menubar.Item onclick={() => toggleNotificationReadStatus(chapter.id)}>
            {#if notificationStatus}
              <p class="flex cursor-pointer gap-1 text-sky-400">
                <Check class="size-5" />
                <span>Mark as unread</span>
              </p>
            {:else}
              <p class="flex cursor-pointer gap-1 text-emerald-400">
                <CheckCheck class="size-5" />
                <span>Mark as read</span>
              </p>
            {/if}
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  </div>
{/if}
