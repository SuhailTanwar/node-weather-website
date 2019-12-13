console.log('Client side javascript file is loaded!')



const submitBtn = document.querySelector('form');
const address = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

submitBtn.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(address.value)
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address=' + address.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forcast;
            }
        })
    })
})