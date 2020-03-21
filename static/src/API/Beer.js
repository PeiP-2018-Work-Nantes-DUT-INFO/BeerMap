function findAllByBrewery(id) {
    return new Promise((resolve, reject) => {
        fetch(`http://${window.location.hostname}:3000/api/beer/brewery/${id}`)
            .then(data => data.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

function findAllByCategory(id) {
    return new Promise((resolve, reject) => {
        fetch(`http://${window.location.hostname}:3000/api/beer/categorie/${id}`)
            .then(data => data.json())
            .then(data => {
                console.log(data)
                return data;
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

export default { findAllByBrewery, findAllByCategory}