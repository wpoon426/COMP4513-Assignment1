const express = require('express');
const router = express.Router();
const handleError = require('../handler/handleError');





router.get('/:raceId', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from f1-server.js
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

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get races");
    }
});









module.exports = router;