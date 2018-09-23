import { fromEvent, interval, merge } from 'rxjs';
import { buffer, bufferTime , map, debounceTime, filter } from 'rxjs/operators'

const clickbox = document.getElementById('clickbox');
const message = document.getElementById('message');

const CLICK_INTERVAL_MS = 500;
const IDLE_WINDOW_MS = 1200;

const singleClickObservable$ = fromEvent(clickbox, 'click')
    .pipe(
        bufferTime(CLICK_INTERVAL_MS),
        map((clicks) => clicks.length),
        filter((length) => length === 1)
    )
    

const multiClickObservable$ = fromEvent(clickbox, 'click')
    .pipe(
        bufferTime(CLICK_INTERVAL_MS),
        map((clicks) => clicks.length),
        filter((length) => length > 1)
    )

const idleObservable$ = merge(singleClickObservable$, multiClickObservable$)
    .pipe(
        debounceTime(IDLE_WINDOW_MS)
    )

singleClickObservable$.subscribe(() => {
    message.textContent = 'Single clicked!';
});

multiClickObservable$.subscribe(() => {
    message.textContent = 'Double+ clicked!';
});

idleObservable$.subscribe(() => {
    message.textContent = '';
})

