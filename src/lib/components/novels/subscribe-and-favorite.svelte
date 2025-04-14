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

  let favorited = favorite.isFavorited;
  let totalfav = favorite.total;
  let notified = subscribe.isSubscribed;
  let totalntf = subscribe.total;
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
        totalfav += 1;
        favorited = true;
        toast('Favorited', { position: 'top-center' });
      } else if (data.success && data.action === 'removed') {
        totalfav -= 1;
        favorited = false;
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
        totalntf += 1;
        notified = true;
        toast('Subscribed', { position: 'top-center' });
      } else if (data.success && data.action === 'removed') {
        totalntf -= 1;
        notified = false;
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
        notified ? 'text-[#eab308]' : ''
      )}
      title={notified ? 'Unsubscribe' : 'Subscribe'}
      aria-label={notified ? 'unsubscribed from this novel' : 'subscribed to this novel'}>
      <Bell class="" size="22" />
      <p class="hidden text-center text-xs font-medium opacity-90 md:block">
        {totalntf}
      </p>
    </button>
    <button
      class={cn(
        'flex cursor-pointer flex-col items-center transition-colors duration-300 active:scale-110',
        favorited ? 'fill-none text-[#ef4444]' : 'fill-none'
      )}
      disabled={isLoading}
      on:click={favoriteNovel}
      type="button"
      title={favorited ? 'Unfavorite' : 'Favorite'}
      aria-label={favorited ? 'remove from favorites' : 'add to favorites'}>
      <Favourite size="22" class="stroke-red-600" />
      <p class="hidden text-center text-xs font-medium opacity-90 md:block">
        {totalfav}
      </p>
    </button>
  </div>
</div>
