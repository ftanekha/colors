function displayAlternativeColorHexcodes(colorInfoArray, inputColorDisplay, colorIndex){
    //begin the presenation
    if(colorIndex >= colorInfoArray.length) colorIndex = 0

    let currentColorHexCode = `#${(colorInfoArray[colorIndex]).hex}`
    inputColorDisplay.style.backgroundColor = currentColorHexCode
    document.querySelector('#input-color-display-hexcode').textContent = currentColorHexCode

    const colorPresentationInterval = setTimeout(
        ()=> {
            //recursion
            displayAlternativeColorHexcodes(colorInfoArray, inputColorDisplay, ++colorIndex)
        }, 2000
    )
    //stop the presentation when user clicks on the page
    document.addEventListener(
        'click', ()=> {
            clearInterval(colorPresentationInterval)
            document.removeEventListener(
                'click', ()=> {
                    clearInterval(colorPresentationInterval)
                }
            )
            //reset colorIndex
            colorIndex = 0
        }
    )
}

export default displayAlternativeColorHexcodes