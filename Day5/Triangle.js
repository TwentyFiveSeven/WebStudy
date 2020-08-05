const Line = require('./Line.js');

//직선 세개가 모인 Triangle Calss
class Triangle extends Line{
    constructor(input){
        super(input);
        this.printString = "삼각형의 넓이는 ";
    }

    //삼각형의 넓이를 구합니다.
    calculateWide(){
        let length = [],temp = [];
        for(let i=0;i<2;i++){
            for(let j = i+1;j<3;j++){
                temp = [this.coordinate[i]];
                temp.push(this.coordinate[j]);
                length.push((new Line(temp)).calculateWide());
            }
        }
        let s = (length[0]+length[1]+length[2])/2;
        let ret = Math.sqrt(s*(s-length[0])*(s-length[1])*(s-length[2])).toFixed(5);
        return ret;
    }
}


module.exports = Triangle;