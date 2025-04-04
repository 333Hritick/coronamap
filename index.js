// Fetch function to get the data
async function fetchCovidData() {
    try {
        const response = await fetch('data1.json'); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;  
    } catch (error) {
        console.error('Fetch error:', error);
        return []; 
    }
}

// Function to update the map with markers
async function updateMap() {
    const covidData = await fetchCovidData(); 
    covidData.forEach(stateData => {
        const { state, latitude, longitude, total_deaths } = stateData;

        
        if (latitude && longitude) {
            
            const markerColor = total_deaths > 1000 ? 'red' : 'green';//this (?) is shortcut for if and else statement and directly check weather it is greater or smaller

            // Create the marker and set its properties
            new mapboxgl.Marker({
                color: markerColor, 
            })
                .setLngLat([longitude, latitude]) // Set marker position
                .setPopup(new mapboxgl.Popup({
                    offset:25
                }).setHTML(`<h3>${state}</h3>
                                                        <p>Total Cases: ${stateData.total_cases}</p>
                                                        <p>Total Deaths: ${stateData.total_deaths}</p>
                                                        <p>Active Cases: ${stateData.active_cases}</p>
                                                        <p>Recovered: ${stateData.recovered}</p>`))
                .addTo(map); 
        }
    });
}


map.on('load', function () {
    updateMap(); 
});
