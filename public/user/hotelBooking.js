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

async function fetchRoomData() {
    const roomResponse = await fetch(`${baseUrl}/hotels/${bookingInfo.roomId}`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    });

    const response = await roomResponse.json();
    const roomData = response.roomData;
    console.log(roomData);

    const hotelResponse = await fetch(`${baseUrl}/admins/${roomData.hotel}`, {
        method: "GET",
        'Content-type': 'application/json'
    });
    const res = await hotelResponse.json();
    const hotelData = res.data;
    const userRoomContainer = document.getElementById('user-room-container');
    
    // Calculate how many nights user booked
    // const checkinDate = new Date(bookingInfo.startDate);
    // const checkoutDate = new Date(bookingInfo.endDate);
    // const numberOfNights = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);

    // const newStartDate = new Date(Math.max(new Date(roomData.startDate), checkinDate));
    // const newEndDate = new Date(Math.min(new Date(roomData.endDate), checkoutDate));
    // console.log(newStartDate, newEndDate);

    const checkinDate = new Date('2023-04-06'); // user's booking start date
const checkoutDate = new Date('2023-04-20'); // user's booking end date
const roomStartDate = new Date('2023-04-01'); // room's available start date
const roomEndDate = new Date('2024-04-01'); // room's available end date

const newStartDate = new Date(Math.max(roomStartDate, checkinDate));
const newEndDate = new Date(Math.min(roomEndDate, checkoutDate));

let remainingStartDate = null;
let remainingEndDate = null;

if (newStartDate.getTime() !== roomStartDate.getTime()) {
  remainingStartDate = newEndDate < roomEndDate ? newEndDate : null;
} else {
  remainingStartDate = roomStartDate;
}

if (newEndDate.getTime() !== roomEndDate.getTime()) {
  remainingEndDate = newStartDate > roomStartDate ? newStartDate : null;
} else {
  remainingEndDate = roomEndDate;
}

console.log('Remaining start date:', remainingStartDate);
console.log('Remaining end date:', remainingEndDate);


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
                <p class='grid-element'>CA $2,000</p>
                <p class='grid-element'>Taxes</p>
                <p class='grid-element'>CA $240</p>
                <h3 class='grid-element'>Total</h3>
                <h3 class='grid-element'>CA $2240</h3>
             </div>
             <button class="confirm-button">Complete Booking</button>
        </div>
       

    </div>
</div>`
    
}

fetchRoomData();
getUserInfo();