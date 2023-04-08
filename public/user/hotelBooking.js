const baseUrl = 'http://localhost:2500/api/v1';
const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo'));




// Authenticate user
const userTitle = document.getElementById('greeting')
function getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('current-user'));
    if(!userInfo) {
        alert("You need to log in to get access");
        window.location.href = "../user/login.html";

    }
    userTitle.innerHTML += `${userInfo.name.toUpperCase()}!`;
    toLoginPage.remove();
    selection.innerHTML += `<button id="toLoginPage" class="button-48"> <a class="button1" style="color: white; font-weight: bold;" onclick="signout()">Log out</a></button>`
}

async function bookingRoom(event) {
    event.preventDefault();
    const customerFName = document.getElementById('user-first-name').value;
    const customerLName = document.getElementById('user-last-name').value;
    const customerPhoneNumber =  document.getElementById('user-phoneNumber').value;
    const customerEmail = document.getElementById('user-email').value;

    console.log(customerFName);
    const roomResponse = await fetch(`${baseUrl}/hotels/bookRoom/${bookingInfo.roomId}`, {
        method: "PUT",
        body: JSON.stringify({
            checkinDate: bookingInfo.startDate,
            checkoutDate: bookingInfo.endDate,
            customerFName: customerFName,
            customerLName: customerLName,
            customerPhoneNumber: customerPhoneNumber,
            customerEmail: customerEmail
        }),
        headers: {
            'Content-type': 'application/json',

        }
   
    });

    const response = await roomResponse.json();
    const bookingMessage = document.getElementById('booking-message');
    bookingMessage.innerHTML = '';
    if (response) {
        bookingMessage.innerHTML += `<h3 style="color: rgba(4, 132, 4, 0.824); ">${response.message}</h3>`;
        setTimeout(() => {
            window.location.href = 'thankyouPage.html';
        }, 5000)
    } else {
        bookingMessage.innerHTML += `<h3 style="color: red; ">${response.message}</h3>`;
        
    }

}

async function fetchRoomData() {
    const roomResponse = await fetch(`${baseUrl}/hotels/${bookingInfo.roomId}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    });

    const response = await roomResponse.json();
    const roomData = response.roomData;
    
    console.log(bookingInfo.startDate <= bookingInfo.endDate);
    // Checking the available date is right
    if(bookingInfo.startDate >= roomData.startDate && bookingInfo.endDate >= roomData.endDate && bookingInfo.startDate <= bookingInfo.endDate) {
        const earlierThanUnAvailableDate = bookingInfo.startDate <= roomData.bookingDate.checkinDate && bookingInfo.endDate <= roomData.bookingDate.checkinDate ? true : false ;
        const laterthanUnavailableDate = bookingInfo.endDate >= roomData.bookingDate.checkoutDate && bookingInfo.startDate >= roomData.bookingDate.checkoutDate ? true : false ;
        const matchingAvailableDate = earlierThanUnAvailableDate || laterthanUnavailableDate ? true : false;
        if (matchingAvailableDate) {
            const hotelResponse = await fetch(`${baseUrl}/admins/${roomData.hotel}`, {
                method: "GET",
                'Content-type': 'application/json'
            });
            const res = await hotelResponse.json();
            const hotelData = res.data;
            const userRoomContainer = document.getElementById('user-room-container');
            
            // Calculate how many nights user booked
            const checkinDate = new Date(bookingInfo.startDate);
            const checkoutDate = new Date(bookingInfo.endDate);
            const numberOfNights = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);
        
            // Calculate total money
            const price = Math.round(roomData.price * numberOfNights * 100) / 100;
            const tax = Math.round((price * 0.12) * 100)/ 100;
            const total = Math.round((price + tax) * 100) / 100;
        
        
            userRoomContainer.innerHTML += `<div class="user-room-card">
            <div class="background-card" style="background-image: url(${roomData.img}); height: 100%;">
        
            </div>
            <div class="user-room-info">
                <div style="display:grid; grid-template-columns: 50% 50%;">
                    <h3>${hotelData.name}</h3>
                    <h4>${roomData.beds} beds</h4>
                </div>
                <div class="checkinDate">
                    <h5>Check in: ${bookingInfo.startDate}</h5>
                    <h5>Check-out: ${bookingInfo.endDate}</h5>
                </div>
                
                <div style="display:grid; justify-content:center; grid-template-columns: 100%;align-items: center; grid-column: 1/-1; margin-right: 10px;">
                    <div class="grayLine" style="height: 1px">
                    </div>
                </div>
                <div class="confirm-container">
                    <div class="price-details">
                        <p class='grid-element'>${numberOfNights} nights</p>
                        <p class='grid-element'>CA $${price}</p>
                        <p class='grid-element'>Taxes</p>
                        <p class='grid-element'>CA $${tax}</p>
                        <h3 class='grid-element'>Total</h3>
                        <h3 class='grid-element'>CA $${total}</h3>
                     </div>
                     <button class="confirm-button" onclick="bookingRoom(event)">Complete Booking</button>
                </div>
               
        
            </div>
        </div>`
        } else {
            const bookingMessage = document.getElementById('booking-message');
            bookingMessage.innerHTML = '';
            bookingMessage.innerHTML += `<h3 style="color: red; ">Sorry, We are sold out of this room at your desired time. Please comeback to change your date</h3>`;
    
            
            setTimeout(() => {
                window.location.href = 'hotel-mainpage.html';
            }, 5000)
        }
    
    } else {
        const bookingMessage = document.getElementById('booking-message');
        bookingMessage.innerHTML = '';
        bookingMessage.innerHTML += `<h3 style="color: red; ">Sorry, We are sold out of this room at your desired time. Please comeback to change your date</h3>`;
        
        setTimeout(() => {
            window.location.href = 'hotel-mainpage.html';
        }, 10000)
    }
   

    
}

fetchRoomData();
getUserInfo();


const signout = () => {
    localStorage.clear();
    window.location.href = 'login.html';
}

