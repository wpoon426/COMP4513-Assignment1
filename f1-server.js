const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express()

// APIKEY and URL for supabase sitting in .env file
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xendtcW54dXp1Z3BoZ3JiZ3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDk2MTYsImV4cCI6MjA3NjI4NTYxNn0.Y9KSXL3eyvKh2-tG0J8BkdKn03B-N8geG58kh5Ez3DE';
const URL = 'https://oqzwmqnxuzugphgrbgwv.supabase.co';
const supabase = supa.createClient(URL, anonKey)

// Make supabase instance available to all instances
app.set('supabase', supabase); 

// Import modules of all routes
const circuitsRoutes = require('./routes/circuits');
const constructorsRoutes = require('./routes/constructors');
const driversRoutes = require('./routes/drivers');
const raceRoutes = require('./routes/races');
const resultsRoutes = require('./routes/results');
const qualifyRoutes = require('./routes/qualifying');
const standingRoutes = require('./routes/standings');



// Mount the specific routes with the respective API route calls
app.use('/api/circuits', circuitsRoutes);
app.use('/api/constructors', constructorsRoutes);
app.use('/api/drivers', driversRoutes);
app.use('/api/races', raceRoutes);
app.use('/api/results', resultsRoutes);
app.use('/api/qualifying', qualifyRoutes);
app.use('/api/standings', standingRoutes);




// Run the server locally
app.listen(8080, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080/api/circuits');
    console.log('http://localhost:8080/api/circuits/monaco');
    console.log('http://localhost:8080/api/circuits/season/2020');
    console.log('http://localhost:8080/api/constructors');
    console.log('http://localhost:8080/api/constructors/mclaren');
    console.log('http://localhost:8080/api/drivers');
    console.log('http://localhost:8080/api/drivers/hamilton');
    console.log('http://localhost:8080/api/drivers/search/sch');
    console.log('http://localhost:8080/api/drivers/race/1106'); //some data in the results table did not load in, and does not work, so it is not found (use a smaller raceID, max is 703)
    console.log('http://localhost:8080/api/races/12');
    console.log("http://localhost:8080/api/races/season/2020");
    console.log("http://localhost:8080/api/races/season/2022/4");
    console.log("http://localhost:8080/api/races/circuits/monza");
    console.log("http://localhost:8080/api/races/circuits/monza/season/2015/2020");
    console.log("http://localhost:8080/api/races/circuits/monza/season/2020/2020");
    console.log('http://localhost:8080/api/results/1106'); //the data in the results table did not load in correctly, and does not work, so it is not found (use a smaller ID)
    console.log('http://localhost:8080/api/results/driver/max_verstappen'); // not sure why, but does not work for max_verstappen, but does work for hamilton, and some others. 
    console.log('http://localhost:8080/api/results/driver/hamilton'); //I used hamilton instead, this one works  
    console.log('http://localhost:8080/api/results/drivers/sainz/seasons/2022/2022'); // this one does not work, theres no data for it as sainz doesn't exists, I think there is an error with the data. 
    console.log('http://localhost:8080/api/results/drivers/hamilton/seasons/2007/2009'); //this one works. 
    console.log('http://localhost:8080/api/qualifying/1106');
    console.log('http://localhost:8080/api/standings/drivers/1120');
    console.log('http://localhost:8080/api/standings/constructors/1120');





    







});


