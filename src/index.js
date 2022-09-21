import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactFullpage from '@fullpage/react-fullpage';

import reactFullpageKey from './react-fullpage-key';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ReactFullpage
	licenseKey={reactFullpageKey}
	scrollingSpeed={800}
	anchors={['workexp', 'projects', 'about', 'contact']}

	render={({ state, fullpageApi }) => {
		return (<ReactFullpage.Wrapper>
			<div className='section'>
				<h1>RedSuns Chan</h1>
				<h2>Software Engineer</h2>
			</div>
		</ReactFullpage.Wrapper>)
	}}
/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
