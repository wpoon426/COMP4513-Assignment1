const express = require('express');
const router = express.Router();
const handleError = require('../handler/handleError');


// Return all drivers
router.get('/', async (req, res) => {
    try {
        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from f1-server.js
            .from('drivers')
            .select();

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get drivers");
    }
});

// returns a specified driver by driverRef
router.get('/:ref', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('drivers')
            .select()
            .ilike('driverRef', req.params.ref);

        
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: 'No drivers found' });
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get drivers");
    }
});

// // returns the drivers whose surname begins with the provided substring
router.get('/search/:string', async (req, res) => {
    try {
        const string = req.params.string;// Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from f1-server.js
            .from('drivers')
            .select()
            .ilike('surname', `${string}%`);

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "drivers not found." }); 
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get drivers");
    }
});


router.get('/race/:raceId', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('results')
            .select(`drivers(*)`)
            .eq('raceId', req.params.raceId)
            
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Drivers not found." });
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get Drivers");
    }
});



module.exports = router;