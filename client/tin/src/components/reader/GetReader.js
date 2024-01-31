import React, { useState, useEffect } from 'react';
import ListReader from './ListReader';
import Paginate from '../Paginate';
export default function GetReader() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  useEffect(() => {
    fetch('http://localhost:5000/api/getAllReaders')
      .then(response => response.json())
      .then(json => {
        setItems(json);
        setIsLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoaded(true);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
       setCurrentPage(currentPage - 1);
    }
 };

 const nextPage = () => {
  if (currentPage !== Math.ceil(items.length / postsPerPage)) {
     setCurrentPage(currentPage + 1);
  }
};

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>List of Readers</h1>
        <ul>
          {currentPosts.map(item => (
            <ListReader key={item.id} item={item} />
          ))}
        </ul>
        <Paginate
          postsPerPage={postsPerPage}
          totalPosts={items.length}
          paginate={paginate}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    );
  }
}