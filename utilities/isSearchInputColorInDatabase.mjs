import allColorsSortedUniq from '../database/allColorsSortedUniq.json' assert { type: 'json' }

//verify color exists in collection/db
function isSearchInputColorInDatabase(colorName){
    let colorInfo
    //check that color exists in database
    const colorNamesArray = allColorsSortedUniq.map(color => color.name)
    if(colorNamesArray.includes(colorName)) {
        const colorHexCodeArray = []
        allColorsSortedUniq.forEach(
            color => {
                if(color.name === colorName) colorHexCodeArray.push(color)
            }
        )
        colorInfo = colorHexCodeArray
    }else{
        colorInfo = 'not found'
    }

    return colorInfo

    // const colorHexValuesArray = allColorsSortedUniq.map(color => color.hex)
    // if(colorHexValuesArray.indexOf(colorName) > - 1) {
    //     searchInputColorHexCode = colorHexValuesArray.indexOf(colorName)
    // }

    // return (
    //     searchInputColorHexCode > -1 ? 
    //     (
    //         ()=>{
    //             console.info('Color input is accepted 😊') 
    //             return searchInputColorHexCode
    //         }
    //     )() :
    //     console.error('Invalid color!☹️ Try again 😊')
    // )
}
export default isSearchInputColorInDatabase