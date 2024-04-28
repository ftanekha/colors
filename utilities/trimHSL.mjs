// trim hsl string
function trimHSL(hslVal, modificationFactorInputVal, modificationTargetEl){
    const lastPercentageSignPos = hslVal.lastIndexOf('%')
    const lastSpaceCharacterPos = hslVal.lastIndexOf(' ')
    //insert new lightness in hsl
    const hslArray = Array.from(hslVal)
    hslArray.splice(lastSpaceCharacterPos, lastPercentageSignPos - lastSpaceCharacterPos, + modificationFactorInputVal)
    //reflect color change in target element's border
    modificationTargetEl.style.borderColor = hslArray.join('')
    //show modified color info
    let hslArrayTrimmed =  [...hslArray]
    //remove 'hsl' prefix
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
    return hslArrayTrimmedToString
}
export default trimHSL