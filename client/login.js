'use strict';


function loginSetup() {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');

    if (message) {
        const alert = document.getElementById("errorAlert");
        alert.innerHTML = '';
        alert.classList.add('alert');
        alert.classList.add('alert-danger');
        alert.setAttribute('role', 'alert');
        alert.innerHTML = 'Incorrect username or password.';
        window.scrollTo(0, 0);
    }
}



window.addEventListener('load', loginSetup);