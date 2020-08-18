function Factors(number){
    function iterate(array, transform){
        return array.reduce(transform,new Set());
    }
    let isFactor = ((number,potentialFactor) => { return (number % potentialFactor == 0 ? 1 : 0)});
    let factors = ((pre,val, number) =>{
        if(isFactor(number,val)){
            pre.add(val);
            pre.add(number/val);
        }
    });
    return iterate(Array(parseInt(Math.sqrt(number))).fill().map((x,i) => i+1), (pre,val) => {factors(pre,val,number); return pre});
}

module.exports = Factors;