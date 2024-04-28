const colorsArray = [
    {"name":"turquoise blue","hex":"00FFEF"},
    {"name":"turmeric","hex":"CABB48"},
    {"name":"turquoise blue","hex":"00FFEF"},
    {"name":"turquoise","hex":"30D5C8"}, 
    {"name":"azure","hex":"F0FFFF"},
    {"name":"azure","hex":"007FFF"}
];
const colorNames = colorsArray.map(
    color => color.name
);
// colorNames;
let repeatingColors = colorNames.filter(
    colorName => {
        const repetitions = []
        colorNames.forEach(color =>  {
            if(colorName === color) repetitions.push(colorName)
        })
        if(repetitions.length > 1) return colorName
    }
);
// trim array
repeatingColors = [...new Set(repeatingColors)];

function displayUnverifiedColorCodes(targetUnverifiedColor){
    // collect repeating color hex codes in one object
    const targetUnverifiedColorDetails = {name: targetUnverifiedColor, indexes: []}
    colorsArray.forEach(
        color => {
            if(color.name === targetUnverifiedColor){
                // list all the colors with matching names and hex codes
                targetUnverifiedColorDetails.indexes.push(colorsArray.indexOf(color))
            }
        }
    )
    // display alternating hexcodes
    const maxTime = targetUnverifiedColorDetails.indexes.length
    console.log(targetUnverifiedColorDetails.indexes, maxTime)
    
    for(let i = 0; i < maxTime; i++){
        const interval = setInterval(
            ()=> {
                if(i >= maxTime) i = 0
                console.log(
                    //target color info object
                    colorsArray[targetUnverifiedColorDetails.indexes[i]]
                )
            },
            1e4
        )
        //stop display
        const timeout = setTimeout(
            ()=>{
                clearInterval(interval)
                clearTimeout(timeout)
            },
            2e4
        )
    }
}
displayUnverifiedColorDetails('turquoise blue')