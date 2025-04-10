<script lang="ts">
  export let title;
  export let image;
  export let id: string;
</script>

<a
  data-sveltekit-preload-data="tap"
  href={`/novels/${id.slice(4)}`}
  class="card aspect-[2/3] hover:scale-105">
  <img
    src={image}
    alt={`${title} Cover`}
    class="h-full w-full rounded-lg"
    style="object-fit: cover; max-width: 400px; max-height: 600px; aspect-ratio: 0.6666666666666666; width: 100%;" />
  <div class="card-footer rounded-b-lg">
    <h3 class="text-lg font-semibold leading-tight">
      {title}
    </h3>
  </div>
</a>

<style>
  .card {
    border-radius: 0;
    background-color: transparent;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
      var(--tw-shadow);
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
      var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width))
      var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  .card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px;
    background-color: #000000b3;
    color: #fff;
    font-weight: 700;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card:hover .card-footer {
    opacity: 100;
  }
</style>
