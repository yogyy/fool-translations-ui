<script lang="ts">
  import * as Accordion from '$lib/components/ui/accordion';
  import { formatDate } from '$lib/helper';
  import type { NovelChapters } from '$lib/types';

  const { chapters } = $props<{ chapters: NovelChapters }>();
</script>

<div class="px-4">
  <Accordion.Root multiple>
    <Accordion.Item value="item-1">
      <Accordion.Trigger class="text-base duration-300 hover:no-underline lg:text-lg">
        <div class="flex flex-col items-start">
          <p class="text-base lg:text-lg">Premium</p>
          <span class="text-sm text-gray-400/80">?? Chapters</span>
        </div>
      </Accordion.Trigger>
      <Accordion.Content class="text-balance text-center text-rose-500">
        This feature will not be implemented. Please check other available features.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-2">
      <Accordion.Trigger class="duration-300 hover:no-underline">
        <div class="flex flex-col items-start">
          <p class="text-base lg:text-lg">Free</p>
          <span class="text-sm text-gray-400/80">{chapters.length} Chapters</span>
        </div>
      </Accordion.Trigger>
      <Accordion.Content>
        {#if chapters.length === 0}
          <p class="text-balance text-center text-rose-500">
            No chapters available at this time. Please check back later.
          </p>
        {:else}
          <ul class="space-y-2">
            {#each chapters as ch}
              <li
                class="group relative flex items-center gap-3 border-t bg-background transition-colors duration-200 hover:bg-secondary hover:opacity-70">
                <a href={`/viewer/${ch.id.slice(3)}`} class="w-full p-2 outline-offset-0">
                  <p
                    class="place-self-start text-pretty text-sm capitalize text-foreground/80 md:text-balance md:text-base">
                    Chapter {ch.chapterNum}.
                    {ch.title}
                  </p>
                  <time
                    class="ml-auto shrink-0 text-[13px] text-gray-500"
                    datetime={ch.createdAt!.toString()}>
                    {formatDate(new Date(ch.createdAt!))}
                  </time>
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</div>
