const ClassifierAlpha = require('./ClassifierAlpha.js');
const PrimeAlpha = require('./PrimeAlpha.js');

const compose = (f, g) => (x,y) => g(f(x),y);

function Print(){
    function iterate(array, transform){
        return array.reduce(transform);
    }
    let perfect = (index => {return (new ClassifierAlpha(index)).isPerfect(index) ? "perfect, " : ""});
    let abundant = (index => {return (new ClassifierAlpha(index)).isAbundant(index) ? "abundant, " : ""});
    let deficient = (index => {return (new ClassifierAlpha(index)).isDeficient(index) ? "deficient, " : ""});
    let prime = (index => {return (new PrimeAlpha(index)).isPrime(index) ? "prime, " : ""});

    let PADP = (index =>{
        let result = perfect(index) + abundant(index) + deficient(index) + prime(index);
        return result;
    });
    let output = ((result,val) => {console.log(val.toString()+" : "+result.substring(0,result.length-2))});
    const pipe = compose(PADP, output);
    iterate(Array(100).fill().map((x,i) => i+1).filter((v) => (v > 0)), ((pre,val) => {pipe(val,val)}));
}

Print();