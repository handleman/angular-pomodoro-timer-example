import { createAction } from '@ngrx/store';

export const setActive = createAction('[Timer] Active');

export const setOnPause = createAction('[Timer] Paused');

export const reset = createAction('[Timer] Reseted');
