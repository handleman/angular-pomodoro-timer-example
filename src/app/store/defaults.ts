import { COUNTDOWN_STATE } from './enums';

const INTERVAL = 2;

export const timerDefaults = {
    active: false,
    paused: false
};

export const countDownDefaults = {
    status: COUNTDOWN_STATE.RESET,
    minutes: INTERVAL,
    seconds: 0,
    interval: INTERVAL,
    rest: 1,
    restMode: false
};