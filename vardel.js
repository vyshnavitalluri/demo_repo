// Callback function, passed as a parameter in the higher order function
function callbackfunction(){
    console.log('i am call back function')
}
 
// higher order function
function higherorderfunction(func){
    console.log('i am higher order function')
    func()
}

higherorderfunction(callbackfunction)