require("dotenv").config();
//Grabbing data api and key.js

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");
var fs = require('fs');
var request = require("request");
//my arguements arrary
var inputString = process.argv;
var operand = inputString[2];
var inputName = inputString.slice(3).join(" ");
var spotify = new Spotify(keys.spotify)
//if else statements to call the correct command
if (operand === "movie-this") {
    movieIt();
} else if (operand === "concert-this") {
    concertIt();

} else if (operand === "spotify-this") {
    spotifyIt(inputName)
} else if (operand === "do-what-it-says") {
    doWhat();
} else {
    console.log("Please enter a command: movie-this, concert-this, spotify-this, do-what-it-ways.")
}


//function for when spotify command will run
function spotifyIt (inputName) {
    // var spotify = new Spotify(keys.spotify
    // //     id: <your spotify client id>,
    // //     secret: <your spotify client secret>
    // //   });
    
    spotify.search({
        type: 'track',
        query: inputName,
        limit : 1,
    }, function (err, data) {
        if (err) {
            console.log(data)
            console.log("error occured" + err);
            return;
        }
       
        console.log(data.tracks.items[0].artists[0].name);

    
    })
}





//function for when the movie command will run
function movieIt() {
    var movieUrl = "http://www.omdbapi.com/?t=" + inputName + "&apikey=trilogy"

    request(movieUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var movieInfo = JSON.parse(body);
            if (!inputName) {
                nobodyUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"
                request(nobodyUrl, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
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
            } else {

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
function concertIt() {
    var bandUrl = "https://rest.bandsintown.com/artists/" + inputName + "/events?app_id=codingbootcamp"

    request(bandUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
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
//this function will run when the do what it says command is ran
function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var text = data;
        console.log(text)
    })
}









