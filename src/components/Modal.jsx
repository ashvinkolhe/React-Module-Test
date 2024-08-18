/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = (props) => {
  const [formData, setFormData] = useState({ grpName: '', color: '' });
  const [error, setError] = useState('');
  const setGroups = props.setGroups;
  const groups = props.groups;
  const color = [
    '#B38BFA',
    '#FF79F2',
    '#43E6FC',
    '#F19576',
    '#0047FF',
    '#6691FF',
  ];

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
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleChangeColor = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.getAttribute('color'),
    });
    setError(''); // Clear error when color is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.grpName.trim() === '') {
      setError('Group name is required');
      return;
    }

    // No validation for color; it's optional

    let newGroup = [
      ...groups,
      {
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
        id: groups.length,
      },
    ];
    setGroups(newGroup);
    localStorage.setItem('groups', JSON.stringify(newGroup));
    props.closeModal(false);
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <div className="modalBackgroundMobile">
          <div className="modalContainerMobile">
            <h2 className="modalHeading">Create New Group</h2>
            <label className="modalGrp">Group Name</label>
            <input
              type="text"
              className="modalTextMobile"
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            {error && formData.grpName.trim() === '' && (
              <p className="errorMessage">{error}</p>
            )}
            <br />
            <label className="modalColor">Choose Colour (Optional)</label>
            {color.map((color, index) => (
              <button
                className={`colorButton ${
                  formData.color === color ? 'selected' : ''
                }`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                  height: '40px',
                  width: '40px',
                  background: color,
                  borderRadius: '25px',
                  border: 'none',
                  marginRight: '10px',
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            <button
              className="modalCreateMobile"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        <div className="modalBackground">
          <div className="modalContainer">
            <h2 className="modalHeading">Create New Group</h2>
            <label className="modalGrp">Group Name</label>
            <input
              type="text"
              className="modalText"
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            {error && formData.grpName.trim() === '' && (
              <p className="errorMessage">{error}</p>
            )}
            <label className="modalColor">Choose Colour</label>
            {color.map((color, index) => (
              <button
                className={`colorButton ${
                  formData.color === color ? 'selected' : ''
                }`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                  height: '40px',
                  width: '40px',
                  background: color,
                  borderRadius: '25px',
                  border: 'none',
                  marginRight: '10px',
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            <button className="modalCreate" onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
