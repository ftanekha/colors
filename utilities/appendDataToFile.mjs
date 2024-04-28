import { appendFile } from 'node:fs'
//write data to file, line by line
function appendDataToFile(path, data, dataFormat){
    //validate data format (check data type and spelling)
    function isDataFormatCorrect(format){
        //for default behaviour
        if(format === undefined || format === null) return 'unformatted'//prints default message

        if(format && typeof format !== 'string') throw new TypeError('Invalid 3rd argument, "dataFormat". Must be type "string" !!')
        //make the format argument case insensitive by default
        format = format.toLowerCase()
        if(
            (format !== 's' && format !== 'sorted')
                            && 
            (format !== 'u' && format !== 'unsorted')
        ) throw new SyntaxError('Invalid 3rd argument, "dataFormat". Must be "s" or "sorted" || "u" or "unsorted" !!')

        //normalise dataFormat
        if(dataFormat === 's' || dataFormat === 'sorted') return 'sorted'
        if(dataFormat === 'u' || dataFormat === 'unsorted') return 'unsorted'
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
                        pieceOfData = `${tab} ${JSON.stringify(pieceOfData)}${trailingCommaAndLineBreak}`

                        appendFile(
                            path, pieceOfData,
                            (err)=> {
                               if(err) rej(err.message)
                            }
                        )
                    }
                )

                const finalDataFomart = isDataFormatCorrect(dataFormat)
                if(finalDataFomart === 'unformatted'){
                    //default message
                    res(`>> ${data.length} lines of data \n>> ${'successfully appended'.toUpperCase()} 😊 \n>> See: ${path}`)
                }else{
                    res(`>> ${data.length} lines of ${finalDataFomart.toUpperCase()} data \n>> ${'successfully appended'.toUpperCase()} 😊 \n>> See: ${path}`)
                }
            }
        )
    }
}
export default appendDataToFile