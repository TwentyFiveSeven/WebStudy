const Factors = require('./Factors.js');

class PrimeAlpha {
    number = 0;

    constructor(number) {
        this.number = number
    }

    equalSet(aset, bset) {
        if (aset.size !== bset.size) return false;
        for (var a of aset) if (!bset.has(a)) return false;
        return true;
    }

    isPrime(number) {
        var primeSet = new Set([1, number]);
        return number > 1 && this.equalSet(Factors(number), primeSet);
    }
}
module.exports = PrimeAlpha;
