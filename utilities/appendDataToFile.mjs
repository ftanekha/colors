import { appendFile } from 'node:fs'
//write data to file, line by line
function appendDataToFile(path, data, dataFormat){
    console.log(data[data.length - 1])
    //validate data format (check data type and spelling)
    function isDataFormatCorrect(format){
        if(typeof format !== 'string') throw new TypeError('Invalid 3rd argument, "dataFormat". Must be type "string" !!')
        if(format !== 'sorted' && format !== 'unsorted') throw new SyntaxError('Invalid 3rd argument, "dataFormat". Must be "sorted" || "unsorted" !!')
        return true
    }
    //append data to given file path
    if(isDataFormatCorrect(dataFormat)){
        //organise data with escape characters
        const tab = '\t'
        const trailingCommaAndLineBreak = ',' + '\n' 
    
        return new Promise(
            (res, rej)=>{
                data.forEach(
                    pieceOfData => {
                        //HERENOW
                        pieceOfData = `${tab} ${JSON.stringify(pieceOfData)}${trailingCommaAndLineBreak}`
                        // (
                        //     // determine the argument value for data
                        //     data.indexOf(pieceOfData) === data.length ?
                        //     //make sure to exclude the last trailing comma as it makes the json invalid 
                        //     `${tab} ${JSON.stringify(pieceOfData)}`:
                        //     `${tab} ${JSON.stringify(pieceOfData)}${trailingCommaAndLineBreak}`
                        // );
                        appendFile(
                            path, pieceOfData,
                            (err)=> {
                               if(err) rej(err.message)
                            }
                        )
                    }
                )
                res(`>> ${data.length} lines of ${dataFormat.toUpperCase()} data \n>> ${'successfully appended'.toUpperCase()} 😊 \n>> See: ${path}`)
            }
        )
    }
}
export default appendDataToFile