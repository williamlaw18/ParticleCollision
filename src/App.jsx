import React, {useRef, useState} from "react";

import Objects from './objects';

const App = () => {

  const container = useRef(null);

  return(
    <>
      <h1>Canvas Object Movement based on Vector</h1>
      
      <div ref={container}>
        <Objects 
          container={container}
        />
      </div>
    </>
  )
};

export default App;