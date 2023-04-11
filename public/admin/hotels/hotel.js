const baseUrl = 'http://localhost:2500/api/v1';

const alertBox = document.getElementById('notification');

//---------------------------------------------------------------
//---------------------------------------------------------------

const token = localStorage.getItem('access-token');
console.log(token)

const nav = document.querySelector('nav');


const adminTitle = document.getElementById('adminName');


const toggleButton = document.getElementsByClassName('toggle-button')[0];
const selectionBar = document.getElementsByClassName('selection')[0];


function getHotelInfo() {
    const adminInfo = JSON.parse(localStorage.getItem('current-admin'));
    if(!adminInfo) {
        alert("You need to log in to get access");
        window.location.href = "../adminLogin.html";

    }
    adminTitle.innerHTML += `for ${adminInfo.name}`;
}



getHotelInfo();

//---------------------------------------------------------------
//---------------------------------------------------------------



const adminInfo1 = JSON.parse(localStorage.getItem('current-admin'));

const signupFormSubmit = (event) => {
    event.preventDefault();

    const beds = document.getElementById('beds');
    const isBreakfastIncluded = document.getElementById('breakfast');
    const price = document.getElementById('price');
    const quantity = document.getElementById('quantity');
    const startDate = document.getElementById('start');
    const endDate = document.getElementById('end');
    const img = document.getElementById('image');
    let isBreakfastIncluded1 = false;

    if (isBreakfastIncluded.value == "on") {
        let isBreakfastIncluded1 = true;
    }
    else {
        let isBreakfastIncluded1 = false;
    }




    const newHotel = {
        hotel: adminInfo1.name,
        beds: beds.value,
        isBreakfastIncluded: isBreakfastIncluded1.value,
        price: price.value,
        quantity: quantity.value,
        startDate: startDate.value,
        endDate: endDate.value,
        img: img.value
    }

    console.log(newHotel);

    fetch(`${baseUrl}/hotels`, {
        method: "POST",
        body: JSON.stringify(newHotel),
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
                window.location.href = '../indexAdmin.html';
            }, 2000);
        }
       
        return data;
    }).catch((error) => {
        console.log(error);
    })
}
