console.log("client side js is loaded!")

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {  
//         if(data.error) {
//             console.log(data.error)
//         }  else {
//             const location = data.location
//             const forcast = data.forcast
//             console.log({
//                 location,
//                 forcast
//             })
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const weatherInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const search = weatherInput.value;
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+search).then((response) => {
    response.json().then((data) => {  
        if(data.error) {
            messageOne.textContent = data.error
           // console.log(data.error)
        }  else {
            const location = data.location
            const forcast = data.forcast
            messageOne.textContent = location
            messageTwo.textContent = forcast
            // {
            //     location,
            //     forcast
            // }
        }
    })
})

})