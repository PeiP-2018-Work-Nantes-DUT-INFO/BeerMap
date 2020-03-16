import axios from "axios"

const app_id = "wHsFgYVpD8vG8KeZ0e6l"
const app_key = "UbtObNn9FiE2XTF1G7ut_5QN7biSxfJkPd63bks0RhA"
const base_url = "https://geocode.search.hereapi.com/v1/geocode"

function searchByName(search) {
    return new Promise((resolve, reject) => {

        const url =base_url + "?q=" + search

        axios.get(url, {
            headers: {
              'Authorization': `Bearer ${app_key}`,
              'Access-Control-Allow-Origin': '*',
            }
          }).then(data => {
              console.log(data)
          })
          


        /*
        fetch(base_url + "&q=" + search, {
                mode: "no-cors",
                withCredentials: true,
                credentials: "include",
                headers: {
                    "Authorization": "Bearer " + app_key
                }
            })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                resolve(data)
            })
            .catch(err => reject(err))*/
    })
}

export default {
    searchByName
}