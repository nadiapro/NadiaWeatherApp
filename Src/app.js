let searchForm = document.querySelector('#searchForm');
let apiKey = 'obfc8931a156c82tbca302f27e893d4a';

searchForm.addEventListener('submit', getCity);

function getCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector('#searchInput').value;
    getData(searchInput);
}
function getData(city) {
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(url).then(checkData);
}
function checkData(response) {
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
}

function formatDate(dateTime) {
    let thisDateTime = new Date(dateTime);
    let day = ['SaturDay', 'SunDay', 'MonDay', 'TuesDay', 'WednesDay', 'ThursDay', 'FriDay'];
    let min = thisDateTime.getMinutes();
    let hour = thisDateTime.getHours();
    let date = day[thisDateTime.getDay()];
    return date + '  ' + hour + ':' + min;
}
getData('Tehran');