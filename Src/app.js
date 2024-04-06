function formatDate(dateTime) {
    let thisDateTime = new Date(dateTime * 1000);
    let day = ['SunDay', 'MonDay', 'TuesDay', 'WednesDay', 'ThursDay', 'FriDay', 'SaturDay'];
    let min = thisDateTime.getMinutes();
    let hour = thisDateTime.getHours();
    let date = day[thisDateTime.getDay()];
    if (min < 10) {
        min = `0${min}`;
    }
    return date + '  ' + hour + ':' + min;
}
function getDay(timestamp) {
    let dateTime = new Date(timestamp * 1000);
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let date = days[dateTime.getDay()];
    return date;
}
function fillForecast(response) {
    let forecast = document.querySelector('#forecast');
    forecast.innerHTML = "";
    response.data.daily.forEach(function (element, index) {
        if (index < 5) {
            let thisNode = `<div class="forecastEachDay"">
                    <p>${getDay(element.time)}</p>
                    <img src="${element.condition.icon_url}" />
                    <p class="forecastTemp"><span class="maxTemp">${Math.round(element.temperature.maximum)} &deg</span> <span>${Math.round(element.temperature.minimum)} &deg</span></p>
                </div>`;
            forecast.innerHTML += thisNode;
        }
    });
};
function getForecast(city) {
    let apiKey = 'obfc8931a156c82tbca302f27e893d4a';
    let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios(url).then(fillForecast);
}
function fillData(response) {
    let city = document.querySelector('#city');
    let tempValue = document.querySelector('#tempValue');
    let tempIcon = document.querySelector('#tempIcon');
    let country = document.querySelector('#country');
    let description = document.querySelector('#description');
    let humidity = document.querySelector('#humidity');
    let feels_like = document.querySelector('#feels_like');
    let pressure = document.querySelector('#pressure');
    let windSpeed = document.querySelector('#windSpeed');
    let dateTime = document.querySelector('#dateTime');
    if (response.data.status == "not_found") {
        city.innerHTML = response.data.message;
        tempValue.innerHTML = '';
        tempIcon.innerHTML = '';
        country.innerHTML = '';
        description.innerHTML = '';
        humidity.innerHTML = '';
        feels_like.innerHTML = '';
        pressure.innerHTML = '';
        windSpeed.innerHTML = '';
        dateTime.innerHTML = '';
    }
    else {
        city.innerHTML = response.data.city;
        tempValue.innerHTML = Math.round(response.data.temperature.current);
        tempIcon.innerHTML = `<img src=${response.data.condition.icon_url}>`;
        country.innerHTML = response.data.country;
        description.innerHTML = response.data.condition.description;
        humidity.innerHTML = response.data.temperature.humidity + '%';
        feels_like.innerHTML = response.data.temperature.feels_like;
        pressure.innerHTML = response.data.temperature.pressure;
        windSpeed.innerHTML = response.data.wind.speed + 'km/h';
        dateTime.innerHTML = formatDate(response.data.time);
    }
    getForecast(response.data.city);
}
function getData(city) {
    let apiKey = 'obfc8931a156c82tbca302f27e893d4a';
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios(url).then(fillData);
}
function getCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector('#searchInput').value;
    getData(searchInput);
}
let searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', getCity);
getData('Tehran');