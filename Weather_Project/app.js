//Added weather api key
const apiKey='b9a936bad0a87b14859630ce375bba6a'; 
// declaring the input,button,container
const cityInput=document.getElementById('cityInput');
const searchBtn=document.getElementById('searchBtn');
const currentLocBtn=document.getElementById('currentLocBtn');
const recentCities=document.getElementById('recentCities');
const weatherContainer=document.getElementById('weatherContainer');
const forestContainer=document.getElementById('forestContainer');

//adding event listener for search button,current location button & recent cities
searchBtn.addEventListener('click', ()=>{
    const city= cityInput.value.trim();
    if(!city) return alert("Please Enter a City Name");
    fetchWeatherByCity(city);
    updateRecentCities(city);
});

currentLocBtn.addEventListener('click',()=>{
    navigator.geolocation.getCurrentPosition((position) =>{
        const {latitude,longitude} = position.coords;
        fetchWeatherByCoords(latitude,longitude);
    },
    ()=> alert('Location access failed')
);
});

recentCities.addEventListener('change',()=>{
    const city=recentCities.value;
    if(city) fetchWeatherByCity(city);
});

//Update recent cities function to updating the cities data
function updateRecentCities(city)
{
    let cities=JSON.parse(localStorage.getItem('recentCities')) || [];
    if(!cities.includes(city))
    {
        cities.unshift(city);
        cities= cities.slice(0,5);
        localStorage.setItem('recentCities',JSON.stringify(cities));
        renderRecentCity();
    }
}

//function rendercities
function renderRecentCity()
{
    const cities= JSON.parse(localStorage.getItem('recentCities')) || [];
    recentCities.innerHTML= cities.map(city=>`<option value="${city}">${city}</option>`).join('');
    recentCities.classList.toggle('hidden',cities.length === 0);
}

//function fetchWeatherByCity
function fetchWeatherByCity(city)
{
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response=>{
            if(!response.ok) throw new Error('City not found');
            return response.json();
        })

        .then(data=>{
            renderWeather(data);
            fetchForecast(data.coord.lat, data.coord.lon);
        })

        .catch(err=>alert(err.message));
}

// function fetchWeatherByCoords for latitude & longitude
function fetchWeatherByCoords(lat,lon)
{
    const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response=>response.json())

        .then(data => {
            renderWeather(data);
            fetchForecast(lat,lon);
        });
}

//function renderWeather
function renderWeather(data)
{
    weatherContainer.innerHTML =`
    <h2 class="text-xl font-semibold mb-2">${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" />
    <p>${data.weather[0].description}</p>
    `;
}

function fetchForecast(lat,lon)
{
    const url=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data=>{
            const dailyData= {};
            data.list.forEach(item =>{
                const date=item.dt_txt.split(' ')[0];
                if(!dailyData[date]) dailyData[date] =[];
                dailyData[date].push(item)
            });

            const days= Object.keys(dailyData).slice(0,5);
            forestContainer.innerHTML= days.map(date =>{
                const items=dailyData[date];
                const midday= items[Math.floor(items.length / 2)];
                return ` 
                    <article class="bg-white p-4 rounded shadow">
                        <h3 class="font-semibold">${date}</h3>
                        <img src="http://openweathermap.org/img/wn/${midday.weather[0].icon}@2x.png" />
                        <p>Temp: ${midday.main.temp}°C</p>
                        <p>Wind: ${midday.wind.speed} m/s</p>
                        <p>Humidity: ${midday.main.humidity}%</p>
                    </article>
                    `;
            }).join('');
        });
}

// calling the function
renderRecentCity();