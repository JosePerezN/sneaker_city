// obtiene la talla y cantidad de un item en particular
export default function getItem(itemId) {
    return new Promise((resolve, reject) => {
        return fetch(`http://localhost:8000/api/items/${itemId}/sizes`)
            .then(async response => {
                const sizes = await response.json()

                return resolve(sizes);
            })
            .catch(error => {
                return reject('An unknown error occurred.' + error)
            })
    })
}