// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Room from './Room';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/room1" element={<Room calendarID="9158536" />} />
          <Route path="/room2" element={<Room calendarID="9158537" />} />
          <Route path="/room3" element={<Room calendarID="9158540" />} />
          <Route path="/room4" element={<Room calendarID="9158543" />} />
          <Route path="/room5" element={<Room calendarID="9158544" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
