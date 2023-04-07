const baseUrl = 'http://localhost:2500/api/v1';
const hotelCardContainer = document.getElementById('hotel-card-container');
const userDestination = document.getElementById('userDesired-destination');
const userNumberOfTravelers = document.getElementById('userDesired-numberOfTravelers');

// Display background color for nav bar when user scroll down
const nav = document.querySelector('nav');

window.onscroll = () => {
    if (document.body.scrollTop >= 50) {
        nav.classList.add('nav-scrolled');
    }
    else {
        nav.classList.remove('nav-scrolled');
    }
}

// Authenticate user
const userTitle = document.getElementById('greeting');
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

// Get room id array which is filtered already in user home page
const roomIdArray = JSON.parse(localStorage.getItem('roomsId'));

// Get user destination and numberOfTravelers
const destination = localStorage.getItem('userDestination');
const numberOfTravelers = localStorage.getItem('userNumberOfTravelers');
async function getRooms() {

    try {
        if (roomIdArray.length === 0) {
            hotelCardContainer.innerHTML += "<h1 style='color:red';>Requirements don't meet</h1>"
        } else {
            for (let i = 0; i < roomIdArray.length; i++) {

                const fetchRooms = await fetch(`${baseUrl}/hotels/${roomIdArray[i]}`);
                const response = await fetchRooms.json();
                
                // Get Room Data
                const roomData = response.roomData;
                
                // Format the startDate available and endDate available
                const startDate = new Date(roomData.startDate);
                const endDate = new Date(roomData.endDate);
        
                const formattedStartDate = startDate.toLocaleDateString();
                const formattedEndDate = endDate.toLocaleDateString();
        
                // Get destination and numberOfTravelers
                
                // handle with the breakfast included or not 
                if (roomData.isBreakfastIncluded) {
                   isBreakfastIncluded = 'Breakfast is included'
                } else {
                    isBreakfastIncluded = 'Breakfast is not included'
                }
                
                const fetchHotelBasedOnHotelId = await fetch(`${baseUrl}/admins/${roomData.hotel}`, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                
                const hotelResponse = await fetchHotelBasedOnHotelId.json();
                const hotelData = hotelResponse.data;
    
                
                // Create room card
                hotelCardContainer.innerHTML += `<div class="hotel-card" style="width: 800px; height: 250px; display:grid; grid-template-columns: 50% 50%;" >
                <div class="background-card" style="background-image: url(${roomData.img}); height: 100%;   border-top-left-radius: 10px;
                border-bottom-left-radius: 10px; border-top-right-radius: 0px">
    
                </div>
                <div class="hotel-info-container">
    
                    <div class="hotel-info">
                        <div class="hotel-title">
                            <h3>${hotelData.name}</h3>
                            <h4>${hotelData.city}</h4>
                            <p>${roomData.beds} beds</p>
    
                        </div>
                        <div class="room-price">
                            <span>CA $${roomData.price}</span>
                        </div>
                        <div style="display:grid; justify-content:center; grid-template-columns: 100%;align-items: center; grid-column: 1/-1; margin-right: 10px">
                            <div class="grayLine" style="height: 1px">
                            </div>
                        </div>
    
                    </div>    
                    
    
                    <div class="hotel-availableDate">
                        <div>
                            <h4>Day Available</h4>
                            <p>${formattedStartDate}-${formattedEndDate}</p>
                            <p style="width: 100%; font-size: smaller">${isBreakfastIncluded}</p>
                        </div>
                        <button class="book-button">Book Us</button>
                    </div>
    
              
                    
                </div>
    
            </div>`
            }          
            
    
            // Display user destination and number of travelers;
            userDestination.innerHTML += `${destination}`;
            userNumberOfTravelers.innerHTML += `${numberOfTravelers}`
        }
       
    } catch (error) {
        console.log(error)
    }
   
    
}

getRooms();
getUserInfo();

const signout = () => {
    localStorage.clear();
    window.location.href = 'login.html';
}