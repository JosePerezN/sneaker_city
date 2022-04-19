// obtiene los primeros 10 items ordenados
export default function getItems(start, end) {
    return new Promise((resolve, reject) => {
        return fetch(`http://localhost:8000/api/items?start=${start}&end=${end}`)
            .then(async response => {
                const items = await response.json();

                return resolve(items);
            })
            .catch(error => {
                return reject('An unknown error occurred.' + error)
            })
    })
}