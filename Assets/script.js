const API_KEY = "6865a526b17dd123624596aa722836b0"; 

const searchBtn = document.getElementById("searchBtn");
const search = document.getElementById("search");

searchBtn.addEventListener("click", () => {
    let city = search.value.trim();
    if (city !== "") {
        getWeather(city);
         
    }
});

async function getWeather(city) {
    let url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        let res = await fetch(url);
        let data = await res.json();

        if (res.status !== 200) {
           
            document.querySelector(".city-name").innerText = "City Was Not Found!";
            document.querySelector(".temperature").innerText = "--";
            document.querySelector(".weather-type").innerText = "Enter VAlid Name";
            document.getElementById("weatherIcon").src = "";
            document.getElementById("feelsLike").innerText = "--";
            document.getElementById("humidity").innerText = "--";
            document.getElementById("wind").innerText = "--";
            document.querySelector(".date-time").innerText = "";
            return;
        }

        
        document.querySelector(".city-name").innerText = data.name + ", " + data.sys.country;
        document.querySelector(".temperature").innerText = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".weather-type").innerText = data.weather[0].description;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("feelsLike").innerText = Math.round(data.main.feels_like);
        document.getElementById("humidity").innerText = data.main.humidity;
        
        document.getElementById("wind").innerText = (data.wind.speed * 3.6).toFixed(1); 

        let now = new Date();
        document.querySelector(".date-time").innerText =
            now.toDateString() + " | " + now.toLocaleTimeString();

    } catch (error) {
        console.error("मौसम डेटा फ़ेच करने में त्रुटि:", error);
    }
}


getWeather("Navsari");