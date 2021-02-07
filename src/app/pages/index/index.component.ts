import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Timer, CountDown } from '../../store/types';

import { setActive, setOnPause, reset } from '../../store/timer.actions'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  timer$: Observable<Timer>;
  countDown$: Observable<CountDown>;

  isTimerReadyForUse: boolean = false;
  isTimerInUse: boolean = false;
  isTimerOnPause: boolean = false;

  constructor(private store: Store<{ timer: Timer, countDown: CountDown }>) {
    this.timer$ = store.select('timer');
    this.countDown$ = store.select('countDown');
  }

  ngOnInit(): void {
    this.timer$.subscribe((data) => {
      const { active, paused } = data;
      this.isTimerReadyForUse = (!active && !paused);
      this.isTimerInUse = (active && !paused);
      this.isTimerOnPause = (active && paused);
    }); 
  }

  handleStartTimer(): void {
    this.store.dispatch(setActive());
  }
  handlePauseTimer(): void {
    this.store.dispatch(setOnPause());
  }
  handleResetTimer(): void {
    this.store.dispatch(reset());
  }

}