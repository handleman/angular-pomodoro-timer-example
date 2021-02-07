import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CountDown } from '../../store/types';
import { setInterval, setRest, setMinutes } from '../../store/countDown.actions';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent {
  countDown$: Observable<CountDown>;

  constructor(private store: Store<{ countDown: CountDown }>) {
    this.countDown$ = store.select('countDown');

  }

  onIntervalChange(value): void {
    this.store.dispatch(setInterval({ payload: value }));

  }
  onRestChange(value): void {
    this.store.dispatch(setRest({ payload: value }));
  }

}
