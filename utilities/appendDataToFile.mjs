//write data to file
function appendDataToFile(path, data, encoding, asyncAppendFile){
    data.forEach(
        pieceOfData => {
            asyncAppendFile(path, JSON.stringify(pieceOfData) + ',\n' , encoding)
            .catch(err => {if(err) throw err})
        }
    )
    return `Data successfully written to file:${path.toUpperCase()} 😊`
}
export default appendDataToFile