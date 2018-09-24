function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className ? el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '') : el.className;
}

export { addClass, removeClass };
