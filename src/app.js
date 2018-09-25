import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { initCanvas, paintOn } from './utils';

const canvas = document.getElementById('canvas');
const ctx = initCanvas(canvas);

const moveObservable$ = fromEvent(document, 'mousemove')
    .pipe(
        map((pos) => ({ x: pos.clientX, y: pos.clientY }))
    );

moveObservable$.subscribe((brushPos) => {
    paintOn(ctx, brushPos);
});