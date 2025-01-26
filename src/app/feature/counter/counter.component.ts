import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  incrementTotalCounters,
  decrementTotalCounters,
  resetTotalCounters,
} from '../../store/counter/counter.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  counters: number[] = [];

  constructor(private store: Store) {}

  addCounter() {
    this.counters.push(0);
    this.store.dispatch(incrementTotalCounters());
  }

  resetCounters() {
    this.counters = [];
    this.store.dispatch(resetTotalCounters());
  }

  deleteCounter(index: number) {
    this.counters.splice(index, 1);
    this.store.dispatch(decrementTotalCounters());
  }

  incrementCounter(index: number) {
    this.counters[index]++;
  }

  decrementCounter(index: number) {
    if (this.counters[index] > 0) {
      this.counters[index]--;
    }
  }
}
