import allColors from './allColors.mjs'

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
                const colorNamesArray = allColors.map(color => color.name)
                const colorHexValuesArray = allColors.map(color => color.hex)
                let searchInputColorHex

                if(colorHexValuesArray.indexOf(searchInput) > - 1) {
                    searchInputColorHex = colorHexValuesArray.indexOf(searchInput)
                }
                if(colorNamesArray.indexOf(searchInput) > - 1) {
                    searchInputColorHex = colorNamesArray.indexOf(searchInput)
                }
                if(searchInputColorHex == undefined) alert('invalid color input!')
                
                function displayModifiedColor(hex){
                    fetch(`https://www.thecolorapi.com/id?hex=${hex}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        const hsl = data.hsl.value
                        const modifiedColorDetails = document.querySelector('#modified-color-details')
                        modifiedColorDetails.style.backgroundColor = hsl
                        const colorModifierFactor = document.querySelector('#color-modifier-factor')
                        colorModifierFactor.addEventListener(
                            'change',
                            ()=> {
                                const modificationFactorInput  = parseInt(document.querySelector('#color-modifier-factor').value) || 0
                                
                                const lastPercentageSignPos = hsl.lastIndexOf('%')
                                const lastSpaceCharacterPos = hsl.lastIndexOf(' ')
                                //insert new lightness in hsl
                                const hslArray = Array.from(hsl)
                                hslArray.splice(hsl.lastIndexOf(' '), lastPercentageSignPos - lastSpaceCharacterPos, + modificationFactorInput)
                                modifiedColorDetails.style.backgroundColor = hslArray.join('')
                                //show modified color info
                                let hslArrayTrimmed =  [...hslArray]
                                //remove hsl prefix
                                hslArrayTrimmed.splice(0, 3)
                                //remove brackets 
                                hslArrayTrimmed.splice(0, 1)
                                hslArrayTrimmed.splice(hslArrayTrimmed.length - 1, 1)
                                //removed extra spaces
                                hslArrayTrimmed = hslArrayTrimmed.filter(
                                    char => char !== ' '
                                )
                                //
                                const hslArrayTrimmedToString = hslArrayTrimmed.join('')
                                //update color name, rgb, and hsl values
                                fetch(`https://www.thecolorapi.com/id?hsl=${hslArrayTrimmedToString}&format=json`)
                                .then(response => response.json())
                                .then(newData => {
                                    const spanInfo = document.querySelectorAll('span.info')
                                    spanInfo[0].textContent = searchInput
                                    spanInfo[1].textContent = newData.rgb.value
                                    spanInfo[2].textContent = hslArrayTrimmed.join('')
                                })
                                .catch(err => console.error(err.message))
                            }
                        )
                    })
                    .catch(err => console.error(err.message))
                }

                if(searchInputColorHex){
                    displayModifiedColor(colorHexValuesArray[searchInputColorHex])
                }
            }
        )
    }
)