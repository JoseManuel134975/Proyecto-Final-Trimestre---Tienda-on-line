export async function getAPI(url) {
    const result = await fetch(url);
    return await result.json();
}
