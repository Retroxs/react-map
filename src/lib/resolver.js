async function fetchData(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const fetchMarkers = () => fetchData('/api/manager/equipment/map/all');
export const fetchInfo = id => fetchData(`/api/manager/equipment/map/detail/${id}`);
