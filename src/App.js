import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';

import './App.css';
import HomePage from './components/home';

function App() {
	return (
		<div className="d-flex h-100 text-center text-white bg-dark">
			<HomePage />
		</div>
	);
}

export default App;
