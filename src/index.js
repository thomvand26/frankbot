import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App.jsx';
import { ChatbotProvider } from './app/services';

ReactDOM.render(
	<React.StrictMode>
		<ChatbotProvider>
			<App />
		</ChatbotProvider>
	</React.StrictMode>,
	document.getElementById('root')
);