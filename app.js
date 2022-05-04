// Global variables
const root = document.querySelector(':root')
const body = document.body
const weather = document.getElementById("weather")
const time = document.getElementById("time")
const quote = document.getElementById("quote")


const background = async () => {
    try {
        const nasaApiUrl = "https://api.nasa.gov/"
        const nasaEndpoint = "planetary/apod"
        const nasaAPI = "?api_key=xbY5lNZZ5D35Q2YrTFL6Fs4Qsqi2ofqIZu6WEZSl"
        const thumbs = "&thumbs=true"
        
        const res = await fetch(`${nasaApiUrl}${nasaEndpoint}${nasaAPI}${thumbs}`)
        const data = await res.json()
        if ( data.error) { throw Error }

        back.innerHTML += `<q>${data.title}</q><small> - ${data.copyright}</small>`
        body.style.backgroundImage = `url(${data.url})`
    } catch(err) {
        body.style.backgroundImage = `url(https://apod.nasa.gov/apod/image/2107/neptunetriton_voyager_960.jpg)`
    }
}

navigator.geolocation.getCurrentPosition(async position => {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=211f1a76767b7ed7adb807c6d4b70761`)
        if ( !res.ok ) {
            throw Error("<span>Location data not available.</span><br />Please allow access to your location to see the weather.")
        }
        const data = await res.json()
        
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        weather.innerHTML = `
            <img class="weather-img" src=${iconUrl} alt="${data.weather[0].description} icon" />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
        `
    
    } catch(err) {
        weather.style.display = "block"
        weather.innerHTML = `<p class="error">${err}</p>`
    }
})

const getCurrentTime = () => {
    time.textContent = new Date().toLocaleTimeString("en-us", {timeStyle: "short"})
}

background()
setInterval(getCurrentTime, 1000)
getQuote()