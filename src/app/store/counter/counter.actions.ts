import { createAction, props } from '@ngrx/store';

export const incrementTotalCounters = createAction(
  '[Counter] Increment Total Counters'
);

export const decrementTotalCounters = createAction(
  '[Counter] Decrement Total Counters'
);

export const resetTotalCounters = createAction(
  '[Counter] Reset Total Counters'
);
