<script>
  let { hasNotification = false, ...rest } = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...rest}
  ><g
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="1.5"
    color="currentColor">
    <path
      d="M12.5 3h-1C7.022 3 4.782 3 3.391 4.391S2 8.021 2 12.5c0 4.478 0 6.718 1.391 8.109S7.021 22 11.5 22c4.478 0 6.718 0 8.109-1.391S21 16.979 21 12.5v-1" />
    <path
      class:has-notification={hasNotification}
      d="M22 5.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0M7 11h4m-4 5h8" />
  </g>
</svg>

<style>
  .has-notification {
    fill: aqua;
  }
</style>
