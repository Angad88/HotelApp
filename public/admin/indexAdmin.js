const baseUrl = 'http://localhost:2500/api/v1';
const token = localStorage.getItem('access-token');
console.log(token)

const nav = document.querySelector('nav');


const adminInfo = JSON.parse(localStorage.getItem('current-admin'));


const selection = document.getElementById('selection');
const adminTitle = document.getElementById('greeting');
const toLoginPage = document.getElementById('toLoginPage');

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

function getAdminInfo() {
    if(!adminInfo) {
        alert("You need to log in to get access");
        window.location.href = "adminLogin.html";

    }
    adminTitle.innerHTML += `${adminInfo.name.toUpperCase()}!`;
    toLoginPage.remove();
    selection.innerHTML += `<button id="toLoginPage" class="button-48"> <a class="button1" style="color: white; font-weight: bold;" onclick="signout()" >Log out</a></button>`
}


function getBestHotel() {
    const adminInfo = JSON.parse(localStorage.getItem('current-admin'));
    const hotelCardContainer = document.getElementById('hotel-card-container');

    fetch(`${baseUrl}/hotels/`, {
        method:"GET",
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((adminData) => {
        console.log(adminData);
        let adminArray = [];
        for (let i = 0; i < adminData.data.length; i++) {

            if (adminData.data[i].hotel == adminInfo._id) {
                adminArray.push(adminData.data[i]._id);
                console.log(adminData.data[i]._id);
                hotelCardContainer.innerHTML += `<div class="hotel-card" style="position:relative;">
                <button class="card-button edit-button" onclick="updateRoom(event)"> <i id=${adminData.data[i]._id} class='fas fa-pen'></i></button>
                <button class="card-button delete-button" onclick="deleteRoom(event)"><i id=${adminData.data[i]._id} class="fa fa-trash"></i></button>
                <div class="background-card" style="background-image: url(${adminData.data[i].img});">
    
                </div>
                <div class="hotel-info-container">
    
                    <div class="hotel-info">
                        <div class="hotel-title">
                            <h3>Beds</h5>
                            <h3>${adminData.data[i].beds}</h3>
                            <h3>Price</h3>
                            <h3>CA $${adminData.data[i].price}</h3>
                            <h3>Quantity</h3>
                            <h4>${adminData.data[i].quantity}</h4>
                        </div>
                        <div class="reviewStars">
                            <span class="fa fa-star checked"></span>
                        </div>
                        <div style="display:grid; justify-content:center; grid-template-columns: 100%;align-items: center; grid-column: 1/-1; margin-right: 10px">
                            <div class="grayLine" style="margin: bottom 50px ; height: 1px">
                            </div>
                        </div>
    
                    </div>    
                    

                    
                </div>
    
            </div>`
            }
        }
        console.log(adminArray);

        
    
        return adminData;
    }).catch((error) => {
        console.log(error);
    })
}

// function fetchAdmin() {
//     fetch(`${baseUrl}/admins/${adminInfo._id}`, {
//         method:"GET",
//         headers: {
//             'Content-type': 'application/json'
//         }
//     }).then((response) => {
//         return response.json();
//     }).then((adminData) => {
//         console.log("adminFetch");
//         console.log(adminData);
//     }).catch((error) => {
//         console.log(error);
//     })
// }

// fetchAdmin();
function deleteRoom(event) {
    console.log('delete');
    let idAdmin = event.target.id;

    console.log(idAdmin);
    let text = confirm("Are you sure you want to Delete this Hotel?");
    if (text == true) {
        fetch(`${baseUrl}/hotels/${idAdmin}`, {
            method:"DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
                
            }

        }).then((response) => {
            console.log(response);
            window.location.href = "indexAdmin.html";
            return response.json();
        }).then((adminData) => {
            console.log(adminData);
            if (adminData.token)
            window.location.href = "indexAdmin.html";
            return adminData;
        }).catch((error) => {
            console.log(error);
        })
            
      }


}

function updateRoom(event) {
    const idAdmin  = event.target.id;
    localStorage.setItem("roomID",idAdmin);
    console.log('update');
    console.log(idAdmin);
    window.location.href = "hotels/updateRoom.html";
    
}



getBestHotel();
getAdminInfo();

const signout = () => {
    localStorage.clear();
    window.location.href = 'adminLogin.html';
}

