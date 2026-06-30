const btn = document.querySelector('#btn');
const section = document.querySelector('section');

btn.addEventListener('click', () => {
    section.innerHTML = 'Cargando Productos...';
});