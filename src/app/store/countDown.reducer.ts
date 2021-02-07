import { Action, createReducer, on, State } from '@ngrx/store';
import { CountDown } from './types';
import { countDownDefaults } from './defaults';

import * as countDownActions from './countDown.actions';

const countDownReducer = createReducer(
    countDownDefaults,
    on(countDownActions.setStatus, (state, { payload }) => ({ ...state, status: payload })),
    on(countDownActions.setMinutes, (state, { payload }) => ({ ...state, minutes: payload })),
    on(countDownActions.setSeconds, (state, { payload }) => ({ ...state, seconds: payload })),
    on(countDownActions.setInterval, (state, { payload }) => ({ ...state, interval: payload })),
    on(countDownActions.setRest, (state, { payload }) => ({ ...state, rest: payload })),
    on(countDownActions.setRestMode, (state, { payload }) => ({ ...state, restMode: payload }))
);

export function reducer(state: CountDown | undefined, action: Action) {
    return countDownReducer(state, action);
};
