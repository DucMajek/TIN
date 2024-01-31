import React, { useState } from 'react';
import '../StylePost.css';
export const ListBorrow = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <h1 onClick={toggleExpand} className="smallerFont" style={{ cursor: 'pointer' }}>
        {item._id}
      </h1>
      {isExpanded && (
        <ul>
          <li key={item.id} >
            <p><strong>bookId:</strong> {item.bookId}</p>
            <p><strong>readerId:</strong> {item.readerId}</p>
            <p><strong>borrowDate:</strong> {item.borrowDate}</p>
            <p><strong>returnDate:</strong> {item.returnDate}</p>
            <p><strong>status:</strong> {item.status}</p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ListBorrow;
