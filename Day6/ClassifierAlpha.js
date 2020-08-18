const Factors = require('./Factors.js');

class ClassifierAlpha {
    number = 0;

    constructor(number) {
        this.number = number;
    }    

    isPerfect(number) {
        return (ClassifierAlpha.sum(Factors(number)) - number) == number 
    }

    isAbundant(number) {
        return (ClassifierAlpha.sum(Factors(number)) - number) > number 
    }

    isDeficient(number) {
        return (ClassifierAlpha.sum(Factors(number)) - number) < number 
    }

    static sum(factors) {return Array.from(factors).reduce((pre,val) => pre + val)};
}

module.exports = ClassifierAlpha;