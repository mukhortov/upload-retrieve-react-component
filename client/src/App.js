import React, { Component } from 'react'
import './App.css'
import Files from './components/Files/Files'

class App extends Component {

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Upload and Retrieve React component</h1>
				</header>
				<div className="App-intro">
					<Files />
				</div>
			</div>
		)
	}
}

export default App
