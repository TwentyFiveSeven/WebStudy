const readline = require('readline-sync');
let arr = new Array(25);
//가장 부모단위의 Dot Class
class Dots{
    constructor(input){
        this.coordinate = input;
        this.print = "";
    }

    calculateWide(){
        return 0;
    }
}

//점 두개가 모인 Straight Calss
class Straight extends Dots{
    constructor(input){
        super(input);
        this.print = "두 점 사이 거리는 ";
    }

    //직선의 넓이를 구합니다.
    calculateWide(){
        return Number(Math.sqrt(Math.pow(this.coordinate[0][0]-this.coordinate[1][0],2)+Math.pow(this.coordinate[0][1]-this.coordinate[1][1],2)).toFixed(6));
    }
}

//직선 세개가 모인 Triangle Calss
class Triangle extends Straight{
    constructor(input){
        super(input);
        this.print = "삼각형의 넓이는 ";
    }

    //삼각형의 넓이를 구합니다.
    calculateWide(){
        let length = [],temp = [];
        for(let i=0;i<2;i++){
            for(let j = i+1;j<3;j++){
                temp = [this.coordinate[i]];
                temp.push(this.coordinate[j]);
                length.push((new Straight(temp)).calculateWide());
            }
        }
        let s = (length[0]+length[1]+length[2])/2;
        let ret = Math.sqrt(s*(s-length[0])*(s-length[1])*(s-length[2])).toFixed(5);
        return ret;
    }
}

//직선 네개가 모인 Rectangle Calss
class Rectangle extends Straight{
    constructor(input){
        super(input);
        this.print = "사각형의 넓이는 ";
    }

    //사각형의 넓이를 구합니다.
    calculateWide(){
        let length = [],temp = [],Stemp=[],calList=[];
        for(let i=0;i<3;i++){
            for(let j = i+1;j<4;j++){
                temp = [this.coordinate[i]];
                temp.push(this.coordinate[j]);
                Stemp = [((new Straight(temp)).calculateWide())];
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
        if(Inclination == -1/0 || Inclination == -0)
            Inclination = 0;
        return Inclination;
    }
}
//점의 범위 체크하는 함수
function checkDot(dot){
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
function findLeft(ret) { 
    for(let i = 0;i<ret.length;i++){
        if(ret[i] == '(')
            return i;
    }
    return -1;
}

//x,y 형태의 String을 반환해주는 함수
function makeDot(input){
    let ret = input.trim(' ');
    ret = ret.split(')');
    ret.pop();
    ret[0] = ret[0].substr(1,ret[0].length-1);
    for(let i=1;i<ret.length;i++){
        ret[i] = (ret[i].substr(findLeft(ret[i])+1,ret[i].length-1)).trim(' ');
    }
    return ret;
}

//두점을 찾고 List에 넣어주는 함수
function parseDot(input){
    let ret = [];
    makeDot(input);
    let sList = makeDot(input);
    for(let i=0;i<sList.length;i++){
        let temp = sList[i].split(',');
        temp[0] = Number(temp[0].trim(' '));
        temp[1] = Number(temp[1].trim(' '));
        if(checkDot(temp)) return -1;
        arr[temp[1]][temp[0]] =1;
        ret.push(temp);
    }
    return ret;
}

//점의 개수에 따라 알맞는 Class Instance를 만들어주는 함수
function makeOBJ(input,num){
    let ret;
    if(num ==1){
        ret = new Dots(input);
    }else if(num ==2){
        ret = new Straight(input);
    }else if(num ==3){
        ret = new Triangle(input);
    }else if(num ==4){
        ret = new Rectangle(input);
    }else{
        console.log("2개부터 4개의 점을 입력할 수 있습니다");
    }
    return ret;
}

//Graph를 출력한다.
function printGraph(){
    let temp ="",row = "";
    for(let i=24;i>=0;i--){
        if(!(i%2))
            if(i>=10){
                temp = (i).toString()+"|";
                row += "     "+(24-(i)).toString();
            }else{
                temp = " "+(i).toString()+"|";
                row += "    "+(24-(i)).toString();
            }
        else
            temp = "  |";
        for(let j=0;j<=24;j++){
            if(arr[i][j]){
                temp +="  ·";
            }else
                temp += "   ";
        }
        console.log(temp);
    }
    return row;
}

//좌표를 출력하고 넓이값의 형태를 만들어 반환하는 함수
function printWide(mobj){
    let row=printGraph();
    console.log("  +--------------------------------------------------------------------------------");
    console.log(row+"\n");
    let val = mobj.calculateWide();
    if(val == -1){
        return "직사각형이 아닙니다.";
    }
    return mobj.print+mobj.calculateWide().toString();
}

//검증 - 처리/계산 - 형식 - 출력을 하는 함수
function Run(input){
    input = parseDot(input); //검증
    if(input == -1) return 1;
    let mobj = makeOBJ(input,input.length); //처리/계산
    console.log(printWide(mobj)); //형식 - 출력
    return 0;
}

//시작 후 입력 받는 함수
function main(){
    for(let i=0;i<=24;i++)
        arr[i] = new Array(25);
    let check = 1;
    while(check){
        input = readline.question('> input.\n');
        console.log('\n');
        check = Run(input);
    }
}

main();