import React from 'react'
import './FileUpload.css'

const fileUpload = props => (
	<div className="FileUpload">
		<form className="FileUpload-form">
			<label htmlFor="fileUpload" className="FileUpload-button">
				Upload
			</label>
			<input className="FileUpload-input" id="fileUpload" type="file" onChange={props.selected} />
			<span className="FileUpload-status">{props.status}</span>
		</form>
	</div>
)

export default fileUpload
