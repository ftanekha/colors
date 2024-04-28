import util from 'util'
import { exec } from 'node:child_process'

const asyncExec = util.promisify(exec)

async function insertArrayBracket(fileToBeTransformedPath, tempFilePath = 'temporaryFile.json', option){
    //validate option (check data type and spelling)
    function isOptionCorrect(optionString){
        if(typeof optionString !== 'string') throw new TypeError('Invalid 3rd argument, "option". Must be type "string" !!')
        if(optionString.toLowerCase() !== 'o' && optionString.toLowerCase() !== 'c') throw new SyntaxError('Invalid 3rd argument, "option".\nMust be "o", for "opemning tag" || "c" for "closing tag"!!')
        return true
    }

    if(isOptionCorrect(option)){
        //FIRST
        //remove trailing comma, by replacing it with a blank
        //uses temporary file to store manipulated data
        const removeTrailingCommaCommand = `sed '$ s/.$/ /' ${fileToBeTransformedPath} > ${tempFilePath} && mv ${tempFilePath} ${fileToBeTransformedPath}`
        try{
            const {stdout, stderr } = await asyncExec(removeTrailingCommaCommand)
            if(stderr) console.warn(`STDERR: ${stderr}`)

            const successMsg = `>> Last trailing comma received successfully 😊 \n>> See: ${fileToBeTransformedPath}`
            console.info(`STDOUT: ${stdout}\n${successMsg}`)
        }catch(err){
            // should contain code (exit code) and signal (that caused the termination).
            console.error(err)
        }

        //THEN
        //posible CLI directives
        const insertFirstOpeningBracketCommand = `(echo [ && cat ${fileToBeTransformedPath}) > ${tempFilePath} && mv ${tempFilePath} ${fileToBeTransformedPath}`
        const insertArrayClosingBracketCommand =  `echo ] >> ${fileToBeTransformedPath}`
        try {
            //determine correct CLI directive/command
            const {stdout, stderr } = await asyncExec(
                option === 'o' ?
                //if 'opening tag, 'option = 'o' 
                insertFirstOpeningBracketCommand :
                //else 'closing tag, 'option = 'c' 
                insertArrayClosingBracketCommand
            )
            //
            if(stderr) console.warn(`STDERR: ${stderr}`)
            
            const arrayBracket = option === 'o' ? 'Opening Bracket' : 'Closing Bracket'
            const successMsg = `>> ${arrayBracket} added successfully 😊 \n>> See: ${fileToBeTransformedPath}`
            console.info(`STDOUT: ${stdout}\n${successMsg}`)
        }catch(err){
            console.error(err)
        }
    }
}
export default insertArrayBracket
