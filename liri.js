require("dotenv").config();

// var spotify = require("./keys.js");

var request = require("request");
var inputString = procsss.argv;
var operand = inputString[2];
var userInput = inputString[3]

var inputName = "";
for(var i=2; i< Userinput.length; i++){
    if (i > 2 && i < userInput.length){
        inputName = inputName + "+" + userInput[i];
    }else{
        inputName += userInput[i];
    }
}

if (operand === "movie-this"){
    movieIt();
}else if(operand === "concert-this"){
    theBand();

}
function movieIt(){
var movieUrl = "http://www.omdbapi.com/?t="+ movieName + "&apikey=trilogy"

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
        Plot:                     ${nobodyMovie['Plot']}
          
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
// var bandArgs = process.argv;
// var artist = "";

// for(var i=2; i< bandArgs.length; i++){
//     if (i > 2 && i < bandArgs.length){
//         artist = artist + "+" + bandArgs[i];
//     }else{
//         artist += bandArgs[i];
//     }
// }
function theBand(){
var bandUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

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









