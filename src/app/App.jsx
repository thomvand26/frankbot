import React from 'react';
import './app.scss';

import Frank from './assets/frank-deboosere.jpg';
import { ChatDisplay } from './components';

function App() {
	return (
		<div className="app">
			<header className="appHeader container">
				<div className="inner">
					<img src={Frank} alt="Frank Deboosere" />
					<h1>Frankbot</h1>
				</div>
			</header>
			<main className="appMain container fullHeight">
				<div className="inner fullHeight">
					<ChatDisplay />
				</div>
			</main>
		</div>
	);
}

export default App;
