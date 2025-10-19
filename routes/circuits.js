const express = require('express');
const router = express.Router();
const handleError = require('../handler/handleError');


// Return all circuits
router.get('/', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase') 
            .from('circuits')
            .select();

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get curcuits");
    }
});


// returns a specified circuit
router.get('/:ref', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('circuits')
            .select()
            .eq('circuitRef', req.params.ref);

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: 'No circuits found' });
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get circuits");
    }
});

//Returns the circuits used in a given season
router.get('/season/:year', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('races')
            .select(`
                round, name, date,
                circuits (circuitId, name, location, country)
            `)
            .eq('year', req.params.year)
            .order('round', { ascending: true });

            
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Circuit not found." });
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get circuit");
    }
});


module.exports = router;