import cheprasovColors from './cheprasovColors.json' assert { type: 'json' }
import chrigaColors from './chrigaColors.json' assert { type: 'json' }

let cheprasovColorsOptimized = cheprasovColors.map(color => {
    //remove aliases
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

export default allColors