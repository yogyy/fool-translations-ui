<script>
  import BarMenu from './icons/menu.svelte';
  import Calendar from './icons/calendar.svelte';
  import Comment from './icons/comment.svelte';
  import * as Menubar from '$lib/components/ui/menubar';
  import DarkTheme from './dark-theme.svelte';
  import SearchBar from './search-bar.svelte';
  const routes = [{ name: 'novels' }, { name: 'library' }, { name: 'store' }, { name: 'admin' }];
</script>

<div class="fixed top-0 z-50 w-dvw">
  <div class="transform-gpu backdrop-blur-sm transition-transform duration-300">
    <header class="sticky top-0 z-50 w-full bg-background/80">
      <div class="container flex h-14 items-center px-2">
        <div class="hidden md:flex">
          <nav class="mt-2 flex h-full items-center gap-6">
            {#each routes as route}
              <a
                href={`/${route.name}`}
                class="text-base font-medium capitalize transition-colors duration-200 hover:text-accent"
                >{route.name}</a>
            {/each}
          </nav>
        </div>
        <div class="mt-2 flex flex-1 items-center justify-end">
          <div class="search-input flex gap-1">
            <SearchBar />
            <a
              href="/comment"
              class="inline-flex h-auto w-8 items-center justify-center whitespace-nowrap rounded-md px-0 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <Comment size="20" />
            </a>
            <a
              href="/comment"
              class="inline-flex h-auto w-8 items-center justify-center whitespace-nowrap rounded-md px-0 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <Calendar size="20" />
            </a>

            <Menubar.Root class="h-auto space-x-0 border-none bg-transparent p-0">
              <Menubar.Menu>
                <Menubar.Trigger
                  class="inline-flex h-8 w-8 cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-0 py-0 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-transparent focus-visible:text-current focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <BarMenu size="20" />
                </Menubar.Trigger>
                <Menubar.Content align="end" class="border-border/20">
                  <Menubar.Item asChild>
                    <div class="flex items-center gap-2 text-sm">
                      <DarkTheme />
                    </div>
                  </Menubar.Item>
                  <Menubar.Item class="cursor-pointer">Login</Menubar.Item>
                </Menubar.Content>
              </Menubar.Menu>
            </Menubar.Root>
          </div>
        </div>
      </div>
    </header>
  </div>
</div>
