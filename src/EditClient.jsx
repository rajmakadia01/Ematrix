import  './EditClient.css';
import React, { useState, useEffect } from 'react';

const EditClient= ({ client, onSave, onCancel }) => {
  const [editedClient, setEditedClient] = useState({ ...client });

  useEffect(() => {
    setEditedClient({ ...client });
  }, [client]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedClient);
  };

  return (
    <div className='EditClientForm'>
      <h3>Edit Client</h3>
      <form>
        <div>
          <label htmlFor="editFirstName">First Name:</label>
          <input
            type="text"
            id="editFirstName"
            name="firstName"
            value={editedClient.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="editLastName">Last Name:</label>
          <input
            type="text"
            id="editLastName"
            name="lastName"
            value={editedClient.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="editEmail">Email:</label>
          <input
            type="email"
            id="editEmail"
            name="email"
            value={editedClient.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="editMobile">Mobile Number:</label>
          <input
            type="tel"
            id="editMobile"
            name="mobile"
            value={editedClient.mobile}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="button" onClick={handleSave} className='Save'>
            Save
          </button>
          <button type="button" onClick={onCancel} className='Cancel'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClient;
