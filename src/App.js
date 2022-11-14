import React, { useState } from "react";

import Calc from './Components/Calc'
import Graph from './Components/Graph/Graph'

const App = () => (
  <div className='app'>
    <Calc/>
    <Graph/>
  </div>
);

export default App;
