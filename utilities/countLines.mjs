import {exec} from 'child_process'

function countLines(data){
    return exec(
        `wc -l < ${data}`,
        (error,  stdout, stderr)=>{
            if(error) return console.error(`ERROR: ${error}`)
            if(stderr) throw(`STDERR: ${stderr}`)
            console.log(`DB file consists of ${stdout} lines of data.`)
        }
    )
}
export default countLines
