import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AppProvider } from './context_reducer/context/productContext.jsx';
import { AuthProvider } from './context_reducer/context/authContext.jsx';
import { CartContextProvider } from './context_reducer/context/cartContext.jsx';
import { SearchProvider } from './context_reducer/context/SearchContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AppProvider>
      <CartContextProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </CartContextProvider>
    </AppProvider>
  </AuthProvider>
);
