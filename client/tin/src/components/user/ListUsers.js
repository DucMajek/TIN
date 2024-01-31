import React, { useState } from 'react';

export const ListUsers = ({ item }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  return (
<div>
<h1 onClick={toggleExpand} style={{ cursor: 'pointer' }}>
  {item.login}
</h1>
{isExpanded && (
  <ul>
    <li key={item.login}>
    <p><strong>Id:</strong> {item._id}</p>
    </li>
    <li>
    <p className='psswdSize'><strong>Password:</strong> {item.password}</p>
    </li>
  </ul>
)}
</div>
  );
};

export default ListUsers;