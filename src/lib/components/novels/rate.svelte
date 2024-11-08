<script lang="ts">
  import { cn } from '$lib/utils';
  import Star from '../icons/star.svelte';

  let userRate = 4;
  let className: string = $$props.class;

  export { className as class };
</script>

<div class={cn('mt-4', className)}>
  <div class="flex items-center justify-center">
    {#each [1, 2, 3, 4, 5] as rate}
      <button on:click={() => (userRate = rate)}>
        <Star
          class={userRate >= rate ? 'text-[gold]' : ''}
          fill={userRate >= rate ? 'gold' : 'none'} />
      </button>
    {/each}
  </div>
  <p class="mt-2 text-center font-medium opacity-85">Rate This Novel</p>
</div>
