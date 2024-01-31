import React, { useState } from 'react';

const ListBooks = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      
      <h1 onClick={toggleExpand} style={{ cursor: 'pointer' }}>
        {item.title}
      </h1>
      {isExpanded && (
        <ul>
          <li key={item.id}>
          <p><strong>id:</strong> {item._id}</p>
            <p><strong>Author:</strong> {item.author}</p>
            <p><strong>Publication:</strong> {item.publicationYear}</p>
            <p><strong>Genre:</strong> {item.genre}</p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ListBooks;
