import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactFullpage from '@fullpage/react-fullpage';

import reactFullpageKey from './react-fullpage-key';
import Intro from './sections/Intro/Intro';
import WorkExp from './sections/WorkExp/WorkExp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ReactFullpage
  licenseKey={reactFullpageKey}
  scrollingSpeed={800}
  anchors={['workexp', 'projects', 'about', 'contact']}

  render={ ({state, fullpageApi}) => {
    return <ReactFullpage.Wrapper>
      <div className="section">
        <Intro fullpageApi={fullpageApi}></Intro>
      </div>
      <div className="section" data-anchor="workexp">
        <WorkExp fullpageApi={fullpageApi}></WorkExp>
      </div>
      <div className="section" data-anchor="projects">
        <h1>Projects</h1>
      </div>
      <div className="section" data-anchor="about">
        <h1>About me</h1>
      </div>
      <div className="section" data-anchor="contact">
        <h1>Contact me</h1>
      </div>
    </ReactFullpage.Wrapper>
  }}
/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
