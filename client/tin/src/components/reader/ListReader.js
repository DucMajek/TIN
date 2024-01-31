import React, { useState } from 'react';

export const ListReader = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <h1 onClick={toggleExpand} style={{ cursor: 'pointer' }}>
        {item.name}
      </h1>
      
      {isExpanded && (
        <ul>
          <li key={item.id}>
            <p><strong>id:</strong> {item._id}</p>
            <p><strong>Surname:</strong> {item.surname}</p>
            <p><strong>BirthDate:</strong> {item.birthDate}</p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ListReader;
