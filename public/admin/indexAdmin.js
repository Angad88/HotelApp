const baseUrl = 'http://localhost:2500/api/v1';
const token = localStorage.getItem('access-token');
console.log(token)

const nav = document.querySelector('nav');

window.onscroll = () => {
    if (document.body.scrollTop >= 50) {
        nav.classList.add('nav-scrolled');
    }
    else {
        nav.classList.remove('nav-scrolled');
    }
}
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const selectionBar = document.getElementsByClassName('selection')[0];

toggleButton.addEventListener('click', () => {
    selectionBar.classList.toggle('active');
})

function getadminInfo() {
    const adminInfo = JSON.parse(localStorage.getItem('current-admin'));
    if(!adminInfo) {
        alert("You need to log in to get access");
        window.location.href = "./admin/adminLogin.html";

    }
    adminTitle.innerHTML += `${adminInfo.name.toUpperCase()}!`;
    toLoginPage.remove();
    selection.innerHTML += `<button id="toLoginPage" class="button-48"> <a class="button1" style="color: white; font-weight: bold;"href="./admin/admin.html">Log out</a></button>`
}


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
            hotelCardContainer.innerHTML += `<div class="hotel-card">
            <div class="background-card" style="background-image: url(${mostFourPopularHotel[i].img});">

            </div>
            <div class="hotel-info-container">

                <div class="hotel-info">
                    <div class="hotel-title">
                        <h3>${mostFourPopularHotel[i].name}</h3>
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


const selection = document.getElementById('selection');
const userTitle = document.getElementById('greeting');
const toLoginPage = document.getElementById('toLoginPage');

getBestHotel();
getAdminInfo();