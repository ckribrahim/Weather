const searchIcon = document.querySelector(".search-icon");
const inputBox = document.querySelector("#input-box");
const temperature = document.querySelector(".temperature")
const description = document.querySelector(".description");
const humidityDetail = document.querySelector(".humidity-detail span:first-child")
const windDetail = document.querySelector(".wind-detail span:first-child");
const imgOfWeather = document.getElementById("imgOfWeather");
const key = "c146ed2b92c96dabeb111ec922d9fde0";
searchIcon.addEventListener("click", getWeather)
function getWeather() {
    let city = inputBox.value;
    if (!city) {
        alert("Lutfen Gecerli bır şehir ismi giriniz")
    } else {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&units=metric&appid=${key}`;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod == "404") {
                    alert("Aradiginiz Sehir Bulunamadi")
                    return;
                }
                getDatas(data);
                document.querySelector(".container").style.height = "600px";
            })
    }
}
function getDatas(data) {
    temperature.innerHTML = `${data.main.temp}°C`;
    description.innerHTML = data.weather[0].description;
    humidityDetail.innerHTML = `${data.main.humidity}%`;
    windDetail.innerHTML = `${data.wind.speed}km/s`;
    getImage(data.weather[0].main);
}
function getImage(weatherDescription) {
    switch (weatherDescription) {
        case "Clear":
            imgOfWeather.setAttribute("src", "img/clear.png")
            break
        case "Rain":
            imgOfWeather.setAttribute("src", "img/rain.png")
            break
        case "Clouds":
            imgOfWeather.setAttribute("src", "img/cloud.png")
            break
        case "Haze":
            imgOfWeather.setAttribute("src", "img/mist.png")
            break
        case "Snow":
            imgOfWeather.setAttribute("src", "img/snow.png")
            break
    }
}
document.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        getWeather()
    }
})