const express = require('express');
const router = express.Router();
const handleError = require('../handler/handleError');


// Return all specific races
router.get('/:raceId', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('circuits')
            .select('name, location, country')
            .order('name', { ascending: true });
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get races");
    }
});

// Returns the races within a given season ordered by round
router.get('/season/:year', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('races')
            .select(`
            `)
            .eq('year', req.params.year)
            .order('round', { ascending: true });
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Races not found." });
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get race");
    }
});



//Returns a specific race within a given season specified by the round number
router.get('/season/:year/:round', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('races')
            .select(`
                raceId,
                year,
                round,
                name,
                date,
                time,
                url,
                circuits (
                    circuitId,
                    name,
                    location,
                    country
                )
            `)
            .eq('year', req.params.year)
            .eq('round', req.params.round)
            .single(); //Only want one race, so I use this one 

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Races not found." });
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get race");
    }
});


//Returns all the races for a given circuit
router.get('/circuits/:circuitRef', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('races')
            .select(`
                raceId,
                year,
                round,
                name,
                date,
                time,
                circuits!inner (
                    circuitId,
                    circuitRef,
                    name
                )
            `)
            .eq('circuits.circuitRef', req.params.circuitRef)
            .order('year', { ascending: true });

            if (data.length === 0) {  // Check for empty data array
                return res.status(404).json({ message: "Races not found." });
            }



        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get races");
    }

});



//Returns all the races for a given circuit between two years
router.get('/circuits/:circuitRef/season/:year1/:year2', async (req, res) => {

    try {
        const { data, error } = await req.app.get('supabase')
            .from('races')
            .select(`
                raceId,
                year,
                round,
                name,
                date,
                time,
                circuits!inner (
                    circuitId,
                    circuitRef,
                    name
                )
            `)
            .eq('circuits.circuitRef', req.params.circuitRef)
            .gte('year', req.params.year1)
            .lte('year', req.params.year2)
            .order('year', { ascending: true });


            if (data.length === 0) {  // Check for empty data array
                return res.status(404).json({ message: "Races not found." });
            }


        res.send(data);


    } catch (err) {
        handleError(res, err, "Failed to get races");
    }


});





module.exports = router;