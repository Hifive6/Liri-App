require("dotenv").config();
//Grabbing data api and key.js
var request = require("request");
var Spotify = require('node-spotify-api');
var keyFile = require("./keys.js");
var fs = require('fs');
//my arguements arrary
var inputString = process.argv;
var operand = inputString[2];
var inputName = inputString.slice(3).join(" ");
//if else statements to call the correct command
if (operand === "movie-this"){
    movieIt();
}else if(operand === "concert-this"){
    concertIt();

}else if(operand === "spotify-this"){
    spotifyIt()
}


//function for when spotify command will run
function spotifyIt(){
    var spotify = new Spotify(keyFile.spotify)
    spotify.search({
    type: 'track',
    query: inputName
    }, function(err, data) {
    
    console.log(data);
    
    if (err) {
    console.log(err);
    
}
    })}


//function for when the movie command will run
function movieIt(){
var movieUrl = "http://www.omdbapi.com/?t="+ inputName + "&apikey=trilogy"

request(movieUrl, function(error, response, body){
    
    if(!error && response.statusCode === 200){
        var movieInfo = JSON.parse(body);
        if (!inputName){
            nobodyUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"
            request(nobodyUrl, function(error, response, body){
                if(!error && response.statusCode === 200){
                    var nobodyMovie = JSON.parse(body);
                    console.log(`
        Title:                    ${nobodyMovie['Title']} (${nobodyMovie['Year']})
        IMDB Rating:              ${nobodyMovie['imdbRating']}
        Rotten Tomatoes Rating:   ${nobodyMovie['Ratings'][1]['Value']}
        Country Produced in:      ${nobodyMovie['Country']}
        Language:                 ${nobodyMovie['Language']}
        Actors:                   ${nobodyMovie['Actors']}
        Plot:                     \n${nobodyMovie['Plot']}
          
                    `);
                }
            })
            
            console.log("If you haven't Watch Mr.Nobody you should, it's on Netflix!")
        }else{
       
       console.log(`
       Title:                    ${movieInfo['Title']} (${movieInfo['Year']})
       IMDB Rating:              ${movieInfo['imdbRating']}
       Rotten Tomatoes Rating:   ${movieInfo['Ratings'][1]['Value']}
       Country Produced in:      ${movieInfo['Country']}
       Language:                 ${movieInfo['Language']}
       Actors:                   ${movieInfo['Actors']}
       Plot:                     \n${movieInfo['Plot']}
            
       `)
    }
    
    }
})
}
//function for when the concert command is ran
function concertIt(){
var bandUrl = "https://rest.bandsintown.com/artists/" + inputName + "/events?app_id=codingbootcamp"

request(bandUrl, function(error, response, body){
    
    if(!error && response.statusCode === 200){
        var artistInfo = JSON.parse(body);
        
        console.log(`
        Location:      ${artistInfo[0]['venue']['city']}, ${artistInfo[0]['venue']['region']}, ${artistInfo[0]['venue']['country']}
        Venue Name:    ${artistInfo[0]['venue']['name']},
        //have to add moment for this to change format to mm/dd/yyyy
        Event Date:    ${artistInfo[0]['datetime']},

        `)
    }
})
}









