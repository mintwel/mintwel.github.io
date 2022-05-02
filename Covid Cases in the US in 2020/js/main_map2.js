mapboxgl.accessToken =
'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
let map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v10\1',
zoom: 4, // starting zoom
center: [-100, 40], // starting center
projection: 'albers' // make map albers projection 
});

async function geojsonFetch() {
  //
};

let response = await fetch('assets/us-covid-2020-rates.json');
let us-covid-2020-rates = await response.json();

//load data to the map as new layers.
//map.on('load', function loadingData() {
map.on('load', function loadingdata() => { //simplifying the function statement: arrow with brackets to define a function

// when loading a geojson, there are two steps
// add a source of the data and then add the layer out of the source
map.addSource('us-covid-2020-rates', {
    type: 'geojson',
    data: 'assets/us-covid-2020-rates.json'
});

map.addLayer({
        'id': 'us-covid-2020-rates',
        'type': 'fill',
        'source': 'us-covid-2020-rates',
        'paint': {
            // increase the radii of the circle as the zoom level and dbh value increases
            'fill-color': {
                'step',
              ['get', 'rates'],
                '#feebe2', // stop_output_0
                        21, // stop_input_0
                        '#fcc5c0', // stop_output_1
                        41, // stop_input_1
                        '#fa9fb5', // stop_output_2
                        61, // stop_input_2
                        '#f768a1', // stop_output_3
                        91, // stop_input_3
                        '#dd3497', // stop_input_4
                        131, // stop_input_4
                        '#ae017e', // stop_output_5
                        171, // stop_input_5
                        "#7a0177", // stop_output_6
                        201, // stop_input_6
                        "#b10026", // stop_output_7
        
                    ],
                    'fill-outline-color': '#BBBBBB',
                    'fill-opacity': 0.7,
            },

);

          const layers = [
            '0-20',
            '21-40',
            '41-60',
            '61-90',
            '91-130',
            '131-170',
            '171-200',
            '201 and more'
        ];
        const colors = [
            '#feebe270',
            '#fcc5c070',
            '#fa9fb570',
            '#f768a170',
            '#dd349770',
            '#ae017e70',
            '#7a017770',
            '#b1002670'
        ];
             
        // create legend
        const legend = document.getElementById('legend');
        legend.innerHTML = "<b>COVID-19 Rates" + source;
        
        layers.forEach((layer, i) => {
            const color = colors[i];
            const item = document.createElement('div');
            const key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;
        
            const value = document.createElement('span');
            value.innerHTML = `${layer}`;
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
        });

map.on('mousemove', ({point}) => {
            const state = map.queryRenderedFeatures(point, {
                layers: ['covidrates-layer']
            });
            document.getElementById('text-description').innerHTML = state.length ?
                `<h3>${state[0].properties.name}</h3><p><strong><em>${state[0].properties.density}</strong> cases per 1000 people</em></p>` :
                `<p>Hover over a county!</p>`;
        });

});


const source =
'<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">The New York Times<a/> </p>';

legend.innerHTML = labels.join('') + source;

geojsonFetch();
