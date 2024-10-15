<script>
  export let size = '24';
  export let strokeWidth = '1.5';
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size || $$props.width}
  height={size || $$props.height}
  viewBox="0 0 24 24"
  class={$$props.class}
  {...$$props}>
  <path
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width={strokeWidth}
    d="M17 12a5 5 0 1 1-10 0a5 5 0 0 1 10 0M12 2v1.5m0 17V22m7.07-2.929l-1.06-1.06M5.99 5.989L4.928 4.93M22 12h-1.5m-17 0H2m17.071-7.071l-1.06 1.06M5.99 18.011l-1.06 1.06"
    color="currentColor" />
</svg>
