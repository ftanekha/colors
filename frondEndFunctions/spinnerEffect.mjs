function spinnerEffect(colorWheelElement, delay = 5000){
    colorWheelElement.classList.add('spinner')
    const timeout = setTimeout(
        ()=> {
            colorWheelElement.classList.remove('spinner')
            clearTimeout(timeout)
        }, delay
    )
}

export default spinnerEffect