
const base_url = "https://api.openweathermap.org/data/2.5"
const weather_api = "738f12039c2e8530f3896b83f937b358"

function searchByGeoCord(lon, lat) {
    return new Promise((resolve, reject) => {
        fetch(`${base_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_api}&units=metric&lang=fr`)
            .then(data => data.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

export default { searchByGeoCord }