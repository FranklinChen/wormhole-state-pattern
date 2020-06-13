import React, { useContext } from "react";
import "./styles.css";

import {
  WormholeContextProvider,
  WormholeContext
} from "./WormholeContextProvider";

function useSharedCount() {
  const { state, setSharedCount } = useContext(WormholeContext);

  function plusOne() {
    setSharedCount(state.sharedCount + 1);
  }

  return {
    sharedCount: state.sharedCount,
    plusOne
  };
}

const DisplayCount = () => {
  const { sharedCount } = useSharedCount();

  return <p>{sharedCount}</p>;
};

const PlusButton = () => {
  const { plusOne } = useSharedCount();

  return (
    <button onClick={plusOne} style={{ background: "red" }}>
      +1
    </button>
  );
};

const Counter = ({ start = 0 }) => {
  return (
    <div>
      <label>
        <DisplayCount />
        <PlusButton />
      </label>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Wormhole State Management Pattern</h1>
      <h2>This is an over-engineered counter</h2>
      <WormholeContextProvider>
        <Counter />
        <Counter />
      </WormholeContextProvider>
    </div>
  );
}
