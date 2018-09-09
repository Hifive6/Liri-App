# Liri-App

This application was created as an assignment for week 10, using Node.js. The assignment was to challenge us to create an application much like the Iphone's siri, except using language through the command line. The application would take in these commands:
<concert-this>
<spotify-this>
<concert-this>
<do-what-it-says>

How it Works
Each command when called in the command line and a given a topic with the command would then output information.

node liri.js concert-this <artist/band name here>

Would provide you with this information

* Name of the venue
* Venue location
* Date of the Event (use moment to format this as "MM/DD/YYYY")

node liri.js spotify-this-song '<song name here>'

Information provided would be

Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

node liri.js movie-this '<movie name here>'

Information provided would be
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

node liri.js do-what-it-says

LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

Liri will take the information and spotify it

Tech used
*   Node.js
*   Request NPM Package
*   Spotify NPM Package
*   Moment NPM Package
*   Chalk NPM Package

David Juarez was the only contributor
