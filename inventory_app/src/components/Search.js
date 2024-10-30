import React from 'react';

const Search = ({ results }) => {
  return (
    <div className="search-results">
      {results.length > 0 ? (
        results.map((item) => (
          <div key={item._id} className="search-result-item">
            <span>{item.itemName}</span> - <span>ID: {item._id}</span>
          </div>
        ))
      ) : (
        <div className="no-results">No matching items found</div>
      )}
    </div>
  );
};

export default Search;
