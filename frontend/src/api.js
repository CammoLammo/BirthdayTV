// api.js
import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_ACUITY_API_URL; // Should be something like 'http://localhost:5000/api'
export const getAppointments = async (calendarID, minDate, maxDate) => {
  try {
    const response = await axios.get(`${apiUrl}/appointments`, {
      params: {
        max: 100,
        canceled: false,
        excludeForms: false,
        direction: 'DESC',
        calendarID,
        minDate,
        maxDate,
      },
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};
