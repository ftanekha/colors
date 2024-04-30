function displayAlternativeColorHexcodes(colorInfoArray, inputColorDisplay, colorIndex = 0 ){
    console.log(colorIndex)
   //HERE
    //begin the presenation
    if(colorIndex >= colorInfoArray.length) colorIndex = 0
    inputColorDisplay.style.backgroundColor = `#${(colorInfoArray[colorIndex]).hex}`
    
    const colorPresentationInterval = setTimeout(
        ()=> {
             colorIndex++
            //recursion
            displayAlternativeColorHexcodes(colorInfoArray, inputColorDisplay, colorIndex)
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