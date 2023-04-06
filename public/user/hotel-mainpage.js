const baseUrl = 'http://localhost:2500/api/v1';
const hotelName = document.getElementById('hotel-name');
const hotelAddress = document.getElementById('hotel-address');
const hotelDescription = document.getElementById('hotelDescription');
const headerBackground =  document.getElementById('header-background');
getHotelPage();
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



    } catch(error) {
        console.log(error)
    }

}

