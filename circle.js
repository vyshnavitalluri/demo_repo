let area = function(radius){
    return Math.PI * radius * radius
}
 
let diameter = function(radius){
    return 2 * radius
}
function calculate(radiusArray,logic){
    let output =[];
 
    for(let i=0;i<radiusArray.length;i++){
        output.push(logic(radiusArray[i]))
    }
    return output;
 
}

let radius =[1,2,3]
console.log(calculate(radius,area));
console.log(calculate(radius,diameter));
 
console.log(radius.map(area));
console.log(radius.map(diameter));
 