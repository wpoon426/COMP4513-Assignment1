const express = require('express');
const router = express.Router();
const handleError = require('../handler/handleError');



router.get('/:raceId', async (req, res) => {
    try {

        const { data, error } = await req.app.get('supabase')
            .from('results')
            .select(`
                drivers!inner (
                    driverRef,
                    code,
                    forename,
                    surname
                ),
                races!inner (
                    name,
                    round,
                    year,
                    date
                ),
                constructors!inner (
                    name,
                    constructorRef,
                    nationality
                )
            `)
            .eq('raceId', req.params.raceId)
            .order('grid', { ascending: true });




            if (!data || data.length === 0) {
                return res.status(404).json({ message: 'No results found for this driver' });
            }


            

        res.send(data);



    } catch (err) {
        handleError(res, err, "Failed to get races");
    }
});


router.get('/driver/:ref', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('results')
            .select(`
                resultId, 
                number, 
                grid, 
                position, 
                positionText, 
                positionOrder, 
                points, 
                laps, 
                time, 
                milliseconds, 
                fastestLap, 
                rank, 
                fastestLapTime, 
                fastestLapSpeed,
                drivers!inner (
                    driverRef, 
                    code, 
                    forename, 
                    surname
                ),
                races (
                    name, 
                    round, 
                    year, 
                    date
                ),
                constructors (
                    name, 
                    constructorRef, 
                    nationality
                )
            `)
            .eq('drivers.driverRef', req.params.ref);


        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No results found for this driver' });
        }

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get drivers");
    }
});


router.get('/drivers/:driverRef/seasons/:year1/:year2', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('results')
            .select(`
                resultId, 
                number, 
                grid, 
                position, 
                positionText, 
                positionOrder, 
                points, 
                laps, 
                time, 
                milliseconds, 
                fastestLap, 
                rank, 
                fastestLapTime, 
                fastestLapSpeed,
                drivers!inner (
                    driverRef, 
                    code, 
                    forename, 
                    surname
                ),
                races!inner (
                    name, 
                    round, 
                    year, 
                    date
                ),
                constructors (
                    name, 
                    constructorRef, 
                    nationality
                )
            `)
            .eq('drivers.driverRef', req.params.driverRef)
            .gte('races.year', req.params.year1)
            .lte('races.year', req.params.year2);

            if (!data || data.length === 0) {
                return res.status(404).json({ message: 'No results found for this driver' });
            }


        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get driver results");
    }
});




module.exports = router;