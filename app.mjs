
// import trimHSL from './utilities/trimHSL.mjs'
// import isSearchInputColorInDatabase from './utilities/isSearchInputColorInDatabase.mjs'

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
                        //the color names in the database use spaces for multi-part names 
                        //for example 'royal blue' instead of 'royal blue' 
                        //encourange the user to use space
                        if(colorInfo === 'not found') return alert(
                            `\n\nSorry, that color is not available.\nPlease try another color 😊.\n\n\nIf the color is a 2-parter, like 'RoyalBlue'\nType Royal Blue, with a space, instead! 😁`
                        )
                        //however, browsers don't use space, so FIRST convert the name from the database to a single word
                        let modifiedInputColorName = ''
                        if(searchInput.includes(' ')){
                            const tempArray = searchInput.split(' ')
                            modifiedInputColorName = tempArray.join('')
                        }else{
                            modifiedInputColorName = colorInfo[0].name
                        }
                        //display the color info in the app
                        const inputColorDisplay = document.querySelector('#input-color-display')
                        inputColorDisplay.style.backgroundColor = modifiedInputColorName
                        const inputColorName = document.querySelector('#input-color-name')
                        inputColorName.textContent = modifiedInputColorName
                        inputColorName.style.color = modifiedInputColorName
                        inputColorName.style.visibility= 'visible'
                        //reflect color in color modifier
                        const modifiedColorDetails = document.querySelector('#modified-color-details')
                        modifiedColorDetails.style.borderColor = modifiedInputColorName
                        //turn on spinner-effect (uses CSS Keyframes)
                        function spinnerEffect(delay){
                            inputColorDisplay.classList.add('spinner')
                            const timeout = setTimeout(
                                ()=> {
                                    inputColorDisplay.classList.remove('spinner')
                                    clearTimeout(timeout)
                                }, delay
                            )
                        }
                        spinnerEffect(3000)
                       
                    })
                    .catch(err => console.error(err))
                }
                //display user color input
                

                // inputColorDisplay.style.backgroundColor = searchInput || 'white'
                // const inputColorName = document.querySelector('#input-color-name')
                // inputColorName.textContent = searchInput
                // inputColorName.style.color = searchInput
                // inputColorName.style.visibility= 'visible'
        //         //verify color exists in collection/db
        //         isSearchInputColorInDatabase(searchInput)
        //         //reset colorModifierFactor
        //         const colorModifierFactor = document.querySelector('#color-modifier-factor')
        //         colorModifierFactor.value = 0
        //         //reset modifiedColorDetails container bgcolor
        //         const modifiedColorDetails = document.querySelector('#modified-color-details')
        //         if(!colorModifierFactor.value) {
        //             modifiedColorDetails.style.backgroundColor = 'white'
        //             modifiedColorDetails.style.borderColor = searchInput
        //         }
        //         //initialise input color info
        //         const colorInfo = document.querySelectorAll('.info')
        //         colorInfo[0].textContent = searchInput
        //         //fetch and display color property values
        //         function displayModifiedColor(hex){
        //             fetch(`https://www.thecolorapi.com/id?hex=${hex}&format=json`)
        //             .then(response => response.json())
        //             .then(data => {
        //                 const hsl = data.hsl.value
        //                 // console.log(data)
        //                 //reflect color change
        //                 modifiedColorDetails.style.borderColor = hsl;
        //                 if(colorModifierFactor.value == '0') {
        //                     modifiedColorDetails.style.backgroundColor = 'white'
        //                     modifiedColorDetails.style.borderColor = searchInput
        //                 }
        //                 colorModifierFactor.addEventListener(
        //                     'change',
        //                     ()=> {
        //                         const modificationFactorInput  = parseInt(document.querySelector('#color-modifier-factor').value) || 0
        //                         //trim hsl string
        //                         const hslArrayTrimmedToString = trimHSL(hsl, modificationFactorInput, modifiedColorDetails)
        //                         //update color name, rgb, and hsl values
        //                         fetch(`https://www.thecolorapi.com/id?hsl=${hslArrayTrimmedToString}&format=json`)
        //                         .then(response => response.json())
        //                         .then(newData => {
        //                             //reset modifiedColorDetails container bgcolor
        //                             if(parseInt(colorModifierFactor.value) == 0) {
        //                                 colorInfo[0].textContent = searchInput
        //                             }else
        //                             {
        //                                 colorInfo[0].textContent = newData.name.value
        //                             }
        //                             //display new color info
        //                             //media query
        //                             const mquery = window.matchMedia('(max-width: 430px)');
        //                             if(mquery.matches){
        //                                 console.log('yo')
        //                                 colorInfo[1].textContent = newData.rgb.value
        //                                 colorInfo[2].innerHTML = hslArrayTrimmed.join('')
        //                             }else{
        //                                 colorInfo[0].innerHTML = `Name:&nbsp;<span>${newData.name.value}</span`
        //                                 colorInfo[1].innerHTML = `RGB:&nbsp;&nbsp; <span>${newData.rgb.value}</span`
        //                                 colorInfo[2].innerHTML = `HSL:&nbsp;&nbsp; <span>${hslArrayTrimmed.join('')}</span`
        //                             }
        //                         })
        //                         .catch(err => console.error(err.message))
        //                     }
        //                 )
        //             })
        //             .catch(err => console.error(err.message))
        //         }
        //         //verify color exists in collection/db
        //         const searchInputColorHex = isSearchInputColorInDatabase()
        //         if(searchInputColorHex){
        //             displayModifiedColor(colorHexValuesArray[searchInputColorHex])
        //         }
            }
        )
    }
)