import { createReducer, on } from '@ngrx/store';
import { incrementTotalCounters, decrementTotalCounters, resetTotalCounters } from './counter.actions';
import { CounterState, initialState } from './counter.state';

export const counterReducer = createReducer(
  initialState,
  on(incrementTotalCounters, (state) => ({
    ...state,
    totalCounters: state.totalCounters + 1,
  })),
  on(decrementTotalCounters, (state) => ({
    ...state,
    totalCounters: state.totalCounters - 1,
  })),
  on(resetTotalCounters, (state) => ({
    ...state,
    totalCounters: 0,
  }))
);
