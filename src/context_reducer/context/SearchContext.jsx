// src/context/SearchContext.js

import React, { createContext, useContext, useState } from 'react';

// Create a Context for the search
const SearchContext = createContext();

// Create a provider component
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the SearchContext
export const useSearchContext = () => {
  return useContext(SearchContext);
};
