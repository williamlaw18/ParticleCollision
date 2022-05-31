import React, {useRef, useState, useEffect} from "react";

import Objects from './objects';
import ParticleController from './particleController';


const App = () => {

  const container = useRef(null);

  const [particleSettings, setParticleSettings] = useState({});

  return(
    <>
      <h1>Canvas Object Movement based on Vector</h1>
      <p>{particleSettings.gravity}</p>
      <ParticleController setParticles={setParticleSettings}/>
      <div ref={container} style={{'height': 'calc(100vh - 150px)'}}>
        <Objects 
          settings={particleSettings}
          container={container}
        />
      </div>
    </>
  )
};

export default App;