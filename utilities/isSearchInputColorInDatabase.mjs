//verify color exists in collection/db
function isSearchInputColorInDatabase(database, searchColorInput){
    let searchInputColorHex

    const colorNamesArray = database.map(color => color.name);
    if(colorNamesArray.indexOf(searchColorInput) > - 1) {
        searchInputColorHex = colorNamesArray.indexOf(searchColorInput)
    }

    const colorHexValuesArray = database.map(color => color.hex)
    if(colorHexValuesArray.indexOf(searchColorInput) > - 1) {
        searchInputColorHex = colorHexValuesArray.indexOf(searchColorInput)
    }

    return (
        searchInputColorHex > -1 ? 
        (
            ()=>{
                console.info('Color input is accepted 😊') 
                return searchInputColorHex
            }
        )() :
        alert('Invalid color!☹️ Try again 😊')
    )
}
export default isSearchInputColorInDatabase