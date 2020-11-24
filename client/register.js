'use strict';


function regSetup() {
    document.getElementById("registerButton").addEventListener('click', async () => {
        const body = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };

    
        const fetchurl = '/register';
        
        const res = await fetch(fetchurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        //console.log(res);
        window.location.href = res.url;

        res.text().then(function(text) {
            if (text === 'userexists') {
                const alert = document.getElementById('errorAlert');
                alert.innerHTML = '';
                alert.classList.add('alert');
                alert.classList.add('alert-danger');
                alert.setAttribute('role', 'alert');
                alert.innerHTML = 'User already exists!';
            
            }
        });


        
    });
}






window.addEventListener('load', regSetup);