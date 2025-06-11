<script lang="ts">
  import { setMode, userPrefersMode } from 'mode-watcher';
  import UserSystem from './icons/user-system.svelte';
  import Sun from './icons/sun.svelte';
  import Moon from './icons/moon.svelte';
  import type { Component } from 'svelte';

  type Mode = 'system' | 'light' | 'dark';
  const themes = [
    { mode: 'system', icon: UserSystem },
    { mode: 'light', icon: Sun },
    { mode: 'dark', icon: Moon }
  ] as { mode: Mode; icon: Component }[];
</script>

<div class="flex w-full items-center justify-between px-2 py-1.5">
  <span>Theme</span>
  <div class="theme_switcher flex items-center justify-center rounded-full border border-border/20">
    <span class="sr-only">select a display theme:</span>
    {#each themes as theme}
      <button
        type="button"
        title={theme.mode}
        on:click={() => setMode(theme.mode)}
        class:theme_active={userPrefersMode.current === theme.mode}>
        <svelte:component
          this={theme.icon}
          class="size-4"
          strokeWidth={userPrefersMode.current === theme.mode ? '2' : '1.5'} />
      </button>
    {/each}
  </div>
</div>

<style>
  .theme_switcher button {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 9999px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: hsl(var(--foreground) / 0.5);
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;

    &:not(.theme_active):hover {
      background-color: hsl(var(--accent) / 0.5);
    }
  }

  .theme_switcher .theme_active {
    box-shadow:
      0 0 0 1px hsl(var(--border) / 1),
      0 1px 2px 0 hsl(var(--border) / 1);
    color: hsl(var(--foreground) / 1);
    background: hsl(var(--background) / 1);
  }
</style>
