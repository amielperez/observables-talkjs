// Credits to: https://glitch.com/edit/#!/rxjs-mouse-drag?path=canvas.js:9:2

let infiniteX = Infinity;
let infiniteY = Infinity;
let colorHue = 0;

export function initCanvas(canvasEl) {
    const ctx = canvasEl.getContext('2d');
    canvasEl.width = 640;
    canvasEl.height = 480;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 20;
    return ctx;
}

export function paintOn(ctx, { x, y }) {
    ctx.strokeStyle = `hsl(${colorHue}, 100%, 60%)`;
    ctx.beginPath();
    if (Math.abs(infiniteX - x) < 100 && Math.abs(infiniteY - y) < 100) {
        ctx.moveTo(infiniteX, infiniteY);
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    infiniteX = x;
    infiniteY = y;
    colorHue++;
}