//가장 부모단위의 Dot Class
class Dots{
    constructor(input){
        this.coordinate = input;
        this.printString = "";
    }

    calculateWide(){
        return 0;
    }
    
    //입력한 점이 찍힌 그래프를 출력합니다.
    printGraph(){
        let temp ="",row = "";
        let list = this.coordinate.slice();
        for(let i=24;i>=0;i--){
            if(!(i%2))
                if(i>=10){
                    temp = (i).toString()+"|";
                    row += "     "+(24-(i)).toString();
                }else{
                    temp = " "+(i).toString()+"|";
                    row += "    "+(24-(i)).toString();
                }else
                    temp = "  |";
            for(let j=0;j<=24;j++){
                let check = 0;
                for(let m=0;m<list.length;m++){
                    if(i == list[m][1] && j == list[m][0]){
                        check = 1;
                        list.slice(m);
                        break;
                    }
                }
                if(check)
                    temp +="  ·";
                else
                    temp += "   ";
            }
            console.log(temp);
        }
        return row;
    }

    //그래프 출력을 위한 메소드
    print(){
        let row=this.printGraph();
        console.log("  +--------------------------------------------------------------------------------");
        console.log(row+"\n");
    }
}

module.exports = Dots;