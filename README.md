# Intro
This project was a great chance for me to do some development work on a relatively unstructured task. It allowed me to get away from the school work that’s been otherwise keeping me busy, so I enjoyed doing it for that! Though I didn’t flesh this out as much as I would’ve liked, mostly because of a hectic end-of-semester week, I was able to accomplish the main goals of the project and outline a lot of neat features that I would implement given a few more hours to work on this.

## Parsing Data
The first task I knew I needed to handle was getting the data into a manipulatable format. To accomplish this, I scanned through the data, looked over the dataset README for fields and structure, and  decided to build City objects out of each line. These would then be stored in a dict (I realized no database would be needed since ~120,000 is a pretty reasonable size) and would be accessed by ID. Building up the dict once at startup (taking ~1 sec to read in all data) would allow me to make quick computations once every city was already in memory.

## Lexical Query
After building the dict of cities, I needed to implement the queries. The lexical query was implemented somewhat simply, a function just brute-force checking all names against the query words, then returning the list of cities that match. The querying is case-sensitive. Because I wasn’t exactly sure the best way to handle alternate names in conjunction with multiple-word queries, if the alternate names contain a subset of the query words, they will be returned as part of the answer. The exact functionality of the lexical query is contained to one function so I wasn’t super worried about getting it perfect. For now, if you know the city name you’re looking for, or a nickname, you will likely be able to find it and the additional fields displayed help assist in that search. 

## Proximal Query
The proximal query was a bit more complex. Once I realized I shouldn’t pre-compute every distance between cities (100,000^2 is big), I knew I would have to take a given city and compute the distance between it and every other city, then sort them and choose the top K. Though sorting 100k objects is not bad, I went with a heap method because for values of k much less than n, O(n log k) < O(n log n). 

The last thing to consider was how to compute the distance metric. I learned that the simple 2D distance formula would not work as the Earth is spherical, so I discovered the Haversine method for calculating distance and ported some code that seemed to give accurate distance comparisons between cities.

## API
The API was build with Flask, as it’s a very simple framework that seemed well suited for a couple simple routes, and is also one I have a lot of experience with!
When the Flask server boots up, it initializes a CityHandler object (which loads up all cities), and creates two routes (for each query). The two routes parse the arguments coming from the API requests, calls the corresponding query methods implemented by CityHandler, and returns the result after converting the city objects to JSON.

## UI
The UI was developed with React, as it’s the only web framework I really have experience with, besides vanilla JS + HTML. I built up a couple components, mainly the two Query/Search bars for Lexical & Proximal, then Cities/City components to display the city results. This is when I decide to show some additional City parameters like Population & Country Segment to give some additional context to the cities. 
It had been a while since I touched React (nearly a year), but since the UI was pretty straightforward I was able to re-acquaint myself without too much trouble.
In order to make things look nice I incorporated Google’s Material UI so my components would look like a little more professional.  

## Deployment
To make this a true full-stack project, I wanted to deploy this to the internet to use my DevOps skills in there somewhere. I’ve been using AWS for my personal projects recently so a micro EC2 instance was the natural choice to host this. I setup a nginx web server that redirected traffic to the React port, started the required processes (flask + React), and it was running. Finally, I redirected a domain I own (ebatsell.com) to the IP of the server.

## Future Additions
As I was building this, I gave a few stretch goals for myself that I unfortunately didn’t implement, but these are the features I would do next given more time to work on this project.

### Additional UI Features
* Enable sorting of data by several different factors:
 - Population
 - Id
 - Alphabetical
 - Your current distance to the city
     - Access the user’s location via browser (“Geo API wants to know your location”)
    - Do the sorting within the frontend in order to reduce number of additional queries
 - Sorting would be independent of query, as it would be a feature of the table 
- Google Maps integration: use the Latitude and Longitude to plot a number of cities on an embedded Google Maps map in the page - would be really interesting for the Proximal queries…

### Additional Query Features
- Add a “lower bound” on population in order to filter out small-town cities or  small suburbs, so you only get the more relevant cities you want to know about

### Software Engineering Improvements
- Error handling, i.e. notify the user when a City ID does not exist or there is some internal server error instead of doing nothing
- Unit tests
    - One set for API routes
    - One set for the queries, to ensure that if I am refactoring the City code to improve performance, I won’t break the underlying functionality
* Google Analytics on the website to see amount of usage
* Use pylint and eslint to improve code quality… 
