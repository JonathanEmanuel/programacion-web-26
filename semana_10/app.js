import { users} from './data.js'

const ulUsers = document.querySelector('#ulUsers');
const form = document.querySelector('form');
const inputName = document.querySelector('#inputName');
const inputEmail = document.querySelector('#inputEmail');


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
    // Validaciones del Formulario
    if( name == ""){
        alert('Complete el nombre');
        return;
    }
    if( email == ""){
        alert('Complete el Email');
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

form.addEventListener('submit', saveUser);
