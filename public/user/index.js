const baseUrl = 'http://localhost:2500/api/v1';
const token = localStorage.getItem('access-token');


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


const navItems = document.querySelectorAll('.navItems');

navItems.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        console.log(item);


        const sectionId = item.dataset.scroll;
        const section = document.getElementById(sectionId);

        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    });
});


const toggleButton = document.getElementsByClassName('toggle-button')[0];
const selectionBar = document.getElementsByClassName('selection')[0];

toggleButton.addEventListener('click', () => {
    selectionBar.classList.toggle('active');
})

const selection = document.getElementById('selection');
const userTitle = document.getElementById('greeting');
const toLoginPage = document.getElementById('toLoginPage');


// Authenticate user
function getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('current-user'));
    if(!userInfo) {
        alert("You need to log in to get access");
        window.location.href = "login.html";

    }
    userTitle.innerHTML += `${userInfo.name.toUpperCase()}!`;
    toLoginPage.remove();
    selection.innerHTML += `<button id="toLoginPage" class="button-48"> <a class="button1" style="color: white; font-weight: bold;" onclick="signout()">Log out</a></button>`
}

let hotelIdArr = [];
function getBestHotel() {
    const hotelCardContainer = document.getElementById('hotel-card-container');
    fetch(`${baseUrl}/admins`, {
        method:"GET",
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((adminData) => {


        const hotelData = adminData.data;
        const sortedData = hotelData.sort((a, b) => b.reviewStars - a.reviewStars);
        const mostFourPopularHotel = sortedData.slice(0, 4);
        
        for (let i = 0; i < mostFourPopularHotel.length; i++) {
            hotelIdArr.push(mostFourPopularHotel[i]._id);
            hotelCardContainer.innerHTML += `<div class="hotel-card" >
            <div class="background-card" style="background-image: url(${mostFourPopularHotel[i].img});">

            </div>
            <div class="hotel-info-container">

                <div class="hotel-info">
                    <div class="hotel-title">
                        <h3 id=${mostFourPopularHotel[i]._id} onclick='directToHotelPage(event)'>${mostFourPopularHotel[i].name}</h3>
                        <h4>${mostFourPopularHotel[i].city}</h4>
                    </div>
                    <div class="reviewStars">
                        <span>${mostFourPopularHotel[i].reviewStars}</span>
                        <span class="fa fa-star checked"></span>
                    </div>
                    <div style="display:grid; justify-content:center; grid-template-columns: 100%;align-items: center; grid-column: 1/-1; margin-right: 10px">
                        <div class="grayLine" style="margin: bottom 50px ; height: 1px">
                        </div>
                    </div>

                </div>    
                

                <div class="hotel-description">
                    <h3>Description</h3>
                    <p>${mostFourPopularHotel[i].description.slice(0,100)}...</p>
                </div>
                
            </div>

        </div>`
        }
        
        return adminData;
    }).catch((error) => {
        console.log(error);
    })
}




function getAllHotel() {
    fetch(`${baseUrl}/hotels/6427c6dae268e988532eb242`, {
        method: "GET",
        headers: {
            'Content-type' : 'application/json'

        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        return data;
    }).catch((error) => {
        console.log(error)
    })
    
}

let suitableHotel;

async function getRooms(event) {
    event.preventDefault();

    suitableHotel = [];
    const bookingInfo = {};

    const destination = document.getElementById('destination').value;
    const destinationCapitalize = destination.charAt(0).toUpperCase() + destination.slice(1);   

    const numberOfTravelers = document.getElementById('numberOfTravelers').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const userStartDate = new Date(startDate);
    const userEndDate = new Date(endDate);

    try {
        const roomResponse = await fetch(`${baseUrl}/hotels`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        });
        const RoomData = await roomResponse.json();
        const rData = RoomData.data;

        for(let i = 0; i < rData.length; i++) {
            let hotelID;
            hotelID = rData[i].hotel;
            const hotelResponse = await fetch(`${baseUrl}/admins/${hotelID}`, {
                method: "GET",
                headers: {
                    'Content-type' : 'application/json'
                }
            });
        
            const HotelData = await hotelResponse.json();
    
            if (startDate >= rData[i].startDate && endDate <= rData[i].endDate && startDate <= endDate) {
                const matchingDestination = HotelData.data.city === destinationCapitalize? true :false;
                const matchingNumberOfTravelers = numberOfTravelers >= rData[i].beds ? true : false;
                const earlierThanUnAvailableDate = startDate <= rData[i].bookingDate.checkinDate && endDate <= rData[i].bookingDate.checkinDate ? true : false ;
                const laterthanUnavailableDate = endDate >= rData[i].bookingDate.checkoutDate && startDate >= rData[i].bookingDate.checkoutDate ? true : false ;
                const matchingAvailableDate = earlierThanUnAvailableDate || laterthanUnavailableDate ? true : false;
                if(matchingDestination && matchingNumberOfTravelers && matchingAvailableDate) {
                   suitableHotel.push(rData[i]._id);
                }
            }
            
        }

        // Push booking info into an object and save it on local storage
        bookingInfo.destination = destinationCapitalize;
        bookingInfo.numberOfTravelers = numberOfTravelers;
        bookingInfo.startDate = userStartDate.toLocaleDateString();
        bookingInfo.endDate = userEndDate.toLocaleDateString();
        
        localStorage.setItem('roomsIdArr', JSON.stringify(suitableHotel));
        localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
        window.location.href = 'hotel-search-page.html';
 
    } catch(error) {
        console.log(error)
    }
    
    
    
}

const signout = () => {
    localStorage.clear();
    window.location.href = 'login.html';
}


getAllHotel();
getBestHotel();
getUserInfo();

// HOTEL MAIN PAGE
function directToHotelPage(event) {
    let hotelId =  event.target.id;
    localStorage.setItem('hotelId', hotelId);

    window.location.href = "hotel-mainpage.html"
}
