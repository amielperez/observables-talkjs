import { addClass, removeClass } from './utils';

const clickbox = document.getElementById('clickbox');

const CLICK_INTERVAL_MS = 500;
const IDLE_WINDOW_MS = 1200;

let globalClickState = 0;
let lastClickTime;
let isIdle = true;
clickbox.addEventListener('click', () => {
    lastClickTime = (new Date()).getTime();
    globalClickState++;
    isIdle = false;
})

function evaluateClicks() {
    if (globalClickState === 1) {
        addClass(clickbox, 'single');
        removeClass(clickbox, 'double');
        clickbox.textContent = '1 Click';
    } else if (globalClickState > 1) {
        removeClass(clickbox, 'single');
        addClass(clickbox, 'double');
        clickbox.textContent = '2+ Clicks';
    }

    scheduleEvaluateClicks();
}

function scheduleEvaluateClicks() {
    setTimeout(evaluateClicks, CLICK_INTERVAL_MS);
}

function checkIdleness() {
    let timeNow = (new Date()).getTime();
    if (!isIdle && timeNow - lastClickTime >= IDLE_WINDOW_MS) {
        globalClickState = 0;
        removeClass(clickbox, 'single');
        removeClass(clickbox, 'double');
        clickbox.textContent = 'Click me';
        isIdle = true;
    }

    scheduleCheckIdleness();
}

function scheduleCheckIdleness() {
    setTimeout(checkIdleness, IDLE_WINDOW_MS);
}

setTimeout(evaluateClicks, CLICK_INTERVAL_MS);
setTimeout(checkIdleness, IDLE_WINDOW_MS);

// For visual clarity only
const heading = document.getElementById('heading');
heading.textContent = 'Track Clicks without Observables';