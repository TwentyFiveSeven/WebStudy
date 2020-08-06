const Line = require('./Line.js');
const Triangle = require('./Triangle.js');
const Rectangle = require('./Rectangle.js');

class main{

    constructor(input){
        input = this.parseDot(input); //검증
        if(input == -1) return 1;
        let mobj = this.makeOBJ(input,input.length); //처리/계산
        console.log(this.printWide(mobj)); //형식 - 출력
        return 0;
    }

    //점의 범위 체크하는 함수
    checkDot(dot){
        if(dot[0]>24 || dot[1]>24){
            console.log("24가 넘는 값은 입력할 수 없습니다.");
            return 1;
        }else if(dot[0]<0 || dot[1]<0){
            console.log("0보다 작은 값은 입력할 수 없습니다.")
            return 1;
        }
        return 0;
    }
    
    //가장 왼쪽에 있는 '('를 찾는 함수
    findLeft(ret) { 
        for(let i = 0;i<ret.length;i++){
            if(ret[i] == '(')
                return i;
        }
        return -1;
    }
    
    //x,y 형태의 String을 반환해주는 함수
    makeDot(input){
        let ret = input.trim(' ');
        ret = ret.split(')');
        ret.pop();
        ret[0] = ret[0].substr(1,ret[0].length-1);
        for(let i=1;i<ret.length;i++){
            ret[i] = (ret[i].substr(this.findLeft(ret[i])+1,ret[i].length-1)).trim(' ');
        }
        return ret;
    }
    
    //두점을 찾고 List에 넣어주는 함수
    parseDot(input){
        let ret = [];
        let sList = this.makeDot(input);
        for(let i=0;i<sList.length;i++){
            let temp = sList[i].split(',');
            temp[0] = Number(temp[0].trim(' '));
            temp[1] = Number(temp[1].trim(' '));
            if(this.checkDot(temp)) return -1;
            ret.push(temp);
        }
        return ret;
    }
    
    //점의 개수에 따라 알맞는 Class Instance를 만들어주는 함수
    makeOBJ(input,num){
        let ret;
        if(num ==2){
            ret = new Line(input);
        }else if(num ==3){
            ret = new Triangle(input);
        }else if(num ==4){
            ret = new Rectangle(input);
        }else{
            console.log("2개부터 4개의 점을 입력할 수 있습니다");
        }
        return ret;
    }
    
    //좌표를 출력하고 넓이값의 형태를 만들어 반환하는 함수
    printWide(mobj){
        mobj.print();
        let val = mobj.calculateWide();
        if(val == -1){
            return "직사각형이 아닙니다.";
        }
        return mobj.printString+mobj.calculateWide().toString();
    }
    
}

module.exports = main;