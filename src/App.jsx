import { useState, useEffect } from 'react';

function App() {
  const [moodList, setMoodList] = useState([]);

   // Load saved moods on first load
  useEffect(() => {
    const savedMoods = localStorage.getItem('moodList');
    if (savedMoods) {
      const parsed = JSON.parse(savedMoods);
      if (JSON.stringify(parsed) !== JSON.stringify(moodList)) {
        setMoodList(parsed);
      }
    }
  }, []);

  // Save to localStorage whenever moodList changes
  useEffect(() => {
    console.log('💾 Saving to localStorage:', moodList); // ADD THIS
    localStorage.setItem('moodList', JSON.stringify(moodList));
  }, [moodList]);

      const moodCount = moodList.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {});


const todayFormatted = new Date().toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}); // e.g. "July 25, 2025"

const todayMoods = moodList.filter(entry =>
  entry.time.startsWith(todayFormatted)
);

  const handleMoodClick = (selectedMood) => {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
}); // Example: July 24, 2025, 4:02 PM

    const newEntry = {
      mood: selectedMood,
      time: timeString,
    };



    // Add the new mood to the list
    setMoodList(prevList => [...prevList, newEntry]);
 
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Daily Mood Tracker</h1>

      <div>
        <button className="big-button" onClick={() => handleMoodClick('😊')}>Happy</button>
        <button className="big-button" onClick={() => handleMoodClick('😐')}>Okay</button>
        <button className="big-button" onClick={() => handleMoodClick('😢')}>Sad</button>
        <button className="big-button" onClick={() => handleMoodClick('😠')}>Angry</button>        
      </div>
     
<div className="mood-summary">
  {Object.entries(moodCount).map(([mood, count]) => (
    <div className="mood-card" key={mood}>
      <span className="mood-icon">{mood}</span>
      <span className="mood-count">{count}</span>
    </div>
  ))}
</div>



<div className="mood-history-section">
  <div className="mood-history-header">
    <h2>Your Mood History:</h2>
    <button className="btnClear" onClick={() => setMoodList([])}>Clear History</button>
  </div>
<table className="mood-table">
  <thead>
    <tr>
      <th>Mood</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
    {todayMoods.map((entry, index) => (
      <tr key={index}>
        <td>{entry.mood}</td>
        <td>{entry.time}</td>
      </tr>
    ))}
  </tbody>
</table>
  </div>
    </div>
  );
}

export default App;
