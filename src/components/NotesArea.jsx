/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import sendIcon from '../assets/Send.svg';
import back from '../assets/Back.svg';
import styles from './NotesArea.module.css';

const NotesArea = (props) => {
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const { groupSelect, groups, setGroups } = props;

  const getScreen = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreen());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    setNote(e.target.value);
    setError(''); // Clear error when user types
  };

  const handleSubmit = () => {
    if (note.trim() === '') {
      setError('Please enter a note before sending.');
      return; // Prevent empty submissions
    }

    setError(''); // Clear error message if valid

    const newGroup = [...groups];
    const Cgroup = newGroup[groupSelect.id];

    const time = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    const date = new Date().toLocaleDateString([], {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    Cgroup.notes.push({ date, time, note });
    localStorage.setItem('groups', JSON.stringify(newGroup));
    setGroups(newGroup);
    setNote(''); // Clear note after submission
  };

  const keypress = (e) => {
    if (e.code === 'Enter') {
      e.preventDefault(); // Prevent new line on Enter
      handleSubmit();
    }
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <div className={styles.notesContainer}>
          <div className={styles.notesHeader}>
            <img
              src={back}
              alt="Back"
              onClick={() => window.location.reload()}
            />
            <div
              className={styles.notesGroup}
              style={{ background: groupSelect.color }}
            >
              {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
            </div>
            <h2 className={styles.groupName}>{groupSelect.groupName}</h2>
          </div>
          <div className={styles.NotesAndDateMobile}>
            {groupSelect.notes.map((note) => (
              <div className={styles.DateAndTextMobile} key={note.time + note.date}>
                <p className={styles.TextMobile}>{note.note}</p>
                <div className={styles.DateAndTimeMobile}>
                  <p className={styles.DateMobile}>{note.date}</p>
                  <p className={styles.DateAndTimeSeparatorMobile}></p>
                  <p className={styles.TimeMobile}>{note.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.TextareaMobile}>
            <textarea
              className={styles.TextInputMobile}
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..."
              onKeyDown={keypress}
            ></textarea>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <img
              src={sendIcon}
              className={`${styles.SendImgMobile} ${note.trim() ? '' : styles.disabled}`}
              alt="Send"
              onClick={note.trim() ? handleSubmit : null}
              style={{ cursor: note.trim() ? 'pointer' : 'not-allowed' }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.notesContainer}>
          <div className={styles.notesHeader}>
            <div
              className={styles.notesGroup}
              style={{ background: groupSelect.color }}
            >
              {groupSelect.groupName?.slice(0, 2)?.toUpperCase()}
            </div>
            <h2 className={styles.groupName}>{groupSelect.groupName}</h2>
          </div>
          <div className={styles.NotesAndDate}>
            {groupSelect.notes.map((note) => (
              <div className={styles.note} key={note.time + note.date}>
                <div className={styles.DateAndText}>
                  <p className={styles.Text}>{note.note}</p>
                  <div className={styles.DateAndTime}>
                    <p className={styles.Date}>{note.date}</p>
                    <p className={styles.DateAndTimeSeparator}></p>
                    <p className={styles.Time}>{note.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.Textarea}>
            <textarea
              className={styles.TextInput}
              value={note}
              onChange={handleChange}
              placeholder="Enter your text here..."
              onKeyDown={keypress}
            ></textarea>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <img
              src={sendIcon}
              className={`${styles.SendImg} ${note.trim() ? '' : styles.disabled}`}
              alt="Send"
              onClick={note.trim() ? handleSubmit : null}
              style={{ cursor: note.trim() ? 'pointer' : 'not-allowed' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NotesArea;
