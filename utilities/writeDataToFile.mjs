//write data to file
function writeDataToFilDataToFile(path, data, encoding, asyncWriteDataToFilFile){
    const dataArray = []
    data.forEach( pieceOfData => dataArray.push(pieceOfData) )
    asyncWriteDataToFilFile(path, JSON.stringify(dataArray), encoding)
    .then(
        ()=> console.info(`Data successfully appended to file:${path.toUpperCase()} 😊`)
    )
    .catch(err => console.table(
        {
            Error: err.name,
            Type:  `${err.message} ☹️` 
        }
    ))
}
export default writeDataToFilDataToFile