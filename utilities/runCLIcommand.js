function runCLIcommand(command = 'ls -la'){
    exec(command)
    .then(
        ({error, stdout, stderr})=>{
            if(error) throw Error(`Exec error: ${error}`)
            if(stderr) console.warn(`stderr: ${stderr}`)
            return console.info(`stdout: ${stdout}`)
        }
    ) 
}
export default runCLIcommand