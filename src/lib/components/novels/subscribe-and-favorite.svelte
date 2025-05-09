<script lang="ts">
  import { page } from '$app/stores';
  import type { MutateResponse, FavoriteData, SubscribeData } from '$lib/types';
  import { cn } from '$lib/utils';
  import { toast } from 'svelte-sonner';
  import Bell from '../icons/bell.svelte';
  import Favourite from '../icons/favourite.svelte';
  import { goto } from '$app/navigation';

  export let favorite: FavoriteData;
  export let subscribe: SubscribeData;
  let className: string = $$props.class;

  export { className as class };

  let isLoading = false;

  async function favoriteNovel() {
    isLoading = true;
    const res = await fetch(`/api/novel/${$page.params.slug}/favorite`, {
      method: 'POST'
    });

    if (res.status === 200) {
      isLoading = false;
      const data: MutateResponse = await res.json();
      if (data.success && data.action === 'added') {
        favorite.total += 1;
        favorite.isFavorited = true;
        toast('Favorited', { position: 'top-center' });
      } else if (data.success && data.action === 'removed') {
        favorite.total -= 1;
        favorite.isFavorited = false;
        toast('Unfavorited', { position: 'top-center' });
      }
    } else {
      toast.error('Unauthorized', { position: 'top-center' });
      goto('/login');
    }
  }

  async function subscribeNovel() {
    isLoading = true;
    const res = await fetch(`/api/novel/${$page.params.slug}/subscribe`, {
      method: 'POST'
    });

    if (res.status === 200) {
      isLoading = false;
      const data: MutateResponse = await res.json();
      if (data.success && data.action === 'added') {
        subscribe.total += 1;
        subscribe.isSubscribed = true;
        toast('Subscribed', { position: 'top-center' });
      } else if (data.success && data.action === 'removed') {
        subscribe.total -= 1;
        subscribe.isSubscribed = false;
        toast('Unsubscribed', { position: 'top-center' });
      }
    } else {
      toast.error('Unauthorized', { position: 'top-center' });
      goto('/login');
    }
  }
</script>

<div class={cn('z-10 flex-row items-center justify-center', className)}>
  <div class="flex flex-row items-center justify-center gap-2">
    <button
      disabled={isLoading}
      on:click={subscribeNovel}
      class={cn(
        'flex cursor-pointer flex-col items-center transition-colors duration-300 active:scale-110',
        subscribe.isSubscribed ? 'text-[#eab308]' : ''
      )}
      title={subscribe.isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      aria-label={subscribe.isSubscribed
        ? 'unsubscribed from this novel'
        : 'subscribed to this novel'}>
      <Bell class="" size="22" />
      <p class="hidden text-center text-xs font-medium opacity-90 md:block">
        {subscribe.total}
      </p>
    </button>
    <button
      class={cn(
        'flex cursor-pointer flex-col items-center transition-colors duration-300 active:scale-110',
        favorite.isFavorited ? 'fill-none text-[#ef4444]' : 'fill-none'
      )}
      disabled={isLoading}
      on:click={favoriteNovel}
      type="button"
      title={favorite.isFavorited ? 'Unfavorite' : 'Favorite'}
      aria-label={favorite.isFavorited ? 'remove from favorites' : 'add to favorites'}>
      <Favourite size="22" class="stroke-red-600" />
      <p class="hidden text-center text-xs font-medium opacity-90 md:block">
        {favorite.total}
      </p>
    </button>
  </div>
</div>
