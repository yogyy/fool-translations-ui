<script lang="ts">
  import { page } from '$app/stores';
  import type { FavoriteResponse, Favs, Subs } from '$lib/types';
  import { cn } from '$lib/utils';
  import { toast } from 'svelte-sonner';
  import Bell from '../icons/bell.svelte';
  import Favourite from '../icons/favourite.svelte';
  import { goto } from '$app/navigation';

  interface Data {
    fav: Favs;
    ntf: Subs;
  }

  export let data: Data;
  let className: string = $$props.class;

  export { className as class };

  let favorited = data.fav.isFavorited;
  let totalfav = data.fav.total;
  let notified = data.ntf.isSubscribed;
  let totalntf = data.ntf.total;
  let isLoading = false;

  async function favorite() {
    isLoading = true;
    const res = await fetch(`/api/novel/subscribe/favorite?novelId=nvl_${$page.params.slug}`, {
      method: 'POST'
    });

    if (res.status === 200) {
      isLoading = false;
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

  async function notify() {
    isLoading = true;
    const res = await fetch(`/api/novel/subscribe/notify?novelId=nvl_${$page.params.slug}`, {
      method: 'POST'
    });

    if (res.status === 200) {
      isLoading = false;
      const data: FavoriteResponse = await res.json();
      if (data.success && data.action === 'added') {
        totalntf += 1;
        notified = true;
        toast('Subscribed', { position: 'top-center' });
      } else if (data.success && data.action === 'deleted') {
        totalntf -= 1;
        notified = false;
        toast('Unsubscribed', { position: 'top-center' });
      }
    } else {
      toast.error(res.statusText, { position: 'top-center' });
      goto('/auth/login');
    }
  }
</script>

<div class={cn('z-10 flex-row items-center justify-center', className)}>
  <div class="flex flex-row items-center justify-center gap-2">
    <button
      disabled={isLoading}
      on:click={notify}
      class={cn(
        'flex cursor-pointer flex-col items-center transition-colors duration-300 active:scale-110',
        notified ? 'text-[#eab308]' : ''
      )}
      title={notified ? 'Unsubscribe' : 'Subscribe'}
      aria-label={notified ? 'unsubscribed from this novel' : 'subscribed to this novel'}>
      <Bell class="transition-colors duration-300" size="22" />
      <p class="hidden text-center text-xs font-medium opacity-90 transition duration-300 md:block">
        {totalntf}
      </p>
    </button>
    <button
      class={cn(
        'flex cursor-pointer flex-col items-center transition-colors duration-300 active:scale-110',
        favorited ? 'text-[#ef4444]' : ''
      )}
      disabled={isLoading}
      on:click={favorite}
      type="button"
      title={favorited ? 'Unfavorite' : 'Favorite'}
      aria-label={favorited ? 'remove from favorites' : 'add to favorites'}>
      <Favourite size="22" class="transition-colors duration-300" />
      <p
        class="hidden text-center text-xs font-medium opacity-90 transition-colors duration-300 md:block">
        {totalfav}
      </p>
    </button>
  </div>
</div>
