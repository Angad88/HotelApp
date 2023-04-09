const baseUrl = 'http://localhost:2500/api/v1';

const alertBox = document.getElementById('notification');
const loginFormSubmit = (event) => {
    event.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const newAdmin = {
        email: email.value,
        password: password.value 
    }

    fetch(`${baseUrl}/users/login`, {
        method: "POST",
        body: JSON.stringify(newAdmin),
        headers: {
            'Content-Type' : "application/json"
        }
    }).then((response) => {
        return response.json();

    }).then((data) => {
        if (data.token) {
            localStorage.setItem('access-token', data.token),
            localStorage.setItem('current-user', JSON.stringify(data.admin));
            alertBox.innerHTML = "";
            alertBox.innerHTML += `<div class="alert-successfully">${data.message}</div>`
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        } else {
            alertBox.innerHTML = "";
            alertBox.innerHTML += `<div class="alert-error">${data.message}</div>`
        }
    })
}

const signupFormSubmit = (event) => {
    event.preventDefault();

    const name = document.getElementById('signup-name');
    const email = document.getElementById('signup-email');
    const password = document.getElementById('signup-password');

    const newUser = {
        name: name.value,
        email: email.value,
        password: password.value
    }

    console.log(newAdmin);

    fetch(`${baseUrl}/users`, {
        method: "POST",
        body: JSON.stringify(newAdmin),
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        alertBox.innerHTML = "";
       
        
        if(data.error) {
            alertBox.innerHTML += `<div class="alert-error">${data.message}</div>`
        }
        else {
            alertBox.innerHTML += `<div class="alert-successfully">${data.message}</div>`;
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
       
        return data;
    }).catch((error) => {
        console.log(error);
    })

}