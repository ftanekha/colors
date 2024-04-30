function displayColorInfo(modifiedInputColorName){
    const inputColorDisplay = document.querySelector('#input-color-display')
    inputColorDisplay.style.backgroundColor = modifiedInputColorName
    const inputColorName = document.querySelector('#input-color-name')
    inputColorName.textContent = modifiedInputColorName
    inputColorName.style.color = modifiedInputColorName
    inputColorName.style.visibility= 'visible'

    //reflect color in color modifier border
    const modifiedColorDetails = document.querySelector('#modified-color-details')
    modifiedColorDetails.style.borderColor = modifiedInputColorName
}

export default displayColorInfo