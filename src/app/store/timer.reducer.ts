import { Action, createReducer, on } from '@ngrx/store';
import { Timer } from './types';
import { timerDefaults } from './defaults';

import * as timerActions from './timer.actions';

const timerReducer = createReducer(
    timerDefaults,
    on(timerActions.setActive, state => ({ ...state, active: true, paused: false })),
    on(timerActions.setOnPause, state => ({ ...state, active: false, paused: true }))
);

export function reducer(state: Timer, action: Action) {
    return timerReducer(state, action);
};