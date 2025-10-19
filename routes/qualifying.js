const express = require('express');
const router = express.Router();
const handleError = require('../handler/handleError');




//Returns the qualifying results for the specified race
router.get('/:raceId', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('qualifying')
            .select(`
                position,
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
            .order('position', { ascending: true });

            if (!data || data.length === 0) {
                return res.status(404).json({
                    error: `No qualifying results found for race ${req.params.raceId}`
                });
            }


        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get races");
    }
});









module.exports = router;