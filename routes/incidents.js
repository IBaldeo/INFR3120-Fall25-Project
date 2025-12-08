const express = require('express');
const router = express.Router();
const Incident = require('../models/IncidentReport');

// GET ALL INCIDENTS
router.get('/', async (req, res) => {
  const incidents = await Incident.find();
  res.json(incidents);
});

// GET ONE INCIDENT
router.get('/:id', async (req, res) => {
  const incident = await Incident.findById(req.params.id);
  res.json(incident);
});

// CREATE INCIDENT
router.post('/', async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.json({ message: "Incident created", incident });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE INCIDENT
router.put('/:id', async (req, res) => {
  try {
    const updated = await Incident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Incident updated", updated });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE INCIDENT
router.delete('/:id', async (req, res) => {
  try {
    await Incident.findByIdAndDelete(req.params.id);
    res.json({ message: "Incident removed" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;