const baseUrl = 'http://localhost:2500/api/v1';

const alertBox = document.getElementById('notification');

//---------------------------------------------------------------
//---------------------------------------------------------------

const token = localStorage.getItem('access-token');
const hotelToken = localStorage.getItem('roomID');
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
        isBreakfastIncluded1 = true;
    }
    else {
        isBreakfastIncluded1 = false;
    }




    const newHotel = {
        hotel: adminInfo1._id,
        beds: beds.value,
        isBreakfastIncluded: isBreakfastIncluded1,
        price: price.value,
        quantity: quantity.value,
        startDate: startDate.value,
        endDate: endDate.value,
        img: img.value,
        bookingDate: {
            checkinDate: startDate.value,
            checkoutDate: startDate.value
        }
    }

    console.log(newHotel);

    fetch(`${baseUrl}/hotels`, {
        method: "POST",
        body: JSON.stringify(newHotel),
        headers: {
            'Content-type': 'application/json',

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


const updateRoomEvent = (event) => {
    event.preventDefault();
    const newHotel = {};
    console.log(newHotel)
    console.log('hi');

    const beds = document.getElementById('beds').value;
    const bedsUpdate = beds !== "" ? newHotel.beds = beds : false;  

    const isBreakfastIncluded = document.getElementById('breakfast').value;
    const isBreakfastIncludedUpdate = isBreakfastIncluded !== "" ? newHotel.isBreakfastIncluded = isBreakfastIncluded : false;  
    
    
    const price = document.getElementById('price').value;
    const priceUpdate = price !== "" ? newHotel.price = price : false;

    
    const quantity = document.getElementById('quantity').value;
    const quantityUpdate  = quantity !== ""? newHotel.quantity = quantity : false;

    const startDate = document.getElementById('start').value;
    const startDateUpdate  = startDate !== ""? newHotel.startDate = startDate : false;
    
    const endDate = document.getElementById('end').value;
    const endDateUpdate  = endDate !== ""? newHotel.endDate = endDate : false;
    
    const img = document.getElementById('image').value;
    const imgUpdate  = img !== ""? newHotel.img = img : false;
    

    console.log(newHotel);

    fetch(`${baseUrl}/hotels/${hotelToken}`, {
        method: "PUT",
        body: JSON.stringify(newHotel),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`

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
