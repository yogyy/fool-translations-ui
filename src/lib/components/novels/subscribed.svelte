<script lang="ts">
  import { page } from '$app/stores';
  import type { FavoriteResponse, Subs } from '$lib/types';
  import { cn } from '$lib/utils';
  import { toast } from 'svelte-sonner';
  import Bell from '../icons/bell.svelte';
  import Favourite from '../icons/favourite.svelte';
  import { goto } from '$app/navigation';

  export let subscribed: Subs;
  let className: string = $$props.class;

  export { className as class };
  const { isFavorited, totalFavorites } = subscribed;

  $: favorited = isFavorited;
  $: totalfav = totalFavorites;

  const subscribe = async () => {
    await fetch(`/api/novel/subscribed?novelId=nvl_${$page.params.slug}`, { method: 'POST' }).then(
      async (res) => {
        if (res.status === 200) {
          const data: FavoriteResponse = await res.json();
          if (data.success && data.action === 'added') {
            totalfav += 1;
            favorited = true;
            toast('Favorited', { position: 'top-center' });
          } else if (data.success && data.action === 'deleted') {
            totalfav -= 1;
            favorited = false;
            toast('Unfavorited', { position: 'top-center' });
          }
        } else {
          toast.error(res.statusText, { position: 'top-center' });
          goto('/auth/login');
        }
      }
    );
  };
</script>

<div class={cn('z-10 flex-row items-center justify-center gap-x-1.5', className)}>
  <div class="flex flex-row items-center justify-center gap-x-1.5">
    <button class="flex flex-col items-center" type="button">
      <Bell size="22" />
      <span class="sr-only">notification</span>
      <p
        class="hidden text-center text-xs font-medium opacity-90 transition-colors duration-500 md:block">
        0
      </p>
    </button>
    <button
      class={cn(
        'flex cursor-pointer flex-col items-center transition-colors duration-150',
        favorited ? 'text-red-500' : ''
      )}
      on:click={subscribe}
      type="button"
      aria-label={favorited ? 'remove from favorites' : 'add to favorites'}>
      <Favourite
        size="22"
        class="transition-colors duration-500"
        fill={favorited ? '#ef4444' : 'none'} />
      <span class="sr-only">favourite</span>
      <p
        class="hidden text-center text-xs font-medium opacity-90 transition-colors duration-500 md:block">
        {totalfav}
      </p>
    </button>
  </div>
</div>
