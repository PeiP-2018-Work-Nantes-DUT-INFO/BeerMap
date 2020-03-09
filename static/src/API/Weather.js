
const weather_api = "738f12039c2e8530f3896b83f937b358"
const cors = "https://cors-anywhere.herokuapp.com/"

function searchByGeoCord(lat, lon) {
    return new Promise((resolve, reject) => {
        fetch(cors+`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_api}&units=metric&lang=fr`, {method: 'GET',crossDomain:true,headers: {'X-Requested-With':"",'Content-Type':'application/json'}})
            .then(data => data.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

export default { searchByGeoCord }