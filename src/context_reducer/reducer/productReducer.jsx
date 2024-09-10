const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'SET_PRODUCTS':
      const featureData = action.payload.filter((element) => {
        return element.fetcher === true;
      });

      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featureProducts: featureData,
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };
    case 'SET_COMPANIES':
      return {
        ...state,
        companies: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
