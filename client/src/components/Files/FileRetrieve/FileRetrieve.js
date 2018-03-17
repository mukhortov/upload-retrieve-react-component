import React from 'react'
import './FileRetrieve.css'

const fileRetrieve = props => (
	<div className="FileRetrieve">
		<ul className="FileRetrieve-list">
			{
				props.files.map(file => (
					<li key={file} className="FileRetrieve-list-item">
						<a href={ props.rootUrl + file }>{ file }</a>
					</li>
				))
			}
		</ul>
	</div>
)

export default fileRetrieve
