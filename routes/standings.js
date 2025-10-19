const express = require('express');
const router = express.Router();
const handleError = require('../handler/handleError');

//Returns the current season driver standings table for the specified race
router.get('/drivers/:raceId', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('driver_standings')
            .select(`
                *,
                drivers!inner(
                driverRef, 
                code, 
                forename, 
                surname
                )
            `)
            .eq('raceId', req.params.raceId)
            .order('position', { ascending: true });

        if (!data || data.length === 0) {
            return res.status(404).json({
                error: `No driver standings found for race ${req.params.raceId}`
            });
        }

        res.json(data);
    } catch (err) {
        handleError(res, err, "Failed to get driver standings");
    }
});


//Returns the current season constructors standings table for the specified race
router.get('/constructors/:raceId', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('constructor_standings')
            .select(`
                *,
                constructors!inner(
                name, 
                constructorRef, 
                nationality
                )
            `)
            .eq('raceId', req.params.raceId)
            .order('position', { ascending: true });

        if (!data || data.length === 0) {
            return res.status(404).json({
                error: `No constructor standings found for race ${req.params.raceId}`
            });
        }

        res.json(data);
    } catch (err) {
        handleError(res, err, "Failed to get constructor standings");
    }
});





module.exports = router;