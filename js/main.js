const APIKEY = "f8fd464980c19dd8d5963ae229f2d032";

// DATE ET HEURE
const TODAY = new Date();
const DATE = TODAY.toLocaleDateString('fr-fr', { weekday:"long", year:"numeric", month:"long", day:"numeric"}); 
const TIME = TODAY.getHours()+ " : " + TODAY.getMinutes();

document.querySelector('#currentDate').innerHTML = DATE;
document.querySelector('#currentTime').innerHTML = TIME;

/**
 * APPEL A L'API openWeather avec ville en paramètre de fonction
 */
let apiCall = function(city){
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=fr`;

    // Récupération des données de l'API
    fetch(url).then((response) => 
        response.json().then((data) => {
            // Récupération des éléments du DOM dans lesquels je vais envoyer les data de l'API
            document.querySelector('#cityName').innerHTML = data.name ;
            document.querySelector('#rise').innerHTML = data.sys.sunrise ;
            document.querySelector('#set').innerHTML = data.sys.sunset ;
            document.querySelector('#temp').innerHTML = data.main.temp + '°' ;
            document.querySelector('#description').innerHTML = data.weather[0]["description"];
            document.querySelector('#tempMax').innerHTML = data.main.temp_max + '°'  ;
            document.querySelector('#tempMin').innerHTML = data.main.temp_min + '°'  ;
        })
    // Gestion des erreurs
    ).catch(err => console.log('Erreur : '+ err));  
};      

// Ecouteur d'évènement sur l'input
document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault();
    let cityFromInput = document.querySelector('#inputLocation').value;

    apiCall(cityFromInput);
})
