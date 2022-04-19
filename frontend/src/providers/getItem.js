// obtiene un item por id desde la api
export default function getItem(itemId) {
    return new Promise((resolve, reject) => {
        return fetch(`http://localhost:8000/api/items/${itemId}`)
            .then(async response => {
                const item = await response.json()

                return resolve(item);
            })
            .catch(error => {
                return reject('An unknown error occurred.' + error)
            })
    })
}

