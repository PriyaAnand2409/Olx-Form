import React, { useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';
import States from './States'; // This should be a React component, not a raw array

import './OlxJobForm.css';

const OlxJobForm = () => {
  const [formData, setFormData] = useState({
    salaryPeriod: '',
    positionType: '',
    salaryFrom: '',
    salaryTo: '',
    adTitle: '',
    description: '',
    state: '',
    name: 'Priya Anand',
    phone: '+918051163425',
  });

  const [images, setImages] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [locationTab, setLocationTab] = useState('list');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.salaryPeriod ||
      !formData.positionType ||
      !formData.adTitle ||
      !formData.description ||
      !formData.state
    ) {
      alert('Please fill all mandatory fields');
      return;
    }

    console.log('Form submitted:', {
      ...formData,
      profileImage,
      images,
    });

    alert('Ad Posted Successfully!');
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-container">
      <h2>OLX - Post Your Ad</h2>
      <p>
        Category: <strong>Jobs / Data Entry & Back Office</strong>{' '}
        (<a href="#">Change</a>)
      </p>
      <form onSubmit={handleSubmit}>
        <h2>Include some details</h2>

        {/* Salary Period Buttons */}
        <div className="form-group">
          <label>Salary period *</label>
          <div className="Salary-btn">
            {['Hourly', 'Monthly', 'Weekly', 'Yearly'].map((period) => (
              <button
                type="button"
                key={period}
                className={formData.salaryPeriod === period ? 'option-btn active' : 'option-btn'}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, salaryPeriod: period }))
                }
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Position Type Buttons */}
        <div className="form-group">
          <label>Position Type *</label>
          <div className="Position-btn">
            {['Contract', 'Full-time', 'Part-time', 'Temporary'].map((type) => (
              <button
                type="button"
                key={type}
                className={formData.positionType === type ? 'option-btn active' : 'option-btn'}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, positionType: type }))
                }
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div className="form-group">
          <label htmlFor="salaryFrom">Salary from</label>
          <input
            type="number"
            id="salaryFrom"
            name="salaryFrom"
            value={formData.salaryFrom}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="salaryTo">Salary to</label>
          <input
            type="number"
            id="salaryTo"
            name="salaryTo"
            value={formData.salaryTo}
            onChange={handleChange}
          />
        </div>

        {/* Ad Title & Description */}
        <div className="form-group">
          <label htmlFor="adTitle">Ad title *</label>
          <input
            type="text"
            id="adTitle"
            name="adTitle"
            value={formData.adTitle}
            onChange={handleChange}
            maxLength={70}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={4096}
            rows="4"
            required
          />
        </div>

        {/* Image Upload Grid */}
        <h4>Upload up to 12 photos *</h4>
        <div className="image-upload-grid">
          {[...Array(12)].map((_, index) => (
            <label key={index} className="upload-placeholder">
              {images[index] ? (
                <img
                  src={URL.createObjectURL(images[index])}
                  alt={`uploaded-${index}`}
                />
              ) : (
                <>
                  <FaCamera size={24} />
                  <span>Add photo</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const newImages = [...images];
                    newImages[index] = file;
                    setImages(newImages);
                  }
                }}
                style={{ display: 'none' }}
              />
            </label>
          ))}
        </div>

        {/* State Dropdown */}
        <h4>Confirm your location</h4>
        <div className="tab-bar">
          <div
            className={`tab ${locationTab === 'list' ? 'active' : ''}`}
            onClick={() => setLocationTab('list')}
          >
            LIST
          </div>
          <div
            className={`tab ${locationTab === 'current' ? 'active' : ''}`}
            onClick={() => setLocationTab('current')}
          >
            CURRENT LOCATION
          </div>
        </div>

        {locationTab === 'list' && (
          <div className="form-group">
            <label>State *</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="dropdown"
              required
            >
              <option value="">Select a state</option>
              {States.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            {!formData.state && <p className="error-text">This field is mandatory</p>}
          </div>
        )}

        {locationTab === 'current' && (
          <div className="form-group">
            <p>Auto-detecting your location...</p>
            {/* Add geolocation logic here if needed */}
          </div>
        )}

        {/* Review Your Details Section */}
        <h4>Review your details</h4>
        <div className="avatar-upload-wrapper">
          <div
            className="avatar-circle"
            onClick={() => fileInputRef.current.click()}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="profile-image"
              />
            ) : (
              <span className="avatar-letter">P</span>
            )}
            <div className="camera-icon">
              <FaCamera size={16} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfileImageChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
          </div>
          <div>
            <div>
              <strong>Name:</strong> {formData.name}
            </div>
            <div>
              <strong>Phone:</strong> {formData.phone}
            </div>
          </div>
        </div>

        <button type="submit" className="form-submit-btn">POST NOW</button>
      </form>
    </div>
  );
};

export default OlxJobForm;
