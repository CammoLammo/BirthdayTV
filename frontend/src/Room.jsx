// Room.js
import React, { useState, useEffect } from "react";
import { getAppointments } from "./api";
import BirthdayTitle from "./BirthdayTitle";

function Room({ calendarID }) {
    const [appointments, setAppointments] = useState([]);
    const [appointment, setAppointment] = useState(null);

    // API call only once when component mounts
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const today = new Date().toISOString().split("T")[0];
                const fetchedAppointments = await getAppointments(
                    calendarID,
                    today,
                    today
                );
                const sortedAppointments = fetchedAppointments.sort(
                    (a, b) => new Date(a.datetime) - new Date(b.datetime)
                );
                setAppointments(sortedAppointments);

                // Set the initial appointment
                const now = new Date();
                const checkTime = new Date(now.getTime() - 2 * 60 * 60 * 1000);
                const upcoming = sortedAppointments.filter(
                    (appt) => new Date(appt.datetime) > checkTime
                );
                if (upcoming.length > 0) {
                    setAppointment(upcoming[0]);
                } else {
                    setAppointment(null);
                }
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, [calendarID]);

    // Polling the stored appointments every minute to update the current appointment
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (appointments.length > 0) {
                const now = new Date();
                const checkTime = new Date(now.getTime() - 2 * 60 * 60 * 1000);
                const upcoming = appointments.filter(
                    (appt) => new Date(appt.datetime) > checkTime
                );
                if (upcoming.length > 0) {
                    // If current appointment is different from the next available one, update it
                    if (!appointment || upcoming[0].id !== appointment.id) {
                        setAppointment(upcoming[0]);
                    }
                } else {
                    setAppointment(null);
                }
            }
        }, 6000);

        return () => clearInterval(intervalId);
    }, [appointments, appointment]);

    return (
        <div>
            {appointment ? (
                <BirthdayTitle
                    name={appointment.forms[0].values[0].value}
                    startDateTime={appointment.datetime}
                />
            ) : (
                <h2>No upcoming appointments.</h2>
            )}
        </div>
    );
}

export default Room;
