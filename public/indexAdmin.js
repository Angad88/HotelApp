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

const selection = document.getElementById('selection');
const userTitle = document.getElementById('greeting');
const toLoginPage = document.getElementById('toLoginPage');