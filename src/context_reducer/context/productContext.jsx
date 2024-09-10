import { createContext, useContext, useEffect, useReducer } from 'react';

import API from '../../components/Api';
import productReducer from '../reducer/productReducer';
import axios from 'axios';

const AppContext = createContext();

const initialState = {
  isLoading: false,
  products: [],
  featureProducts: [],
  singleProduct: {},
  categories: [],
  companies: [],
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProducts = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const { data } = await axios.get(`${API}/api/product/get-all`);
      const products = await data.products;
      dispatch({ type: 'SET_PRODUCTS', payload: products });
    } catch (error) {
      console.log('API ERROR');
      console.log(error);
    }
  };
  const getCategory = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const { data } = await axios.get(`${API}/api/category/get-all`);
      const categories = await data.categories;
      dispatch({ type: 'SET_CATEGORIES', payload: categories });
    } catch (error) {
      console.log('API ERROR');
      console.log(error);
    }
  };
  const getCompany = async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const { data } = await axios.get(`${API}/api/company/get-all`);
      const companies = await data.companies;
      dispatch({ type: 'SET_COMPANIES', payload: companies });
    } catch (error) {
      console.log('API ERROR');
      console.log(error);
    }
  };
  // console.log(state);
  useEffect(() => {
    getProducts();
    getCategory();
    getCompany();
  }, []);

  return (
    <AppContext.Provider
      value={{ ...state, getProducts, getCategory, getCategory }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(AppContext);
};
