<script lang="ts">
  import { page } from '$app/stores';
  import type { FavoriteResponse, Favs, Subs } from '$lib/types';
  import { cn } from '$lib/utils';
  import { toast } from 'svelte-sonner';
  import Bell from '../icons/bell.svelte';
  import Favourite from '../icons/favourite.svelte';
  import { goto } from '$app/navigation';

  interface Data {
    favorited: Favs;
    subscribed: Subs;
  }

  export let data: Data;
  let className: string = $$props.class;

  export { className as class };
  const { is_subscribed, total_subscribe } = data.subscribed;
  const { is_favorited, total_favorite } = data.favorited;

  let favorited = is_favorited;
  let totalfav = total_favorite;
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
</script>

<div class={cn('z-10 flex-row items-center justify-center', className)}>
  <div class="flex flex-row items-center justify-center gap-2">
    <button
      on:click={notify}
      class="flex cursor-pointer flex-col items-center transition-colors duration-150"
      title="Subscribe">
      <Bell size="22" />
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
      disabled={isLoading}
      on:click={favorite}
      type="button"
      title={favorited ? 'Unfavorite' : 'Favorite'}
      aria-label={favorited ? 'remove from favorites' : 'add to favorites'}>
      <Favourite
        size="22"
        class="transition-colors duration-500"
        fill={favorited ? '#ef4444' : 'none'} />
      <p
        class="hidden text-center text-xs font-medium opacity-90 transition-colors duration-500 md:block">
        {totalfav}
      </p>
    </button>
  </div>
</div>
