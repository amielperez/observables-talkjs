import { fromEvent } from 'rxjs';
import { map, repeat, skipUntil, takeUntil } from 'rxjs/operators';
import { initCanvas, paintOn } from './utils';

const canvas = document.getElementById('canvas');
const ctx = initCanvas(canvas);

const mouseUpObservable$ = fromEvent(document, 'mouseup');
const mouseDownObservable$ = fromEvent(document, 'mousedown');
const moveObservable$ = fromEvent(document, 'mousemove')
    .pipe(
        skipUntil(mouseDownObservable$),
        map((pos) => ({ x: pos.clientX, y: pos.clientY })),
        takeUntil(mouseUpObservable$),
        repeat()
    );

moveObservable$.subscribe((brushPos) => {
    paintOn(ctx, brushPos);
});