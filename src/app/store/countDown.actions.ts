import { createAction, props } from '@ngrx/store';
import { COUNTDOWN_STATE } from './enums'

export const setStatus = createAction(
    '[CountDown] Status',
    props<{ payload: COUNTDOWN_STATE }>()
);

export const setMinutes = createAction(
    '[CountDown] Minutes',
    props<{ payload: number }>()
);

export const setSeconds = createAction(
    '[CountDown] Seconds',
    props<{ payload: number }>()
);

export const setInterval = createAction(
    '[CountDown] Interval',
    props<{ payload: number }>()
);

export const setRest = createAction(
    '[CountDown] Rest',
    props<{ payload: number }>()
);

export const setRestMode = createAction(
    '[CountDown] Rest',
    props<{ payload: boolean }>()
);


