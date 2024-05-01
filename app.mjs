import displayColorInfo from './frondEndFunctions/displayColorInfo.mjs'
import displayAlternativeColorHexcodes from './frondEndFunctions/displayAlternativeColorHexcodes.mjs'
import spinnerEffect from './frondEndFunctions/spinnerEffect.mjs' 

document.addEventListener(
    'DOMContentLoaded',
    ()=>{
        const searchBtn = document.querySelector('#search-btn')
        //PROCESS USER INPUT
        searchBtn.addEventListener(
            'click',
            function(ev){
                ev.preventDefault()
                //get user input color name
                const searchInput = (document.querySelector('#search-input').value).toLowerCase()
                //validate user input
                if(!searchInput){
                    return alert('Please choose a valid color!')
                }else{
                    //fetch color info from database i.e. name & hex code
                    fetch(`http://localhost:3000/isSearchInputColorInDatabase/${searchInput}`)
                    .then(res => res.json())
                    //display user color input
                    .then(colorInfo => {
                        const inputColorDisplay = document.querySelector('div#input-color-display')

                        //the color names in the database use spaces for multi-part names 
                        //for example 'royal blue' instead of 'royal blue' 
                        //encourange user to use space
                        if(colorInfo === 'not found'){
                            return alert(
                                `\n\nSorry, that color is not available.\nPlease try another color. 😊\n\n\nIf the color is a muliti-parter, like 'RoyalBlue'\nType 'Royal Blue', with a space, instead! 😁`
                            )
                        //if there are more than one hex Code in colorInfo array
                        //the color name is associated with multiple hexcodes
                        //show the other options/ hexCodes available
                        }else if(colorInfo.length > 1){
                            //however, browsers don't use space, so FIRST convert the name from the database to a single word
                            //So, just grab the color name from the colorInfo.
                            //it's the same name for all the objects in the objects, just different hexCodes
                            const tempArray = (colorInfo[0].name).split(' ')
                            const modifiedInputColorName = tempArray.join('')
                            //display the color info (name & hexCode) in the app
                            displayColorInfo(modifiedInputColorName)
                            //inform the user
                            alert(`This color has multiple hex codes associated with it.\n\nClick OK to begin the presentation inside the color wheel.\n\nTo stop the presentation, Click anywhere on the page. 😊`)
                            //show every color listed in the colorInfo array
                            displayAlternativeColorHexcodes(colorInfo, inputColorDisplay, 0)
                            //turn on spinner-effect (uses CSS Keyframes)
                            spinnerEffect(inputColorDisplay)
                        }else{
                            const tempArray = (colorInfo[0].name).split(' ')
                            const modifiedInputColorName = tempArray.join('')
                            displayColorInfo(modifiedInputColorName)
                            //turn on spinner-effect (uses CSS Keyframes)
                            spinnerEffect(inputColorDisplay) //has default value = 5000
                        }
                    })
                    .catch(err => console.error(err))
                }
            }
        )
    }
)