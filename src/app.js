import { fromEvent, interval, merge } from 'rxjs';
import { buffer, bufferTime , map, debounceTime, filter } from 'rxjs/operators'
import { addClass, removeClass } from './utils';

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
    addClass(clickbox, 'single');
    removeClass(clickbox, 'double');
    clickbox.textContent = '1 Click';
});

multiClickObservable$.subscribe(() => {
    removeClass(clickbox, 'single');
    addClass(clickbox, 'double');
    clickbox.textContent = '2+ Clicks';
});

idleObservable$.subscribe(() => {
    removeClass(clickbox, 'single');
    removeClass(clickbox, 'double');
    clickbox.textContent = 'Click me';
})

// For visual clarity only
const heading = document.getElementById('heading');
heading.textContent = 'Track Clicks WITH Observables';
