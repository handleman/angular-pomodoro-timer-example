import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CountDown } from '../../store/types';
import { setInterval, setRest } from '../../store/countDown.actions';

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
    console.log('interval: ', value);
    this.store.dispatch(setInterval({ payload: value }));

  }
  onRestChange(value): void {
    console.log('rest: ', value);
    this.store.dispatch(setRest({ payload: value }));
  }

}
