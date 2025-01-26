import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { CounterState } from '../../store/counter/counter.state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  totalCounters$: Observable<number> | undefined;

  constructor(private store: Store<{ counter: CounterState }>) {
    this.totalCounters$ = store.select(state => state.counter?.totalCounters ?? 0);
  }
}
