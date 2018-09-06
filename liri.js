require("dotenv").config();
var request = require("request");
var Spotify = require('node-spotify-api');
var keyFile = require("./keys.js");
var inputString = process.argv;
var operand = inputString[2];
var inputName = inputString.slice(3).join(" ");
// // for (var key in keyFile){
// //     console.log(key + keyFile.spotify)
// // }
var spotify = new Spotify(keyFile.spotify)
// console.log(spotify)



// songArg = process.argv;
// var songName = " ";

// for(var i=0; i< songArg.length; i++){
//          if (i > 3 && i < songArg.length){
//              songName = songName + "+" + songArg[i];
//             console.log(songName)
//          }else{
//              songName += songArg[i];
            
//          }
//      }
var spotifyIt = function(){
    spotify.search({
    type: 'artist',
    query: inputName
    }, function(err, data) {
    console.log("******Spotify Response******");
    console.log(data);
    
    if (err) {
    console.log(err);
    
}
    })}
// var spotUrl = "https://api.spotify.com/v1/search?q=" + inputName + "&" + spotify;
// console.log(spotUrl)
// request(spotUrl, function(error, response, body){
        
        //   if(!error && response.statusCode === 200){
        //       var songInfo = JSON.parse(body);
        //       console.log(songInfo)
            
        //   }
        //  })
        // }




// var inputName = "";
// for(var i=0; i< userInput.length; i++){
//     if (i > 3 && i < userInput.length){
//         inputName = inputName + "+" + userInput[i];
        
//     }else{
//         inputName += userInput[i];
        
//     }
// }

if (operand === "movie-this"){
    movieIt();
}else if(operand === "concert-this"){
    concertIt();

}else if(operand === "spotify-this"){
    spotifyIt()
}

function movieIt(){
var movieUrl = "http://www.omdbapi.com/?t="+ inputName + "&apikey=trilogy"

request(movieUrl, function(error, response, body){
    
    if(!error && response.statusCode === 200){
        var movieInfo = JSON.parse(body);
        if (inputName == false){
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
// var bandArgs = process.argv;
// var artist = "";

// for(var i=2; i< bandArgs.length; i++){
//     if (i > 2 && i < bandArgs.length){
//         artist = artist + "+" + bandArgs[i];
//     }else{
//         artist += bandArgs[i];
//     }
// }
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









