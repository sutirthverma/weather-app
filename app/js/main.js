let cityName = 'Shimla';
const apiKey = '77ecf494908f0f2369c8ffcb2a8b651f';
let baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

let textField = document.querySelector('input');
let search = document.querySelector('.search');
let searchButton = document.querySelector('.search-icon');


let degree = document.querySelector('h1');
let city = document.querySelector('h2');
let humidity = document.querySelector('.humidity-value');
let wind = document.querySelector('.wind-value');
let weatherImage = document.querySelector('.weather-image');

searchButton.addEventListener('click', async function () {
    if (search.textContent != '') {
        fetchWeather(textField.value);
    } else {
        alert('Please enter city name')
    }

})

async function fetchWeather(c_name) {
    cityName = c_name;
    baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    return await fetch(baseURL)
        .then((res) => {
            if (!res.ok) {
                throw new Error('City not found')
            }

            return res.json();
        })
        .then((data) => {
            degree.innerHTML = `${Math.floor(data.main.temp - 273.15)}&deg;C`;
            city.textContent = data.name;
            humidity.textContent = data.main.humidity;
            wind.textContent = data.wind.speed;
            weatherImage.src = weatherType(data.weather[0].main);

        })
        .catch((err) => alert(err))
}

function weatherType(type) {
    switch (type) {
        case 'Clear':
            return './assets/clear.png';

        case 'Clouds':
            return './assets/clouds.png';

        case 'Drizzle':
            return './assets/drizzle.png';

        case 'Mist':
            return './assets/mist.png';

        case 'Rain':
            return './assets/rain.png';

        case 'Snow':
            return './assets/snow.png';
    }
}