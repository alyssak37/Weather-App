// constants and variables 
const{openWeatherAPIKey} = CONFIG;

const API_KEY = CONFIG.openWeatherAPIKey;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

let weatherData;
// cached elements references
const $title = $('#title');
const $temp = $('#temp');
const $index = $('#index');
const $desc= $('#desc');
const $form = $('form');
const $input = $('input[type="text"]');


// Event listeners

$form.on('submit', handleGetData);
//functions

//q={city name}&appid={API key}

function handleGetData(event) {
    event.preventDefault();

    const input = $input.val();

    if(!input) return;
    //'appid=' + API_KEY + '&q=' + input +'&units=imperial'
    $.ajax(BASE_URL + 'appid=' + API_KEY + '&q=' + input +'&units=imperial') 
    .then(function(data){
        //console.log('Data:', data);

        weatherData = data;
        render(); 
        
        
    }, function(error) {
        console.log('Error:', error);
    });
}


function render(){
    $title.text(`Weather For: ${weatherData.name}`);
    $temp.html(`Temperature: ${Math.floor(weatherData.main.temp)} &deg;`);
    $index.html(`Feels Like: ${Math.floor(weatherData.main.feels_like)} &deg;`);
    $desc.text(`Weather: ${weatherData.weather[0]["description"]}`);
}

