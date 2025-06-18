<script lang="ts">
  import { Calendar } from '$lib/components/ui/calendar/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { cn } from '$lib/utils';
  import {
    CalendarDate,
    DateFormatter,
    getLocalTimeZone,
    parseDate,
    today
  } from '@internationalized/date';
  import { buttonVariants } from './ui/button';

  const df = new DateFormatter('en-US', {
    dateStyle: 'long'
  });
  let { date = $bindable() } = $props();

  let value = $state<CalendarDate>();
  $effect(() => {
    value = date ? parseDate(date) : undefined;
  });

  let placeholder = $state(today(getLocalTimeZone()));
</script>

<Popover.Root>
  <Popover.Trigger
    class={cn(
      buttonVariants({ variant: 'outline' }),
      'border-border w-full justify-start rounded-sm pl-4 text-left font-normal',
      !value && 'text-muted-foreground'
    )}>
    {value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      class="ml-auto size-4 opacity-50">
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M18 2v2M6 2v2m5.996 9h.008m-.008 4h.008m3.987-4H16m-8 0h.009M8 17h.009M3.5 8h17m-18 4.243c0-4.357 0-6.536 1.252-7.89C5.004 3 7.02 3 11.05 3h1.9c4.03 0 6.046 0 7.298 1.354C21.5 5.707 21.5 7.886 21.5 12.244v.513c0 4.357 0 6.536-1.252 7.89C18.996 22 16.98 22 12.95 22h-1.9c-4.03 0-6.046 0-7.298-1.354C2.5 19.293 2.5 17.114 2.5 12.756zM3 8h18"
        color="currentColor" />
    </svg>
  </Popover.Trigger>
  <Popover.Content class="bg-accent w-auto p-0" side="top">
    <Calendar
      type="single"
      bind:value
      bind:placeholder
      minValue={new CalendarDate(1900, 1, 1)}
      maxValue={today(getLocalTimeZone())}
      calendarLabel="Date of birth"
      initialFocus
      onValueChange={(v) => {
        if (v) {
          date = v.toString();
        } else {
          date = '';
        }
      }} />
  </Popover.Content>
</Popover.Root>
