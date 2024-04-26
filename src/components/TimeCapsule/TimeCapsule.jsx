import React, { useState } from 'react';
import Paper from '../Paper/Paper';
import './TimeCapsule.css';
import Sidebar from '../DiaryEntryPage/SideBar/Sidebar';

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
    const currentDate = new Date().toLocaleDateString();
    setEntries(prevEntries => [
      ...prevEntries,
      { ...newEntry, date: currentDate }
    ]);
    setNewEntry({ interval: '', messageToFutureSelf: '' });
  };

  return (
    <div className="bg-image" style={{ minHeight: '100vh', backgroundAttachment: 'fixed' }}>
      <div className="bg-overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="time-capsule-header text-center">
              <h1 className="page-title" style={{ fontWeight:'bold' }} >Welcome to Time Capsule</h1>
              <p className="page-subtitle" style={{ fontWeight:'bold' }}>Plant your Time Capsule and let it revive your beloved memories</p>
            </div>
            <div className="time-capsule-content">
              <Sidebar currentPage="TimeCapsule" />
              <form onSubmit={handleSubmit}>
                <div className="paper-design">
                  <Paper>
                    <div className='border'>
                      <select name="interval" value={newEntry.interval} onChange={handleInputChange} required className="form-select">
                        <option value="">Select Interval</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginTop: '25px' }}>
                      <textarea
                        name="messageToFutureSelf"
                        placeholder="A message to your future self..."
                        value={newEntry.messageToFutureSelf}
                        onChange={handleInputChange}
                        className="form-control"
                        rows="4"
                      />
                    </div>
                  </Paper>
                  <div className="button-container">
                    <button type="submit" className="btn btn-primary">Set Time Capsule</button>
                  </div>
                </div>
              </form>
              <div className="entries-container">
                <h2 className="text-center" style={{ fontWeight:'bold' }} >Diary Entries</h2>
                <div className="diary-entries-container">
                  <div className="diary-entries">
                    {entries.map((entry, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title" style={{ fontWeight:'bold' }} >Capsule {index + 1}</h5>
                          <p className="card-text">Casule Planted Date: {entry.date}</p>
                          <p className="card-text">Interval: {entry.interval}</p>
                          <p className="card-text">Next Opening Date: {getNextOpeningDate(entry.date, entry.interval)}</p>
                          <p className="card-text">Message: {entry.messageToFutureSelf}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getNextOpeningDate = (plantedDate, interval) => {
  const date = new Date(plantedDate);
  switch (interval) {
    case 'Daily':
      date.setDate(date.getDate() + 1);
      break;
    case 'Weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'Monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'Yearly':
      date.setFullYear(date.getFullYear() + 1);
      break;
    default:
      break;
  }
  return date.toLocaleDateString();
};

export default TimeCapsule;
