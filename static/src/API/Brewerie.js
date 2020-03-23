function findAll() {
    return new Promise((resolve, reject) => {
        fetch(`http://${window.location.hostname}:3000/api/brewery/`)
            .then(data => data.json())
            .then(data => resolve(data.filter(el => el.coordinates !== "").map(el => { return { ...el, bid: el.id } })))
            .catch(err => reject(err))
    })
}

function findAllByCity(name) {
    return new Promise((resolve, reject) => {
        fetch(`http://${window.location.hostname}:3000/api/brewery/city/${name}`)
            .then(data => data.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        fetch(`http://${window.location.hostname}:3000/api/brewery/id/${id}`)
            .then(data => data.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

export default { findAll, findAllByCity, findById }