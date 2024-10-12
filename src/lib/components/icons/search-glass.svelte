<script>
  export let size = '24';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size || $$props.width}
  height={size || $$props.height}
  viewBox="0 0 24 24"
  class={$$props.class}
  {...$$props}
>
  <path
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="1.5"
    d="m14 14l2.5 2.5m-.067 2.025a1.48 1.48 0 1 1 2.092-2.092l3.042 3.042a1.48 1.48 0 1 1-2.092 2.092zM16 9A7 7 0 1 0 2 9a7 7 0 0 0 14 0"
    color="currentColor"
  />
</svg>
