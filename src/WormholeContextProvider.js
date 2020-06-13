import React, { createContext, useState, useEffect } from "react";

const defaultState = {
  sharedCount: 0,
  randomString: "random"
};

export const WormholeContext = createContext({
  state: defaultState,
  dispatch: () => {}
});

export const WormholeContextProvider = ({ children }) => {
  // replace with useReducer for more flexiblity
  const [state, setState] = useState(defaultState);

  const [contextValue, setContextValue] = useState({
    state,
    // dispatch // from your reducer
    // this is where a reducer comes handy when this grows
    setSharedCount: async sharedCount =>
      setState(currentState => ({
        ...currentState,
        sharedCount
      }))
    // other stuff you need in context
  });

  // avoids deep re-renders
  // when instances of stuff in context change
  useEffect(() => {
    setContextValue(currentValue => ({
      ...currentValue,
      state
    }));
  }, [state]);

  return (
    <WormholeContext.Provider value={contextValue}>
      {children}
    </WormholeContext.Provider>
  );
};
