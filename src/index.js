import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactFullpage from '@fullpage/react-fullpage';

import reactFullpageKey from './react-fullpage-key';
import Intro from './sections/Intro/Intro';
import WorkExp from './sections/WorkExp/WorkExp';
import Skills from './sections/Skills/Skills';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ReactFullpage
	licenseKey={reactFullpageKey}
	scrollingSpeed={800}
	anchors={['workexp', 'projects', 'about', 'contact']}

	render={({ state, fullpageApi }) => {
		return (<ReactFullpage.Wrapper>
			<div className='section' id='section-intro' data-anchor='intro'>
				<Intro fullpageApi={fullpageApi}></Intro>
			</div>
			<div className='section' data-anchor='skills'>
				<Skills fullpageApi={fullpageApi}></Skills>
			</div>
			<div className='section' id='section-workexp' data-anchor='workexp'>
				<WorkExp fullpageApi={fullpageApi}></WorkExp>
			</div>
		</ReactFullpage.Wrapper>)
	}}
/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
