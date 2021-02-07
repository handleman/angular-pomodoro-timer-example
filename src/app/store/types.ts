import { COUNTDOWN_STATE } from './enums'

export type Timer = {
    active: boolean,
    paused: boolean
};

export type CountDown = {
    status: COUNTDOWN_STATE,
    minutes: number,
    seconds: number,
    interval: number,
    rest: number,
    restMode: boolean
};
