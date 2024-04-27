import React, { useState } from 'react';
import './TimeCapsule.css';
import Sidebar from '../DiaryEntryPage/SideBar/Sidebar';
import timeCapsuleImage from '../../assets/TimeCapsule.svg';

const TimeCapsule = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ interval: '', messageToFutureSelf: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 3;

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
  
  const totalPages = Math.ceil(entries.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='fadein'>
    <div className="container-fluid">
      <div className="col-lg-12 offset-lg-12" style={{ backgroundColor:'#b3b5ff' }}  >
        <div className="time-capsule-header text-center" style={{ marginLeft:'250px', borderRadius:'80px' }} >
          <h1 className="page-title" style={{ fontWeight: 'bold'}}>Welcome to Time Capsule</h1>
          <p className="page-subtitle" style={{ fontWeight: 'bold' }}>Plant your Time Capsule and let it revive your beloved memories</p>
        </div>
        <div className="parent-container">
          <img src="https://www.michigandaily.com/wp-content/uploads/2023/05/Untitled_Artwork-84.png" alt="Time Capsule" style={{ height:'500px', marginTop: '0px', width: '48%' }} />
        </div>
      </div>
    </div>
      <div className="col-lg-6 offset-lg-3">
        <div className="p-2" style={{ flex:3 }} >
          <Sidebar currentPage="TimeCapsule" />
            <div className="time-capsule-header" style={{ marginLeft:'200px', borderRadius:'80px' }} >
              <h2 className="text-center" style={{ fontWeight: 'bold' }}>Plant a Time Capsule</h2>
            </div>
          <div className="card-body" style={{ backgroundColor: '#c1c1c1', padding:'20px', borderRadius:'20px' }}>
            <form onSubmit={handleSubmit}>
              <select
                name="interval"
                value={newEntry.interval}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select Interval</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              <div className="form-group mt-3">
                <textarea
                  name="messageToFutureSelf"
                  placeholder="A message to your future self..."
                  value={newEntry.messageToFutureSelf}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="4"
                />
              </div>
              <div className="form-group mt-3" style={{ textAlign: 'center' }} >
                <button type="submit" className="btn btn-primary">Set Time Capsule</button>
              </div>
            </form>
          </div>
        </div>
      </div>
        <div className="col-lg-6 offset-lg-3">
          <h2 className="text-center" style={{ fontWeight: 'bold' }}>Diary Entries</h2>
          <div className="diary-entries" style={{ backgroundColor: '#c1c1c1', padding:'30px', borderRadius:'20px'}}>
            {currentEntries.map((entry, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: 'bold' }}>Capsule {index + indexOfFirstEntry + 1}</h5>
                  <p className="card-text">Capsule Planted Date: {entry.date}</p>
                  <p className="card-text">Interval: {entry.interval}</p>
                  <p className="card-text">Next Opening Date: {getNextOpeningDate(entry.date, entry.interval)}</p>
                  <p className="card-text">Message: {entry.messageToFutureSelf}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                {[...Array(totalPages).keys()].map(page => (
                  <li key={page} className={`page-item ${page + 1 === currentPage ? 'active' : ''}`}>
                    <button onClick={() => paginate(page + 1)} className="page-link">{page + 1}</button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
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
