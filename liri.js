require("dotenv").config();

//Grabbing data api and key.js
var moment = require("moment")
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require('fs');
var request = require("request");
const chalk = require("chalk")

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
function spotifyIt(inputName) {
    //if statement if there is not song placed after the command
    if (!inputName) {
        inputName = "Ace of Base, The Sign"
    }
    spotify.search({
        type: 'track',
        query: inputName,
        limit: 1,
    }, function (err, data) {
        if (err) {


            console.log("error occured" + err);
            return;
        } console.log(chalk.magentaBright(`
            
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

            Artist Name:        ${data['tracks']['items'][0]['artists'][0]['name']}
            Album Name:         ${data['tracks']['items'][0]['album']['name']}
            Song Name:          ${data['tracks']['items'][0]['name']}
            Preview Url:        ${data['tracks']['items'][0]['preview_url']}

            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            `))


    })
}





//function for when the movie command will run
function movieIt() {
    var movieUrl = "http://www.omdbapi.com/?t=" + inputName + "&apikey=trilogy"

    request(movieUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var movieInfo = JSON.parse(body);
            //if statement for when there is movie add with command
            if (!inputName) {
                nobodyUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy"
                request(nobodyUrl, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        var nobodyMovie = JSON.parse(body);
                        console.log(chalk.red(`
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        Title:                    ${nobodyMovie['Title']} (${nobodyMovie['Year']})
        IMDB Rating:              ${nobodyMovie['imdbRating']}
        Rotten Tomatoes Rating:   ${nobodyMovie['Ratings'][1]['Value']}
        Country Produced in:      ${nobodyMovie['Country']}
        Language:                 ${nobodyMovie['Language']}
        Actors:                   ${nobodyMovie['Actors']}
        Plot:                     \n${nobodyMovie['Plot']}
         
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    `));
                    }
                })
                console.log(chalk.cyan(`
                ${"If you haven't watched Mr.Nobody you should, it's on Netflix!"}`))
                //this info is for the movie entered by the user
            } else {

                console.log(chalk.green(`

       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

       Title:                    ${movieInfo['Title']} (${movieInfo['Year']})
       IMDB Rating:              ${movieInfo['imdbRating']}
       Rotten Tomatoes Rating:   ${movieInfo['Ratings'][1]['Value']}
       Country Produced in:      ${movieInfo['Country']}
       Language:                 ${movieInfo['Language']}
       Actors:                   ${movieInfo['Actors']}
       Plot:                     \n${movieInfo['Plot']}
       
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

       `))
            }

        }
    })
}
//function for when the concert command is ran
function concertIt() {
    var bandUrl = "https://rest.bandsintown.com/artists/" + inputName + "/events?app_id=codingbootcamp"
    //if statment to prompt user to add a band or artist to bring up the tour info
    if (!inputName) {
        console.log(chalk.yellow(`

            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            "Please add a band or artist"
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            `))
            
    }
    request(bandUrl, function (error, response, body) {
        
        if (!error && response.statusCode === 200) 

          var artistInfo = JSON.parse(body);
          
            var time = (Date.parse(artistInfo[0].datetime))
            eventTime = moment(time).format("MMM Do YYYY")
            console.log(chalk.blueBright(`
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        Location:      ${artistInfo[0]['venue']['city']}, ${artistInfo[0]['venue']['region']}, ${artistInfo[0]['venue']['country']}
        Venue Name:    ${artistInfo[0]['venue']['name']},
        Event Date:    ${eventTime},

        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        `))
        
        
    })
}
//this function will run when the do what it says command is ran
function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {


        if (error) {
            return console.log(error);
        }
        var data = data.replace('\"', " ")
        data = data.replace("\"", " ")
        var textInfo = data.split(",");
        spotifyIt(textInfo[1]);
    });

}









