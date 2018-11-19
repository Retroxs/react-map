async function fetchData(url,data) {
    const  _options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const options = data?_options:{}
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
}


export const fetchOverview = region => fetchData('/api/map/overview',{region});
export const fetchMarkers = region => fetchData('/api/map/points',{region});
export const fetchInfo = id => fetchData(`/api/map/point/${id}`);
export const fetchEffective = region => fetchData(`/api/map/effective`,{region});
