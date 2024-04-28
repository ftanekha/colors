import allColors from './allColors.mjs'
import trimHSL from './utilities/trimHSL.mjs'
import isSearchInputColorInDatabase from './utilities/isSearchInputColorInDatabase.mjs'

document.addEventListener(
    'DOMContentLoaded',
    ()=> {
        const searchBtn = document.querySelector('#search-btn')
        searchBtn.addEventListener(
            'click',
            function(ev){
                ev.preventDefault()
                const searchInput = (document.querySelector('#search-input').value).toLowerCase()
                const inputColorDisplay = document.querySelector('#input-color-display')
                inputColorDisplay.style.backgroundColor = searchInput || 'white'
                const inputColorName = document.querySelector('#input-color-name')
                inputColorName.textContent = searchInput
                inputColorName.style.color = searchInput
                inputColorName.style.visibility= 'visible'
                //verify color exists in collection/db
                isSearchInputColorInDatabase(allColors ,searchInput)
                //reset colorModifierFactor
                const colorModifierFactor = document.querySelector('#color-modifier-factor')
                colorModifierFactor.value = 0
                //reset modifiedColorDetails container bgcolor
                const modifiedColorDetails = document.querySelector('#modified-color-details')
                if(!colorModifierFactor.value) {
                    modifiedColorDetails.style.backgroundColor = 'white'
                    modifiedColorDetails.style.borderColor = searchInput
                }
                //initialise input color info
                const colorInfo = document.querySelectorAll('.info')
                colorInfo[0].textContent = searchInput
                //fetch and display color property values
                function displayModifiedColor(hex){
                    fetch(`https://www.thecolorapi.com/id?hex=${hex}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        const hsl = data.hsl.value
                        // console.log(data)
                        //reflect color change
                        modifiedColorDetails.style.borderColor = hsl;
                        if(colorModifierFactor.value == '0') {
                            modifiedColorDetails.style.backgroundColor = 'white'
                            modifiedColorDetails.style.borderColor = searchInput
                        }
                        colorModifierFactor.addEventListener(
                            'change',
                            ()=> {
                                const modificationFactorInput  = parseInt(document.querySelector('#color-modifier-factor').value) || 0
                                //trim hsl string
                                const hslArrayTrimmedToString = trimHSL(hsl, modificationFactorInput, modifiedColorDetails)
                                //update color name, rgb, and hsl values
                                fetch(`https://www.thecolorapi.com/id?hsl=${hslArrayTrimmedToString}&format=json`)
                                .then(response => response.json())
                                .then(newData => {
                                    //reset modifiedColorDetails container bgcolor
                                    if(parseInt(colorModifierFactor.value) == 0) {
                                        colorInfo[0].textContent = searchInput
                                    }else
                                    {
                                        colorInfo[0].textContent = newData.name.value
                                    }
                                    //display new color info
                                    //media query
                                    const mquery = window.matchMedia('(max-width: 430px)');
                                    if(mquery.matches){
                                        console.log('yo')
                                        colorInfo[1].textContent = newData.rgb.value
                                        colorInfo[2].innerHTML = hslArrayTrimmed.join('')
                                    }else{
                                        colorInfo[0].innerHTML = `Name:&nbsp;<span>${newData.name.value}</span`
                                        colorInfo[1].innerHTML = `RGB:&nbsp;&nbsp; <span>${newData.rgb.value}</span`
                                        colorInfo[2].innerHTML = `HSL:&nbsp;&nbsp; <span>${hslArrayTrimmed.join('')}</span`
                                    }
                                })
                                .catch(err => console.error(err.message))
                            }
                        )
                    })
                    .catch(err => console.error(err.message))
                }
                //verify color exists in collection/db
                const searchInputColorHex = isSearchInputColorInDatabase()
                if(searchInputColorHex){
                    displayModifiedColor(colorHexValuesArray[searchInputColorHex])
                }
            }
        )
    }
)