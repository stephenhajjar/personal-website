const fs = require('fs')
const { exec } = require('child_process')

module.exports.start = () => {
	fs.watch('./source', (eventType, filename) => {
		if (eventType === 'change') {
			let name
			let extension
			[name, extension] = filename.split('.') 

			output = name + '.html'
			if (extension == 'md') {
				exec(`./compile-2-html.sh ${filename} ${output}`, (error, stdout, stderr) => {
					if (error) {
						console.log(`error: ${error}`)
					}
					console.log(`[process-output]: ${stdout}`)
				})
			}
		}
	})
}

