import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// Definir el contexto
const GlobalStateContext = createContext();

// Definir el proveedor de contexto
export const GlobalStateProvider = ({ children }) => {
  const initialState = {
    // Otros estados iniciales
    clearRoute: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      // Otras acciones
      case 'SET_CLEAR_ROUTE':
        return { ...state, clearRoute: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Hook personalizado para acceder al estado global
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState debe utilizarse dentro de un GlobalStateProvider');
  }
  return context;
};

// Función para establecer clearRoute desde el componente Layout
export const setClearRoute = (dispatch, value) => {
  dispatch({ type: 'SET_CLEAR_ROUTE', payload: value });
};
