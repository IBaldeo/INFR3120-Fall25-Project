
var express = require('express');
var router = express.Router();

const IncidentReport = require('../models/IncidentReport');

//Creates Incident Forms
router.get('/new', function(req, res) {
  console.log("HIT /incidents/new");
  res.render('incident_form', { title: "New Incident Report" });
});

// Edit Incident Form
router.get('/:id/edit', async function (req, res) {
  try {
    const incident = await IncidentReport.findById(req.params.id);

    res.render('incident_edit', {
      title: "Edit Incident",
      incident
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading edit form");
  }
});

// Display Incident Form
router.get('/', async function (req, res) {
  try {
    const incidents = await IncidentReport.find().sort({ date: -1 }); // newest first
    res.render('incidents_list', { title: "All Incident Reports", incidents });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// POST New Incident
router.post('/', async function (req, res) {
  try {
    const { title, description, date, user } = req.body;

    const newIncident = new IncidentReport({
      title,
      description,
      date,
      user
    });

    await newIncident.save();

    res.redirect('/incidents');;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST Updated Incident
router.post('/:id/update', async function (req, res) {
  try {
    await IncidentReport.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      user: req.body.user
    });

    res.redirect('/incidents');

  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating incident");
  }
});

// POST Deleting Incident
router.post('/:id/delete', async function (req, res) {
  try {
    await IncidentReport.findByIdAndDelete(req.params.id);
    res.redirect('/incidents');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting incident");
  }
});

module.exports = router;