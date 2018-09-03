require("dotenv").config();
var request = require("request");
// var spotify = require("./keys.js");


var nodeArgs = process.argv
var movieName = "";
for(var i=2; i< nodeArgs.length; i++){
    if (i > 2 && i < nodeArgs.length){
        movieName = movieName + "+" + nodeArgs[i];
    }else{
        movieName += nodeArgs[i];
    }
}

var queryUrl = "http://www.omdbapi.com/?t="+ movieName + "&apikey=trilogy"

request(queryUrl, function(error, response, body){
    
    if(!error && response.statusCode === 200){
        var movieInfo = JSON.parse(body);
        if (!movieName){
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






