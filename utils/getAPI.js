export function getAPI(url) {
    return fetch(url).then((result) => result.json());
}