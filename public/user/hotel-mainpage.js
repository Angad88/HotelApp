const baseUrl = 'http://localhost:2500/api/v1';
const hotelName = document.getElementById('hotel-name');
const hotelAddress = document.getElementById('hotel-address');
const hotelDescription = document.getElementById('hotelDescription');
const headerBackground =  document.getElementById('header-background');
const hotelCardContainer = document.getElementById('hotel-card-container');


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

async function getHotelPage() {
    let hotelId =  localStorage.getItem('hotelId');
    // window.location.href = 'hotel-mainpage.html';
    console.log(hotelId);

    try {
        const hotelResponse = await fetch(`${baseUrl}/admins/${hotelId}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        });
        
        const response = await hotelResponse.json();
        const hotelData = response.data;
        // Change the hotel name
        hotelName.innerHTML += `${hotelData.name}`;
        hotelAddress.innerHTML += `${hotelData.address}, ${hotelData.city}, ${hotelData.province}, ${hotelData.postalCode}`;
        hotelDescription.innerHTML += `<p>${hotelData.description}</p>`;
        headerBackground.style.backgroundImage = `url(${hotelData.img})`;
        
        const roomResponse = await fetch(`${baseUrl}/hotels`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })

        const res = await roomResponse.json();
        const roomData = res.data;

        let isBreakfastIncluded;
        for (let i = 0; i < roomData.length; i++) {

            // handle with the breakfast included or not 
            if (roomData[i].isBreakfastIncluded) {
                isBreakfastIncluded = 'Breakfast is included'
            } else {
                isBreakfastIncluded = 'Breakfast is not included'
            }

            // handle with date type
            const startDate = new Date(roomData[i].startDate);
            const endDate = new Date(roomData[i].endDate);

            const formattedStartDate = startDate.toLocaleDateString();
            const formattedEndDate = endDate.toLocaleDateString();

            if (roomData[i].hotel === hotelId) {
                hotelCardContainer.innerHTML += `<div class="hotel-card" >
                <div class="background-card" style="background-image: url(${roomData[i].img});">
    
                </div>
                <div class="hotel-info-container">
    
                    <div class="hotel-info">
                        <div class="hotel-title">
                            <h3>CA$${roomData[i].price}</h3>
                            <h4>${roomData[i].beds} beds</h4>
                        </div>
                        <div class="room-quantity">
                            <span>We have ${roomData[i].quantity} left</span>
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
        }


    } catch(error) {
        console.log(error)
    }

}

getHotelPage();
getUserInfo();

const signout = () => {
    localStorage.clear();
    window.location.href = 'login.html';
}