<script lang="ts">
  import * as Accordion from '$lib/components/ui/accordion';
  import ArrowLeft_01 from '../icons/arrow-left-01.svelte';
  import ArrowRight_01 from '../icons/arrow-right-01.svelte';
  import * as Pagination from '$lib/components/ui/pagination/index.js';
  import type { Chapter } from '$lib/types';
  import { formatDate } from '$lib/helper';

  export let chapters: Omit<Chapter, 'content'>[];
  let currentPage = 1;

  $: perPage = 10;
  $: totalPages = Math.ceil(chapters.length / perPage);

  $: currentChapters = chapters.slice((currentPage - 1) * perPage, currentPage * perPage);
</script>

<div class="px-2 md:px-4">
  <Accordion.Root multiple>
    <Accordion.Item value="item-1">
      <Accordion.Trigger class="text-base duration-300 hover:no-underline lg:text-lg">
        <div class="flex flex-col items-start">
          <p class="text-base lg:text-lg">Premium</p>
          <span class="text-sm text-gray-400/80">?? Chapters</span>
        </div>
      </Accordion.Trigger>
      <Accordion.Content class="text-center text-rose-500">
        This feature will not be implemented. Please check other available features.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-2">
      <Accordion.Trigger class="duration-300 hover:no-underline" disabled={chapters.length === 0}>
        <div class="flex flex-col items-start">
          <p class="text-base lg:text-lg">Free</p>
          <span class="text-sm text-gray-400/80">{chapters.length} Chapters</span>
        </div>
      </Accordion.Trigger>
      <Accordion.Content>
        <ul class="space-y-2">
          {#each currentChapters as ch}
            <li
              class="flex items-center gap-3 border-t bg-background p-2 transition-colors duration-200 hover:bg-secondary hover:opacity-70">
              <a href={`/viewer/${ch.id.slice(3)}`}>
                <span class="shrink-0 text-sm text-gray-500">Chapter {ch.chapterNum}.</span>
                <p class="place-self-start text-pretty text-sm md:text-balance md:text-base">
                  {ch.title}
                </p>
                <time
                  class="ml-auto shrink-0 text-[13px] text-gray-500"
                  datetime={ch.createdAt.toString()}>
                  {formatDate(ch.createdAt)}
                </time>
              </a>
            </li>
          {/each}
        </ul>
        {#if chapters.length >= 10}
          <Pagination.Root count={chapters?.length} perPage={totalPages} let:pages>
            <Pagination.Content class="py-2">
              <Pagination.Item>
                <Pagination.PrevButton on:click={() => currentPage--}>
                  <ArrowLeft_01 class="h-4 w-4" />
                  <span class="hidden sm:block">Previous</span>
                </Pagination.PrevButton>
              </Pagination.Item>
              {#each pages as page (page.key)}
                {#if page.type === 'ellipsis'}
                  <Pagination.Item>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                {:else}
                  <Pagination.Item>
                    <Pagination.Link
                      class={currentPage === page.value ? 'bg-accent' : ''}
                      {page}
                      on:click={() => (currentPage = page.value)}
                      isActive={currentPage === page.value}>
                      {page.value}
                    </Pagination.Link>
                  </Pagination.Item>
                {/if}
              {/each}
              <Pagination.Item>
                <Pagination.NextButton on:click={() => currentPage++}>
                  <span class="hidden sm:block">Next</span>
                  <ArrowRight_01 class="h-4 w-4" />
                </Pagination.NextButton>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination.Root>
        {/if}
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</div>
