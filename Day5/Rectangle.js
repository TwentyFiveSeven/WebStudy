const Line = require('./Line.js');
//직선 네개가 모인 Rectangle Calss
class Rectangle extends Line{
    constructor(input){
        super(input);
        this.printString = "사각형의 넓이는 ";
    }

    //사각형의 넓이를 구합니다.
    calculateWide(){
        let length = [],temp = [],Stemp=[],calList=[];
        for(let i=0;i<3;i++){
            for(let j = i+1;j<4;j++){
                temp = [this.coordinate[i]];
                temp.push(this.coordinate[j]);
                Stemp = [((new Line(temp)).calculateWide())];
                Stemp.push(this.calculateInclination(this.coordinate[i],this.coordinate[j]));
                length.push(Stemp.slice());
            }
        }
        calList = this.returnParallel(length);
        return this.result(calList);
    }

    //평행한 직선을 가지고 넓이를 반환해줍니다.
    result(calList){
        if(calList.length==2 && (calList[0][1]*calList[1][1] == -1||calList[0][1]*calList[1][1] == 0)){
            return calList[0][0]*calList[1][0];
        }else if(calList.length >2){
            calList.sort();
            while(calList.length > 2)
                calList.pop();
            if(calList[0][1]*calList[1][1] == -1 ||calList[0][1]*calList[1][1] == 0)
                return calList[0][0]*calList[1][0];
            return -1;
        }else
            return -1;
    }

    //평행한 직선들을 반환합니다.
    returnParallel(length){
        let calList = [];
        for(let i=0;i<length.length-1;i++){
            for(let j=i+1;j<length.length;j++){
                if(length[i][1] == length[j][1]&&length[i][0] == length[j][0])
                    calList.push(length[i]);
            }
        }
        return calList;
    }

    //평행한 직선들 중 직사각형의 두 변을 찾고 넓이를 구합니다, 이 때 마름모 또한 같은 조건을 만족하기 때문에
    //두직선의 기울기를 곱하여 두직선이 수직한지 확인하였습니다.
    calculateInclination(f,s){
        let Inclination = (f[1]-s[1])/(f[0]-s[0]);
        if(Inclination == 1/0 || Inclination == -1/0 || Inclination == -0)
            Inclination = 0;
        return Inclination;
    }
}

module.exports = Rectangle;