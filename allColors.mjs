import cheprasovColors from './apiData/cheprasovColors.json' assert { type: 'json' }
import chrigaColors from './apiData/chrigaColors.json' assert { type: 'json' }
import appendDataToFile from './utilities/appendDataToFile.mjs'
import sortArrayOfObjects from './utilities/sortArrayOfObjects.mjs'
import confirmPositiveResult from './utilities/confirmPositiveResult.mjs'
import transformSortedObjectArrayToUniqArray from './utilities/transformSortedObjectArrayToUniqArray.mjs'
import insertArrayBracket from './utilities/insertArrayBracket.mjs'

//CLEANUP data  
const cheprasovColorsTrimmed = cheprasovColors.map(color => { 
    if((Array.from(color.name)).includes('(')){
        color = {
            //remove color name aliases, inside brackets ()
            name: color.name.substring(0, (color.name).indexOf('(') -1),
            //remove # from hex code
            hex: color.hex.substring(1)
        }
    }
    return  {
        name: color.name,
        hex: color.hex.substring(1)
    }
})
const chrigaColorsArray = chrigaColors.map(
    color => ({
        name: color[1],
        hex: color[0]
    })
)

//GATHER data
const allColorsMixedCase = [...cheprasovColorsTrimmed , ...chrigaColorsArray]
const allColors = allColorsMixedCase.map(
    color => ({name: (color.name).toLowerCase(), hex: color.hex})
)

//Database FILE PATHS
const allColorsUnsortedPath = 'database/allColorsUnsorted.json'
const allColorsSortedPath = 'database/allColorsSorted.json'
const allColorsSortedUniqPath = 'database/allColorsSortedUniq.json'
//Append unsorted data
appendDataToFile(allColorsUnsortedPath, allColors, 'u')
.then( appendDataToFileMsg => confirmPositiveResult(appendDataToFileMsg, 'top') )
//SORT 'unsorted' data
.then(()=> sortArrayOfObjects( allColors, 'name'))
//Append sorted data
.then( sortedArrayOfColors => appendDataToFile(allColorsSortedPath, sortedArrayOfColors, 's') )
//confirm sorted data appended successfully
.then( appendDataToFileMsg => {
        confirmPositiveResult(appendDataToFileMsg, 'bottom')
        return appendDataToFileMsg
    }
)
//remove duplicates
.then(
    () => {
        //requires timeout due to upstream process latency
        //modify delay to suit needs e.g 5e3, 1e4, 20000 etc (figure it out with trial and error)
        const transformSortedObjectArrayToUniqArrayTimeout = setTimeout(
            ()=>{
                //the third argument 'delayInMilliSeconds' IS OPTIONAL, default value == 5e3 == 5s. 
                //See file: "utilities\transformSortedObjectArrayToUniqArray.mjs" for more info
                transformSortedObjectArrayToUniqArray(allColorsSortedPath, allColorsSortedUniqPath)

                // RESTRUCTURE data into an array
                const openingArrayBracketTimeout = setTimeout(
                    ()=> {
                        //insert array opening tag
                        insertArrayBracket(allColorsSortedUniqPath, 'temporaryFile.json', 'o')

                        //insert array closing tag
                        const closingArrayBracketTimeout = setTimeout(
                            ()=> {
                                insertArrayBracket(allColorsSortedUniqPath, 'temporaryFile.json', 'c')

                                //clear all timeouts/ garbage collection
                                clearTimeout(openingArrayBracketTimeout)
                                clearTimeout(closingArrayBracketTimeout)
                                clearTimeout(transformSortedObjectArrayToUniqArrayTimeout)
                            }, 5e3
                        )
                    }, 5e3
                )
            }, 5e3
        )
    }
)
.catch(err => console.error(err))