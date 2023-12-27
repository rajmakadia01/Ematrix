import React, { useState } from 'react';
import './AddClient.css';

const AddClient = ({ onSubmit }) => {
  const [newClient, setNewClient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newClient);
  };

  return (
    <form className="AddClientForm" onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={newClient.firstName} onChange={handleChange} required />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={newClient.lastName} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={newClient.email} onChange={handleChange} required />
      </label>
      <label>
        Mobile Number:
        <input type="text" name="mobile" value={newClient.mobile} onChange={handleChange} required />
      </label>
      <div>
        <button type="submit">Add Client</button>
      </div>
    </form>
  );
};

export default AddClient;
