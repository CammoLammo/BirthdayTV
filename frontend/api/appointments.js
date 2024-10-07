const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5173;

app.use(cors());

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// API route to fetch appointments from Acuity Scheduling
app.get('/api/appointments', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await axios.get('https://acuityscheduling.com/api/v1/appointments', {
      params: {
        max: req.query.max || 100,
        canceled: req.query.canceled || false,
        excludeForms: req.query.excludeForms || false,
        direction: req.query.direction || 'DESC',
        maxDate: req.query.maxDate || today,
        minDate: req.query.minDate || today,
        calendarID: req.query.calendarID || 12345678
      },
      headers: {
        'Authorization': 'Basic MzAzNzg0MjA6MWY5NjY5NTJkY2RlZjExYjdiNWQ4NzFlMjRjMzRjZjg=',  // Replace with your API key if required
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
