import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { App } from 'antd';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App>
	<h1>Welcome to Version 2024</h1>
</App>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
