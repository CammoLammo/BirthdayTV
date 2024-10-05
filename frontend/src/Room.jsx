// Room.js
import React, { useEffect, useState } from 'react';
import { getAppointments } from './api';
import BirthdayTitle from './BirthdayTitle';

function Room({ calendarID }) {
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Calculate the next weekend dates (Saturday and Sunday)
        const getNextWeekendDates = () => {
          const today = new Date();
          const dayOfWeek = today.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday

          // Days until next Saturday
          const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
          const nextSaturday = new Date(today);
          nextSaturday.setDate(today.getDate() + daysUntilSaturday);

          // Days until next Sunday
          const daysUntilSunday = (7 - dayOfWeek + 7) % 7;
          const nextSunday = new Date(today);
          nextSunday.setDate(today.getDate() + daysUntilSunday);

          const saturdayDateString = formatDate(nextSaturday);
          const sundayDateString = formatDate(nextSunday);

          return { saturdayDateString, sundayDateString };
        };

        // Function to format date as 'yyyy-mm-dd'
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };

        const { saturdayDateString: minDate, sundayDateString: maxDate } = getNextWeekendDates();

        // Fetch appointments for the next weekend and the specified calendarID
        const appointments = await getAppointments(calendarID, minDate, maxDate);

        const sortedAppointments = appointments.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));


        const now = new Date();
        const checkTime = new Date(now.getTime() - 2 * 60 * 60 * 1000);
        

        // Filter upcoming appointments
        const upcomingAppointments = sortedAppointments.filter(
          (appt) => new Date(appt.datetime) > checkTime
        );

        if (upcomingAppointments.length > 0) {
          const nextAppointment = upcomingAppointments[0];   
          setAppointment(nextAppointment);
          console.log(nextAppointment.datetime);
        } else {
          setAppointment(null);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [calendarID]);

  if (!appointment) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20vh', fontSize: '5vh' }}>
        No upcoming appointments.
      </div>
    );
  }

  return (
    <BirthdayTitle
      name={appointment.forms[0].values[0].value}
      startDateTime={appointment.datetime}
    />
  );
}

export default Room;
