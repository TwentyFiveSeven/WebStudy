const Dots = require('./Dots.js');

//점 두개가 모인 Straight Calss
class Line extends Dots{
    constructor(input){
        super(input);
        this.printString = "두 점 사이 거리는 ";
    }

    //직선의 넓이를 구합니다.
    calculateWide(){
        return Number(Math.sqrt(Math.pow(this.coordinate[0][0]-this.coordinate[1][0],2)+Math.pow(this.coordinate[0][1]-this.coordinate[1][1],2)).toFixed(6));
    }
}

module.exports = Line;