import React, { useState } from 'react';
import AddClient from './AddClient';
import EditClient from './EditClient';
import './Client.css';

const Client = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
  ]);

  const [clients, setClients] = useState([
    { id: 1, groupId: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', mobile: '1234567890' },
    { id: 2, groupId: 1, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', mobile: '9876543210' },
  ]);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isAddClientFormVisible, setAddClientFormVisible] = useState(false);
  const [isEditClientFormVisible, setEditClientFormVisible] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [editedGroupName, setEditedGroupName] = useState('');
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(5); 
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(clients.length / clientsPerPage);

  const handleAddClient = () => {
    setAddClientFormVisible(true);
  };

  const handleAddClientSubmit = (clientData) => {
    const newClient = {
      id: Date.now(),
      groupId: selectedGroup,
      ...clientData,
    };
    setClients((prevClients) => [...prevClients, newClient]);
    setAddClientFormVisible(false);
  };

  const handleEditClient = (clientId) => {
    setSelectedClientId(clientId);
    setEditClientFormVisible(true);
  };

  const handleEditClientSubmit = (editedClient) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === editedClient.id ? { ...client, ...editedClient } : client
      )
    );
    setEditClientFormVisible(false);
    setSelectedClientId(null);
  };

  const handleCancelEditClient = () => {
    setEditClientFormVisible(false);
    setSelectedClientId(null);
  };

  const handleDeleteClient = (clientId) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
  };

  const handleAddGroup = () => {
    const newGroup = {
      id: Date.now(),
      name: newGroupName,
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    setNewGroupName('');
  };

  const handleEditGroup = (groupId) => {
    setEditingGroupId(groupId);
    const groupToEdit = groups.find((group) => group.id === groupId);
    setEditedGroupName(groupToEdit.name);
  };

  const handleSaveEditGroup = () => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === editingGroupId ? { ...group, name: editedGroupName } : group
      )
    );
    setEditingGroupId(null);
    setEditedGroupName('');
  };

  const handleDeleteGroup = (groupId) => {
    setGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
    setEditingGroupId(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="ClientPage">
      {/* Left Box - Group Management */}
      <div className='GroupSection'>
      <div className="GroupManagement">
        <h2>Groups</h2>
        <ul className="Groups">
          {groups.map((group) => (
            <li key={group.id} className="GroupItem">
              <div className="GroupName">
                {editingGroupId === group.id ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Edited Group Name"
                      value={editedGroupName}
                      onChange={(e) => setEditedGroupName(e.target.value)}
                    />
                    <button onClick={handleSaveEditGroup}>Save Edit</button>
                  </div>
                ) : (
                  <>
                    {group.name}
                    <div className='EditDeleteButtons'>
                      <button onClick={() => handleEditGroup(group.id)} className="Edit">Edit</button>
                      <button onClick={() => handleDeleteGroup(group.id)} className='Delete'>Delete</button>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="GroupForm">
          <input
            type="text"
            placeholder="New Group Name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <button onClick={handleAddGroup}>Add Group</button>
        </div>
      </div>
      </div>

      {/* Right Box - Client Details */}
      <div className="ClientDetails">
        <div className="ClientDetailsHeader">
          <h2>Client Details</h2>
          <button onClick={handleAddClient} className='AddClient'>Add Client</button>
        </div>
        {isAddClientFormVisible && <AddClient onSubmit={handleAddClientSubmit} />}
        {isEditClientFormVisible && (
          <EditClient
            client={clients.find((client) => client.id === selectedClientId)}
            onSave={handleEditClientSubmit}
            onCancel={handleCancelEditClient}
          />
        )}
        <table className="ClientTable">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client) => (
              <tr key={client.id}>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.email}</td>
                <td>{client.mobile}</td>
                <td>
                  <button onClick={() => handleEditClient(client.id)} className='Edit'>Edit</button>
                  <button onClick={() => handleDeleteClient(client.id)} className='Delete'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         <div className="Pagination">
          <button className='Previous' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button className='Next' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Client;
