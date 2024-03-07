import React from 'react';

const SearchBar = ({ keyword, setKeyword, clearKeyword, onTyping }) => {
  const handleChange = (e) => {
    setKeyword(e.target.value);
    onTyping(); 
  };

  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        className="border border-gray-300 rounded-l-md px-4 py-2 w-1/4 mr-2"
        placeholder="Enter an ingredient"
        value={keyword}
        onChange={handleChange}
        onKeyDown={onTyping} 
      />
      <button
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
        onClick={clearKeyword}
      >
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
