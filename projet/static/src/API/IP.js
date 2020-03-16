function getIpLocation() {
    return new Promise((resolve, reject) => {
        fetch(`http://ip-api.com/json/`)
            .then(data => data.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

export default { getIpLocation }