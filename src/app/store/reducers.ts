import { Action } from '@ngrx/store';
import { Timer } from './types';
import { timerDefaults } from './defaults';
import { COUNTDOWN_STATE } from './enums'

export function timerReducer(state: Timer = timerDefaults, action: Action) {
    console.log(action.type, state)

}