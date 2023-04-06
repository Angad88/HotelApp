
const baseUrl = 'http://localhost:2500/api/v1';


const selection = document.getElementById('selection');
const userTitle = document.getElementById('greeting');
const toLoginPage = document.getElementById('toLoginPage');

const nav = document.querySelector('nav');

window.onscroll = () => {
    if (document.body.scrollTop >= 50) {
        nav.classList.add('nav-scrolled');
    }
    else {
        nav.classList.remove('nav-scrolled');
    }
}


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

function filterHotel() {
    const title = document.querySelector('title');
    console.log(title.text);
    const hotelCardContainer = document.getElementById('hotel-card-container');

    fetch(`${baseUrl}/admins`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((adminData) => {
        const hotelData = adminData.data;
        
        for(let i = 0; i < hotelData.length; i++) {
            let reviewTitle;
            if (hotelData[i].reviewStars >= 4.5) {
                reviewTitle = "VERY GOOD";
            }
            else if (hotelData[i].reviewStars >= 4.0) {
                reviewTitle = "GOOD";
            }
            else if (hotelData[i].reviewStars >= 3.0){
                reviewTitle = "AVERAGE"
            }
            else if (hotelData[i].reviewStars >= 2.0) {
                reviewTitle = "BAD"
            }
            else {
                reviewTitle = 'VERY BAD'
            }
            console.log(hotelData[i].city === title.text)
            if (hotelData[i].city === title.text) {
                // console.log(adminData.data[i].city === title.text);

                hotelCardContainer.innerHTML += ` <div class="hotel-card">
                <div class="background-card" style="background-image: url(${hotelData[i].img});">

                </div>
                <div class="hotel-info-container">
                    <div class="info-box">
                        <div class="hotel-info">
                            <h3 id=${hotelData[i]._id} onclick="directToHotelPage(event)">${hotelData[i].name}</h3>
                            <h4>${hotelData[i].address}, ${hotelData[i].city}, ${hotelData[i].province}, ${hotelData[i].postalCode}</h4>
                        </div>
                
                        <div class="reviewStars">
                            <span style="font-weight: bold;">${reviewTitle}</span>
                            <span>${hotelData[i].reviewStars}</span>
                            <span class="fa fa-star checked"></span>
                        </div>
                    </div>
                    <div style="display:grid; justify-content:center; grid-template-columns: 100%;align-items: center; margin-right: 10px">
                        <div class="grayLine" style="margin: bottom 50px ;">
                        </div>
                    </div>
                    <div class="description">
                        <h4>Description</h4>
                        <p>${hotelData[i].description}</p>
                    </div>
                </div>

            </div>`
            } else{

            }
        
        }

        // return adminData
    }).catch((error) => {
        console.log(error);
    })

}

const signout = () => {
    localStorage.clear();
    window.location.href = '../user/login.html';
}

filterHotel();
getUserInfo();

// TO HOTEL MAIN PAGE
function directToHotelPage(event) {
    let hotelId = event.target.id;
    
    localStorage.setItem('hotelId', hotelId);
    window.location.href = '../user/hotel-mainpage.html';

}