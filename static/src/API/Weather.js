
const weather_api = "738f12039c2e8530f3896b83f937b358"

function searchByGeoCord(lon, lat) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_api}&units=metric&lang=fr`)
            .then(data => data.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

export default { searchByGeoCord }