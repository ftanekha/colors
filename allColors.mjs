import { appendFile } from 'node:fs/promises'
import appendDataToFile from './utilities/appendDataToFile.mjs'
import cheprasovColors from './cheprasovColors.json' assert { type: 'json' }
import chrigaColors from './chrigaColors.json' assert { type: 'json' }
import sortArrayOfObjects from './utilities/sortArrayOfObjects.mjs'
import {exec} from 'node:child_process'

const cheprasovColorsOptimized = cheprasovColors.map(color => {
    //remove color name aliases
    if((Array.from(color.name)).includes('(')) return {
        name: color.name.substring(0, (color.name).indexOf('(')),
        hex: color.hex 
    }
    return color
})
//collect names only
const cheprasovColorsNamesArray = cheprasovColorsOptimized.map(
    color => color.name
)

let chrigaColorsObjects = chrigaColors.map(
    color => {
        if(cheprasovColorsNamesArray.includes(color[1])){
            return {name: color[1], hex: `#${color[0]}`}
        }
    }
)
//remove undefined objects
chrigaColorsObjects = chrigaColorsObjects.filter( color => color !== undefined)

const allColorsCapitalised = [...cheprasovColorsOptimized , ...chrigaColorsObjects]
const allColors = allColorsCapitalised.map(
    color => ({name: (color.name).toLowerCase(), hex: color.hex})
)
for(let color of allColors) color.hex = (color.hex).substring(1)

//CLEANUP data, remove duplicates       
const databasePath = './allColorsSorted.mjs'
//sort database/colors
Promise.resolve(
    appendDataToFile(databasePath, sortArrayOfObjects(allColors, 'name'), 'utf-8', appendFile),
)
.then( msg => console.info(msg) )
.catch(err => console.error(err.message))

//count lines
exec(
    `cat ${databasePath} | wc -l`, 
    (error, stdout, stderr) =>{
        if(error) return console.error(`exec error: ${error}`)
        if(stderr) return console.error(`stderr: ${stderr}`)
        return console.info(`DB file ${databasePath.toUpperCase()} cinsists of ${stdout} lines of data.`)
    }
);
//remove duplicates in-place: check notes.txt
[
    `sort ${databasePath}  | uniq > ${databasePath}`,
    //verify less lines after removing duplicates
    `cat ${databasePath}  | wc -l`
]
.forEach(
    command => {
        exec(
            command,
            (error, stdout, stderr) =>{
                if(error) return console.error(`exec error: ${error}`)
                if(stderr) return console.error(`stderr: ${stderr}`)
                return console.info(`stdout: ${stdout}`)
            }
        )
    }
)
