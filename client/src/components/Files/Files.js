import React, { Component } from 'react'
import FileRetrieve from './FileRetrieve/FileRetrieve'
import FileUpload from './FileUpload/FileUpload'
import './Files.css'

const endpoint = {
	files: '/api/files'
}
const fileSizeLimitMb = 15
const fileSizeLimit = 1024 * 1024 * fileSizeLimitMb

export default class Files extends Component {
	state = {
		files: [],
		rootUrl: '/public/',
		uploading: false,
		uploadingStatus: null,
	}

	componentDidMount() {
		this.updateFileList()
	}

	updateFileList() {
		this.fetchFilesList()
			.then(response => this.setState({
				files: response.files
			}))
	}

	fetchFilesList = async () => {
		const response = await fetch(endpoint.files)
		const json = await response.json()

		if (response.status !== 200) {
			throw Error(json.message)
		}

		return json
	}

	fileSelectedHandler = event => {
		const file = event.target.files[0]

		if (!file) {
			return
		}

		if (file.size > fileSizeLimit) {
			this.setState({ uploadingStatus: `The file is too big. The max size is ${fileSizeLimitMb} MB` })
			return
		}

		this.setState({ uploadingStatus: `...uploading ${file.name}` })

		this.uploadFile(file)
			.then(response => {
				this.updateFileList()
				this.setState({ uploadingStatus: 'Done' })
			})
			.catch(error => {
				this.setState({ uploadingStatus: 'Error' })
			})
	}

	uploadFile = async file => {
		const formData = new FormData()
		formData.append('upload', file)

		const requestOptions = {
			method: 'POST',
			body: formData,
			credentials: 'same-origin',
		};

		const response = await fetch(endpoint.files, requestOptions)
		const json = await response.json()

		if (response.status !== 200) {
			throw Error(json.error)
		}

		return json
	}

	render() {
		return (
			<section className="Files">
				<h4 className="Files-title">Upload File:</h4>
				<FileUpload
					selected={this.fileSelectedHandler}
					status={this.state.uploadingStatus} />

				<h4 className="Files-title">Download File:</h4>
				<FileRetrieve
					files={this.state.files}
					rootUrl={this.state.rootUrl} />
			</section>
		)
	}
}
