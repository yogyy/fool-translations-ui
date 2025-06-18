<script lang="ts">
  import * as Accordion from '$lib/components/ui/accordion';
  import { formatDate } from '$lib/helper';
  import type { NovelChapters } from '$lib/types';

  const { chapters }: { chapters: NovelChapters } = $props();
</script>

<Accordion.Root type="multiple">
  <Accordion.Item value="item-1">
    <Accordion.Trigger class="px-4 duration-300 hover:no-underline">
      <div class="flex flex-col items-start">
        <p class="text-base lg:text-lg">Premium</p>
        <span class="text-foreground/60 text-sm">?? Chapters</span>
      </div>
    </Accordion.Trigger>
    <Accordion.Content class="text-destructive text-center text-balance">
      This feature will not be implemented. Please check other available features.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger class="px-4 duration-300 hover:no-underline">
      <div class="flex flex-col items-start">
        <p class="text-base lg:text-lg">Free</p>
        <span class="text-foreground/60 text-sm">{chapters.length} Chapters</span>
      </div>
    </Accordion.Trigger>
    <Accordion.Content>
      {#if chapters.length === 0}
        <p class="text-destructive text-center text-balance">
          No chapters available at this time. Please check back later.
        </p>
      {:else}
        <ul class="px-2">
          {#each chapters as ch}
            <li
              class="group bg-background hover:bg-secondary relative flex items-center gap-3 border-t transition duration-300 hover:opacity-70">
              <a href={`/viewer/${ch.id.slice(3)}`} class="w-full p-2 outline-offset-0">
                <p
                  class="text-foreground/80 place-self-start text-sm text-pretty capitalize md:text-base md:text-balance">
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
