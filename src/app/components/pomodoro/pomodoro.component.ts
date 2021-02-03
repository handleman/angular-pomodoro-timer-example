import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CountDown, Timer } from '../../store/types';
import { COUNTDOWN_STATE } from '../../store/enums';

import { setSeconds, setMinutes, setRestMode, setStatus } from '../../store/countDown.actions'
import { reset } from '../../store/timer.actions'

// todo: rewrite to selectors

enum CSS_CLASSES {
  ACTIVE = 'active',
  PAUSED = 'paused',
  READY = 'ready',
  RESTING = 'resting'
}
const DELAY = 60;
const TICK = 1000;
let tickInterval = null;

const interpolateTimerToCountdownState: (timer: Timer) => COUNTDOWN_STATE = (timer) => {
  if (timer.active && !timer.paused) {
    return COUNTDOWN_STATE.ACTIVE;
  }
  if (timer.active && timer.paused) {
    return COUNTDOWN_STATE.PAUSED;
  }
  if (!timer.active && !timer.paused) {
    return COUNTDOWN_STATE.RESET;
  }
};
@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss']
})
export class PomodoroComponent implements OnInit {
  timer$: Observable<Timer>;
  countDown$: Observable<CountDown>;
  countDown: null | CountDown;


  constructor(private store: Store<{ timer: Timer, countDown: CountDown }>) {
    this.timer$ = store.select('timer');
    this.countDown$ = store.select('countDown');
  }

  ngOnInit(): void {
    this.countDown$.subscribe(data => {

      if (this.countDown.interval !== data.interval || this.countDown.rest !== data.rest) {
        this.resetCountDown();
        this.resetTimer();
      }

      this.countDown = data;

    })
    this.timer$.subscribe(data => {
      const derivedState = interpolateTimerToCountdownState(data);
      const shouldSkip = (derivedState !== COUNTDOWN_STATE.ACTIVE && derivedState === this.countDown.status)

      if (shouldSkip) return;

      this.store.dispatch(setStatus({ payload: derivedState }));

      switch (derivedState) {
        case COUNTDOWN_STATE.ACTIVE:
          this.startCountDown();
          break;
        case COUNTDOWN_STATE.PAUSED:
          this.stopCountDown();
          break;
        case COUNTDOWN_STATE.RESET:
          this.resetCountDown();
          break;
      }

    });
  }
  startCountDown(): void {
    console.log('start timer');
    const tickCallback: () => void = () => {
      const isSecondsOut = (this.countDown.seconds === 0);
      const isIntervalOut = (this.countDown.minutes === 0 && this.countDown.seconds === 1);

      if (isSecondsOut) {
        this.store.dispatch(setSeconds({ payload: DELAY - 1 }));
        this.store.dispatch(setMinutes({ payload: this.countDown.minutes - 1 }));
        return;
      }
      if (isIntervalOut) {
        this.toggleCountDown();
        return;
      }
      this.store.dispatch(setSeconds({ payload: this.countDown.seconds - 1 }));
    }
    tickInterval = setInterval(tickCallback, TICK)
  }
  stopCountDown(): void {
    console.log('stop timer');
    clearInterval(tickInterval);
  }
  toggleCountDown(): void {
    console.log('toggleCountdown');
    if (!this.countDown.restMode) {
      this.store.dispatch(setMinutes({ payload: this.countDown.rest }));
      this.store.dispatch(setSeconds({ payload: 0 }));
      this.store.dispatch(setRestMode({ payload: true }));
      alert('You need to get some rest');

    } else {
      this.store.dispatch(setMinutes({ payload: this.countDown.interval }));
      this.store.dispatch(setSeconds({ payload: 0 }));
      this.store.dispatch(setRestMode({ payload: false }));
      alert('You should get back to work');
    }

  }
  resetCountDown(): void {
    console.log('reset countdown');
    this.store.dispatch(setMinutes({ payload: this.countDown.interval }));
    this.store.dispatch(setSeconds({ payload: 0 }));
    this.store.dispatch(setRestMode({ payload: false }));
    this.store.dispatch(setStatus({ payload: COUNTDOWN_STATE.RESET }));
    if (tickInterval) {
      clearInterval(tickInterval);
    }
  }
  resetTimer(): void {
    this.store.dispatch(reset());
  }
  getCssClasses(timer: Timer): CSS_CLASSES {
    let result = CSS_CLASSES.ACTIVE;
    const derivedState = interpolateTimerToCountdownState(timer)

    switch (derivedState) {
      case COUNTDOWN_STATE.RESET:
        result = CSS_CLASSES.READY
        break;
      case COUNTDOWN_STATE.PAUSED:
        result = CSS_CLASSES.PAUSED
        break;
    }

    return result;
  }

}
