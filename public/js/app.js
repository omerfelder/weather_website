// // fetch('http://puzzle.mead.io/puzzle').then((response) => {
// //     response.json().then((data) => {
// //         console.log(data);
// //     })
// // })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageError = document.querySelector('#messageError')
const messageSuccess = document.querySelector('#messageSuccess')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    messageError.textContent = 'Loading ...'
    messageSuccess.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageError.textContent = data.error
            } else {
                messageError.textContent = data.location
                messageSuccess.textContent = data.forecast;
            }
        })
    })
})

