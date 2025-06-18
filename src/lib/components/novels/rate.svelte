<script lang="ts">
  import { page } from '$app/state';
  import type { RatingData } from '$lib/types';
  import { cn } from '$lib/utils';
  import { toast } from 'svelte-sonner';
  import Star from '../icons/star.svelte';
  import { goto } from '$app/navigation';

  interface Props {
    data: RatingData;
    class?: string;
  }

  let { data, class: className }: Props = $props();

  let userRate = $state(0);
  async function addRating(rate: number) {
    if (userRate === rate) return;
    const novelId = page.params.slug;
    const res = await fetch(`/api/novel/${novelId}/rating`, {
      method: 'POST',
      body: JSON.stringify({ rating: rate })
    });

    if (res.ok) {
      userRate = rate;
      toast('Rating Updated', { position: 'top-center', id: page.params.slug });
    } else {
      toast.error('Unauthorized', { position: 'top-center' });
      goto('/login');
    }
  }

  if (data?.isRated) {
    userRate = data.rating;
  }
</script>

<div class={cn('mt-4', className)}>
  <div class="flex items-center justify-center">
    {#each [1, 2, 3, 4, 5] as rate}
      <button type="button" aria-label={`rate ${rate} star`} onclick={() => addRating(rate)}>
        <Star class={userRate >= rate ? 'fill-[gold] text-[gold]' : 'fill-none'} />
      </button>
    {/each}
  </div>
  <p class="mt-2 text-center font-medium opacity-85">Rate This Novel</p>
</div>
