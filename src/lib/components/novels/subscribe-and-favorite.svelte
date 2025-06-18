<script lang="ts">
  import { page } from '$app/state';
  import type { MutateResponse, FavoriteData, SubscribeData } from '$lib/types';
  import { cn } from '$lib/utils';
  import { toast } from 'svelte-sonner';
  import Bell from '../icons/bell.svelte';
  import Favourite from '../icons/favourite.svelte';
  import { goto } from '$app/navigation';

  interface Props {
    favorite: FavoriteData;
    subscribe: SubscribeData;
    class?: string;
  }

  let { favorite, subscribe, class: className }: Props = $props();

  let isLoading = $state(false);
  let fav = $state(favorite);
  let sub = $state(subscribe);

  async function favoriteNovel() {
    isLoading = true;
    const res = await fetch(`/api/novel/${page.params.slug}/favorite`, {
      method: 'POST'
    });

    if (res.status === 200) {
      isLoading = false;
      const data: MutateResponse = await res.json();
      if (data.success && data.action === 'added') {
        fav.total += 1;
        fav.isFavorited = true;
        toast('Favorited', { position: 'top-center' });
      } else if (data.success && data.action === 'removed') {
        fav.total -= 1;
        fav.isFavorited = false;
        toast('Unfavorited', { position: 'top-center' });
      }
    } else {
      toast.error('Unauthorized', { position: 'top-center' });
      goto('/login');
    }
  }

  async function subscribeNovel() {
    isLoading = true;
    const res = await fetch(`/api/novel/${page.params.slug}/subscribe`, {
      method: 'POST'
    });

    if (res.status === 200) {
      isLoading = false;
      const data: MutateResponse = await res.json();
      if (data.success && data.action === 'added') {
        sub.total += 1;
        sub.isSubscribed = true;
        toast('Subscribed', { position: 'top-center' });
      } else if (data.success && data.action === 'removed') {
        sub.total -= 1;
        sub.isSubscribed = false;
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
      onclick={subscribeNovel}
      class={cn(
        'flex cursor-pointer flex-col items-center transition-colors duration-300 active:scale-110',
        sub.isSubscribed ? 'text-[#eab308]' : ''
      )}
      title={sub.isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      aria-label={sub.isSubscribed ? 'unsubscribed from this novel' : 'subscribed to this novel'}>
      <Bell class="size-[22px]" />
      <p class="hidden text-center text-xs font-medium opacity-90 md:block">
        {sub.total}
      </p>
    </button>
    <button
      class={cn(
        'flex cursor-pointer flex-col items-center transition-colors duration-300 active:scale-110',
        fav.isFavorited ? 'fill-none text-[#ef4444]' : 'fill-none'
      )}
      disabled={isLoading}
      onclick={favoriteNovel}
      type="button"
      title={fav.isFavorited ? 'Unfavorite' : 'Favorite'}
      aria-label={fav.isFavorited ? 'remove from favorites' : 'add to favorites'}>
      <Favourite class="size-[22px]" />
      <p class="hidden text-center text-xs font-medium opacity-90 md:block">
        {fav.total}
      </p>
    </button>
  </div>
</div>
