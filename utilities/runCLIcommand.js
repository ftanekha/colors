const { exec } = require('node:child_process')

function runCLIcommand(command = 'ls -la'){
    exec(
        command,
        (error, stdout, stderr) =>{
            if(error) return console.error(`exec error: ${error}`)
            if(stderr) return console.error(`stderr: ${stderr}`)
            return console.info(`stdout: ${stdout}`)
        }
    )
}
module.exports = {runCLIcommand}