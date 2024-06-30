import React, { createContext, useContext, useReducer } from "react";

// Definir el contexto
const GlobalStateContext = createContext();

// Definir el proveedor de contexto
export const GlobalStateProvider = ({ children }) => {
  const initialState = {
    clearRoute: false,
    layer: "osm",
    typeViewData: "heatmap",
    mapCards: {
      search: { visible: false },
      info: { visible: false },
      settings: { visible: false },
    },
    // Otros estados iniciales que puedas necesitar
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_CLEAR_ROUTE":
        return { ...state, clearRoute: action.payload };
      case "SET_LAYER_MAP":
        return { ...state, layer: action.payload };
      case "SET_TYPE_VIEW_DATA":
        return { ...state, typeViewData: action.payload };
      case "SET_MAP_CARDS":
        return {
          ...state,
          mapCards: {
            ...state.mapCards,
            [action.payload.type]: { visible: action.payload.visible },
          },
        };
      // Otros casos de acciones
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

// Funciones para establecer estados desde los componentes
export const setClearRoute = (dispatch, route) => {
  dispatch({ type: "SET_CLEAR_ROUTE", payload: route });
};

export const setLayerMap = (dispatch, layer) => {
  dispatch({ type: "SET_LAYER_MAP", payload: layer });
};

export const setTypeViewData = (dispatch, type) => {
  dispatch({ type: "SET_TYPE_VIEW_DATA", payload: type });
}

export const setMapCards = (dispatch, type, visible) => {
  dispatch({ type: "SET_MAP_CARDS", payload: { type, visible } });
};

// Hook personalizado para acceder al estado global
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      "useGlobalState debe utilizarse dentro de un GlobalStateProvider"
    );
  }
  return context;
};
