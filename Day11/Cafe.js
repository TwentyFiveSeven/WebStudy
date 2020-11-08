const readline = require("readline");
const Cashier = require("./Cashier.js");
const DashBoard = require("./DashBoard.js");
const Manager = require("./Manager.js");
const Barista = require("./Barista.js");
const Order = require("./Order.js");

const time = { 1 : 3, 2 : 5, 3 : 10};

class Cafe {
    constructor (num = 1) {
        this.order = new Order();
        this.cashier = new Cashier(this.order);
        this.dashBoard = new DashBoard(this.order);
        this.manager = new Manager(this.order,this.dashBoard);
        this.baristas = this.makeBaristas(num);
        this.baristasNum = num;
    }

    firstOutput=()=>{
        this.dashBoard.output = this.baristasNum >2 ? '바리스타는 총 '+this.baristasNum.toString()+'명입니다.\n'+this.dashBoard.output+" 예) A고객, 아메리카노 2개, 프라프치노 1개 => A, 1:2, 3:1" : this.dashBoard.output+" 예) 아메리카노2개 => 1:2";
        this.dashBoard.print();
    }

    input=()=>{
        this.firstOutput();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.rl.setPrompt(`> `);
        this.rl.prompt();
        this.processing();        
    }

    firstSplit = (input) =>{
        input = input.split(':');
        for(let i =0;i<input[1];i++)
        this.cashier.addorderEvent({'name':"",'menu':Number(input[0]),'time' : time[Number(input[0])]});
    }

    secondSplit = (input) =>{
        input = input.split(',').map(x => x.trim());
        this.dashBoard.orderList[input[0]] = {};
        for(let i=1;i<=input.length-1;i++){
            let Menu = input[i].split(':').map(x=>Number(x));
            this.dashBoard.orderList[input[0]][Menu[0]] = Menu[1];
            // this.dashBoard.addEvent(JSON.stringify(this.dashBoard.orderList['A'][1]));
            for(let j=0;j<Menu[1];j++){
                this.cashier.addorderEvent({'name':input[0],'menu':Menu[0],'time':time[Menu[0]]});
            }
        }
        this.dashBoard.checkList = JSON.parse(JSON.stringify(this.dashBoard.orderList));
    }

    processing=()=>{
        this.manager.checkorderEvent(this.baristas);
        this.rl.on("line", (line) => {
            this.dashBoard.start = 1;
            this.dashBoard.addEvent('>'+line);
            let answer = line.split(',');
            answer = answer.length ==1 ? this.firstSplit(line) : this.secondSplit(line);
            this.rl.prompt();
        }).on('close', () => {
            process.exit();
        })
    }

    makeBaristas=(num)=>{
        let listbs = [];
        if(num >2){
            for(let i=0;i<num;i++)
                listbs.push(new Barista(this.dashBoard,'바리스타'+(i+1).toString()+'-',i%3+1,0));
        }else
            for(let i=0;i<num;i++)
                listbs.push(new Barista(this.dashBoard));
        return listbs;
    }
}


module.exports = Cafe;