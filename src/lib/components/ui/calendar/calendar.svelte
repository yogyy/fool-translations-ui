<script lang="ts">
  import { Calendar as CalendarPrimitive } from 'bits-ui';
  import * as Calendar from './index.js';
  import { cn } from '$lib/utils.js';

  type $$Props = CalendarPrimitive.Props;
  type $$Events = CalendarPrimitive.Events;

  export let value: $$Props['value'] = undefined;
  export let placeholder: $$Props['placeholder'] = undefined;
  export let weekdayFormat: $$Props['weekdayFormat'] = 'short';

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<CalendarPrimitive.Root
  bind:value
  bind:placeholder
  {weekdayFormat}
  class={cn('p-3', className)}
  {...$$restProps}
  on:keydown
  let:months
  let:weekdays>
  <Calendar.Header>
    <Calendar.PrevButton />
    <Calendar.Heading let:headingValue aria-hidden="false">
      <div class="relative flex w-20 justify-center gap-2">
        <p class="inline-block">{headingValue.split(' ')[0]}</p>
        <input
          type="number"
          value={placeholder?.year}
          maxlength="4"
          min="1990"
          class="w-12 bg-accent focus-visible:outline-none"
          name="year"
          on:change={(e) => {
            const year = parseInt(e.currentTarget.value) || value?.year;
            placeholder = placeholder?.set({ year });
          }} />
      </div>
    </Calendar.Heading>

    <Calendar.NextButton />
  </Calendar.Header>
  <Calendar.Months>
    {#each months as month}
      <Calendar.Grid>
        <Calendar.GridHead>
          <Calendar.GridRow class="flex">
            {#each weekdays as weekday}
              <Calendar.HeadCell>
                {weekday.slice(0, 2)}
              </Calendar.HeadCell>
            {/each}
          </Calendar.GridRow>
        </Calendar.GridHead>
        <Calendar.GridBody>
          {#each month.weeks as weekDates}
            <Calendar.GridRow class="mt-2 w-full">
              {#each weekDates as date}
                <Calendar.Cell {date}>
                  <Calendar.Day {date} month={month.value} />
                </Calendar.Cell>
              {/each}
            </Calendar.GridRow>
          {/each}
        </Calendar.GridBody>
      </Calendar.Grid>
    {/each}
  </Calendar.Months>
</CalendarPrimitive.Root>

<style scoped>
  input[type='number'] {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
</style>
