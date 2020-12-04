'use strict';


function regSetup() {
    document.getElementById("registerButton").addEventListener('click', async () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        //Check inputs
        if (username.length === 0) {
            const alert = document.getElementById('errorAlert');
            alert.innerHTML = '';
            alert.classList.add('alert');
            alert.classList.add('alert-danger');
            alert.setAttribute('role', 'alert');
            alert.innerHTML = 'Please enter a username!';
            return;
        } else if (password.length === 0) {
            const alert = document.getElementById('errorAlert');
            alert.innerHTML = '';
            alert.classList.add('alert');
            alert.classList.add('alert-danger');
            alert.setAttribute('role', 'alert');
            alert.innerHTML = 'Please enter a password!';
            return;
        } else if (username.length > 32) {
            const alert = document.getElementById('errorAlert');
            alert.innerHTML = '';
            alert.classList.add('alert');
            alert.classList.add('alert-danger');
            alert.setAttribute('role', 'alert');
            alert.innerHTML = 'Username must not exceed 32 characters.';
            return;
        }

        const body = {
            username: username,
            password: password
        };


        const fetchurl = '/register';

        const res = await fetch(fetchurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        window.location.href = res.url;

    });
}


window.addEventListener('load', regSetup);