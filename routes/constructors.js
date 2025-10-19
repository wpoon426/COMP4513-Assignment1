const express = require('express');
const router = express.Router();
const handleError = require('../handler/handleError');


// Return all constructors
router.get('/', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase') 
            .from('constructors')
            .select();

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get constructors");
    }
});

// returns a specified constructor
router.get('/:ref', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('constructors')
            .select()
            .eq('constructorRef', req.params.ref);
    
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: 'No constructors found' });
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get constructors");
    }
});


module.exports = router;