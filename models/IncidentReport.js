const mongoose = require('mongoose');

const IncidentReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: String, required: true }
});

module.exports = mongoose.model('IncidentReport', IncidentReportSchema);
