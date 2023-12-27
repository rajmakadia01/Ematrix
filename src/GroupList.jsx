import React from 'react';

const GroupList = ({ groups, onSelectGroup }) => {
  return (
    <div>
      <h3>Group List</h3>
      <ul>
        {groups.map((group) => (
          <li key={group.id} onClick={() => onSelectGroup(group.id)}>
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
