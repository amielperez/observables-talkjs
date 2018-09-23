const button = document.getElementById('demo-btn');
const output = document.getElementById('output');

button.addEventListener('click', () => {
    output.textContent = `${(new Date()).toString()} (Without using observables)`;
})