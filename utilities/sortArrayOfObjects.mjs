/*
sort() iterates over the array and adjacent elements(a and b) are swapped 
by comparing their properties using localeCompare() method.
*/
//EXAMPLE: "a".localeCompare("b")
// if "a" comes before "b", the function yields -2 or -1 (or some other negative value)
// if "a" comes after "b", the function yields 2 or 1 (or some other positive value)
// if "a" and "b" are equivalent, the function returns 0
//typeof key MUST be 'string'!! 
function sortArrayOfObjects(array, key = 'string'){
    return new Promise(
        (res, rej)=> {
            if(typeof key === 'string'){
                //only select colors with valid hex codes
                array = array.filter(
                    color => (color.hex).length === 3 || (color.hex).length === 6
                )

                res(
                        array.sort(
                            (a, b) => a[key].localeCompare(b[key])
                        )
                )
            }else{
                rej(new TypeError('The argument for the "key" parameter must be of type string'))
            }
        }
    )
}
export default sortArrayOfObjects