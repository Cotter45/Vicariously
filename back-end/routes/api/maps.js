// backend/routes/api/maps.js
const router = require('express').Router();
const { googleMapsAPIKey } = require('../../config');

router.post('/key', (req, res) => {
    console.log(googleMapsAPIKey)
  res.json({ googleMapsAPIKey });
});

module.exports = router;
