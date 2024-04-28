//This funtion has an optional 'option' argument for message logging purposes ONLY.
//valid option values on invocation are 't', 'top, , 'b', 'bottom'
//if called WITHOUT the option argument, default logging behaviour results
function confirmPositiveResult(message, option){
    function isOptionsValid(optionString){
        if(optionString && typeof optionString !== 'string') throw new TypeError('Invalid 2nd argument, "option". Must be type "string" !!')

        if(optionString && typeof optionString === 'string'){
            //make option argument case insentitive
            optionString = optionString.toLowerCase()
            //check for valid value
            if(
                (optionString !== 't' && optionString !== 'top') 
                                      && 
                (optionString !== 'b' && optionString !== 'bottom')
            ) throw new SyntaxError('Invalid 2nd argument, "option".\nMust be "t" or "top" || "b" or "bottom"!!')    
        }
        // normalise optionString value 
        if(optionString === 't' || optionString === 'top') return 'top'
        if(optionString === 'b' || optionString === 'bottom') return 'bottom'

        //if NO option included, the default FULL confirmation is printed 
        return true
    }
    
    if(isOptionsValid(option)){
        const topOrBottom = isOptionsValid(option)

        if(topOrBottom === 'top'){
            console.log('........................')
            console.log('\n')
            console.info(message)
        }else if(topOrBottom === 'bottom'){
            console.info(message)
            console.log('........................')
            console.log('\n')
        }else{
            console.log('........................')
            console.log('\n')
            console.info(message)
            console.log('\n')
            console.log('........................')
        }
    }
}
export default confirmPositiveResult