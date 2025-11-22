const API_KEY = "6865a526b17dd123624596aa722836b0"; // आपकी API Key

const searchBtn = document.getElementById("searchBtn");
const search = document.getElementById("search");

// इवेंट लिसनर
searchBtn.addEventListener("click", () => {
    let city = search.value.trim();
    if (city !== "") {
        getWeather(city);
        // Note: आपने getForecast() को भी कॉल किया है, लेकिन आपने उसकी परिभाषा नहीं दी है।
        // अगर आपको 5 दिन का फोरकास्ट नहीं चाहिए, तो इसे हटा दें।
        // getForecast(city); 
    }
});

async function getWeather(city) {
    let url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        let res = await fetch(url);
        let data = await res.json();

        if (res.status !== 200) {
            // यदि शहर नहीं मिला या कोई अन्य त्रुटि हुई
            document.querySelector(".city-name").innerText = "शहर नहीं मिला!";
            document.querySelector(".temperature").innerText = "--";
            document.querySelector(".weather-type").innerText = "कृपया सही नाम दर्ज करें।";
            document.getElementById("weatherIcon").src = "";
            document.getElementById("feelsLike").innerText = "--";
            document.getElementById("humidity").innerText = "--";
            document.getElementById("wind").innerText = "--";
            document.querySelector(".date-time").innerText = "";
            return;
        }

        // डेटा को HTML तत्वों में अपडेट करें
        document.querySelector(".city-name").innerText = data.name + ", " + data.sys.country;
        document.querySelector(".temperature").innerText = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".weather-type").innerText = data.weather[0].description;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("feelsLike").innerText = Math.round(data.main.feels_like);
        document.getElementById("humidity").innerText = data.main.humidity;
        // हवा की गति को मीटर/सेकंड से किलोमीटर/घंटा में बदलें (OpenWeatherMap डिफ़ॉल्ट रूप से m/s में देता है)
        document.getElementById("wind").innerText = (data.wind.speed * 3.6).toFixed(1); 

        let now = new Date();
        document.querySelector(".date-time").innerText =
            now.toDateString() + " | " + now.toLocaleTimeString();

    } catch (error) {
        console.error("मौसम डेटा फ़ेच करने में त्रुटि:", error);
    }
}

// डिफ़ॉल्ट शहर के लिए पहली बार कॉल
getWeather("Navsari");