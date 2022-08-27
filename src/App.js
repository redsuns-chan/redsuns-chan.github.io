import React from 'react';

import Timeline from './components/timeline/Timeline';
import Projects from './components/projects/Projects';
import Intro from './components/intro/Intro';

import './App.css';

function App() {
  return <>
      <Intro></Intro>
      <Timeline></Timeline>
      <Projects></Projects>
  </>
}

export default App;
