const express = require('express');
const router = express.Router();
const auth = require('./auth.js');
const Appointment = require('./appointments.js');

router.post('/', auth, async (req, res) => {
  try {
    const { date, time, patientName } = req.body;
    const newAppointment = new Appointment({
      date,
      time,
      patientName,
      userId: req.user.id,
    });
    const appointment = await newAppointment.save();
    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
