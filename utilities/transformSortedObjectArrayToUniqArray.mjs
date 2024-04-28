import util from 'util'
import { exec } from 'node:child_process'

const asyncExec = util.promisify(exec)

async function transformSortedObjectArrayToUniqArray(dataSourceFilePath, dataDestinationFilePath) {
    try {
        const {stdout, stderr } = await asyncExec(`uniq ${dataSourceFilePath} > ${dataDestinationFilePath}`)
        if(stderr) console.warn(`STDERR: ${stderr} ☹️`)
        
        const successMsg = `>> Array of Unique objects created successfully 😊 \n>> See: ${dataDestinationFilePath}`
        console.info(`STDOUT: ${stdout}\n${successMsg}`)
    }catch(error){
        // should contain code (exit code) and signal (that caused the termination).
        console.table(error)
    }
}
export default transformSortedObjectArrayToUniqArray
