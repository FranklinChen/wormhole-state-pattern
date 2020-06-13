import React, { createContext, useState, useEffect } from "react";

export interface State {
    sharedCount: number,
    randomString: string
}

const defaultState: State = {
    sharedCount: 0,
    randomString: "random"
};

export interface Context {
    state: State,
    setSharedCount: (sharedCount: number) => void
}

export const WormholeContext = createContext<Context>({
    state: defaultState,
    setSharedCount: (sharedCount) => { }
});

export const WormholeContextProvider: React.FC<{}> = ({ children }) => {
    // replace with useReducer for more flexiblity
    const [state, setState] = useState<State>(defaultState);

    const [contextValue, setContextValue] = useState<Context>({
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
