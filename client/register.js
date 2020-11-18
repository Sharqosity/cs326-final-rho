'use strict';


function regSetup() {
    document.getElementById("registerButton").addEventListener('click', () => {
        const body = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };

    
        const fetchurl = '/user/register';
        
        const res = fetch(fetchurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        console.log(res);

        if (true) { //res is OK
            //redirect to login 
            window.location.replace('./login.html'); 
        } else {
            //print error message
        }
        
    });
}






window.addEventListener('load', regSetup);