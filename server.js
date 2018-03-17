const express = require('express')
const serveIndex = require('serve-index')
const fs = require('fs')
const fileUpload = require('express-fileupload')

const app = express()
const port = process.env.PORT || 5000
const route = {
	files: '/api/files',
	public: '/public',
}
const publicFolder = './public/'

// File retrieval

app.use(route.public, express.static(publicFolder))

// File list endpoint

app.get(route.files, (request, response) => {
	response.send({
		files: fs.readdirSync(publicFolder)
	})
})


// File upload endpoint

app.use(fileUpload({
	limits: {
		fileSize: 50 * 1024 * 1024
	},
}))

app.post(route.files, (request, response) => {
	if (!request.files) {
		return response.status(400).send({
			error: {
				message: 'No files were uploaded.'
			}
		})
	}

	const uploadedFile = request.files.upload

	uploadedFile.mv(publicFolder + uploadedFile.name, error => {
		if (error) {
			return response.status(500).send({
				error: error
			})
		}

		response.send({
			success: 'File uploaded!'
		})
	})
})

app.listen(port, () => console.log(`Listening on port ${port}`))
