import React, { useState } from 'react';
import Paper from '../Paper/Paper'; // Import Paper component
import './TimeCapsule.css'; // Import CSS file for styling

const TimeCapsule = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ interval: '', messageToFutureSelf: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries(prevEntries => [...prevEntries, newEntry]);
    // Reset newEntry state
    setNewEntry({ interval: '', messageToFutureSelf: '' });
  };

  return (
    <div className="time-capsule-page">
      <h1 className="page-title">Time Capsule</h1>
      <p className="page-subtitle">Plant your Time Capsule and let it revive your beloved memories</p>
      <form onSubmit={handleSubmit}>
        <Paper>
          <div>
            <select name="interval" value={newEntry.interval} onChange={handleInputChange} required style={{ border: 'none', outline: 'none' }}>
              <option value="">Select Interval</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div style={{ marginTop: '25px' }}>
            <textarea 
            name="messageToFutureSelf" 
            placeholder="A message to your future self..." 
            value={newEntry.messageToFutureSelf} 
            onChange={handleInputChange} 
            style={{ border: 'none', width: '100%', outline: 'none', resize: 'none', whiteSpace: 'pre-wrap' }} />
          </div>
        </Paper>
        <div className="button-container">
          <button type="submit">Save Entry</button> {/* Save Entry button outside Paper component */}
        </div>
      </form>
      <div className='entries-container'>
        <h2>Diary Entries</h2>
        <div className='entries'>
          {entries.map((entry, index) => (
            <Paper key={index} className="entry">
              <p>Interval: {entry.interval}</p>
              <p>Message to Future Self: {entry.messageToFutureSelf}</p>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeCapsule;
