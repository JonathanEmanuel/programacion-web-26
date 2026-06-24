import { users} from './data.js'

const ulUsers = document.querySelector('#ulUsers');
const form = document.querySelector('form');
const inputName = document.querySelector('#inputName');
const inputEmail = document.querySelector('#inputEmail');
const errorName = document.querySelector('#errorName');
const errorEmail = document.querySelector('#errorEmail');

function limpiarErrorName(){
    inputName.classList.remove('error');
    errorName.textContent = "";
}

function limpiarErrorEmail(){
    inputEmail.classList.remove('error');
    errorEmail.textContent = "";
}

function renderUsers(list){
    ulUsers.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
        const user = list[i];
        ulUsers.innerHTML += 
            ` <li>
                    <strong> ${ user.name }</strong>
                    <span>${ user.email}</span>
             </li>`;
    }
}

function saveUser(event){
    event.preventDefault();

    const name = inputName.value.trim();
    const email = inputEmail.value.trim().toLowerCase();

    if( name == ""){
        errorName.textContent = 'Complete el nombre';
        inputName.classList.add('error');
        return;
    }

    if( name.length < 3){
        errorName.textContent = 'El nombre debe tener al menos tres caracteres';
        inputName.classList.add('error');
        return;
    }

    if( email == ""){
        errorEmail.textContent = 'Complete el Email';
        inputEmail.classList.add('error');
        return;
    }

    if( !email.includes('@')){
        errorEmail.textContent = 'Email invalido';
        inputEmail.classList.add('error');
        return;
    }
    const user = {
        name: name,
        email: email
    }

    users.push( user);

    renderUsers(users);

    inputEmail.value = "";
    inputName.value = "";
}

inputName.addEventListener('input', limpiarErrorName);
inputEmail.addEventListener('input', limpiarErrorEmail);

form.addEventListener('submit', saveUser);
