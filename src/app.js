import { fromEvent } from 'rxjs';

const button = document.getElementById('demo-btn');
const output = document.getElementById('output');

fromEvent(button, 'click')
    .subscribe(() => {
        output.textContent = `${(new Date()).toString()} (Using observables)`;
    })