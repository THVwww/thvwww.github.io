   const apiKey = "53fb39608b0a7e5790f5779c78b289b4";
   const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q=";

   const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon") 
    const locationsBtn = document.getElementById("locationBtn")

   async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status ==404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
         var data = await response.json();
         console.log(data)
     document.querySelector(".city").innerHTML = data.name;
     document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
     document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
     document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/h";
     document.querySelector(".feel").innerHTML = Math.round(data.main.feels_like) + "°c"
     

        if(data.weather[0].main == "Clouds"){
         weatherIcon.src = "images/cloudy.png";
     }
     else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/sun.png";
     }
     else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
     }
     else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
     }
     else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/fog.png";
     }
     else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png"
     }
     document.querySelector(".weather").style.display = "block";
       
     document.querySelector(".error").style.display = "none";
    }
    
    
    
}
async function getCity() {
        const response = await fetch('https://api.2ip.io/92.127.195.95?token=ieuf7qd178pows98&lang=ru');
        const data = await response.json();
        
        if (data.city) {
            return data.city;
        }
}

document.addEventListener('keydown', enter);
function enter(event) {
const keyPressed = event.keyCode;


if (keyPressed === 13){
checkWeather(searchBox.value)
}; 
}



   searchBtn.addEventListener("click", () =>{
    if(searchBox.value.length > 0){
      checkWeather(searchBox.value);
    }else{
         document.querySelector(".err").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
   });
   
   locationsBtn.addEventListener('click', async () => {
    const city = await getCity();
    
    if (city) {
        searchBox.value = city;  
        checkWeather(city);      
    } else {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
});


function getRandomNumber(min, max) {
return Math.random() * (max - min) + min;
}

function createStar()  {
const star = document.createElement('div');
star.classList.add('star');

const x = getRandomNumber(0, window.innerWidth);
const y = getRandomNumber(0, window.innerHeight);

const size = getRandomNumber(1, 1.5);
 
const opacity = getRandomNumber(0.5, 1);

star.style.left = x + 'px';
star.style.top = y + 'px';
star.style.width = size + 'px';
star.style.height = size + 'px';
star.style.opacity = opacity;

return star;
}

const starCount = 500;
const starContainer = document.body;

function animateStar(star){
    setInterval(() => {
        star.style.opacity = getRandomNumber(0.3, 1);
    }, getRandomNumber(1000, 10000));
}

for(let i = 0; i < starCount; i++){
    const star = createStar();
    animateStar(star);
starContainer.appendChild(star);
}

const blackhole = document.querySelector('.sun');


blackhole.addEventListener('click', function(){
    if(searchBox.value.length > 0){ 

    searchBox.classList.add('sucked-in');
    setTimeout(() => {
        document.querySelector(".weather").style.display = "none";
        searchBox.value = '';
        searchBox.classList.remove('sucked-in');
        searchBox.focus();
    }, 400);
}else {
        console.error('Элементы не найдены! Проверьте HTML.');
    }
})
