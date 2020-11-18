let events = require('events');
class DashBoard{
    constructor(order){
        this.output = "> 메뉴 = 1.아메리카노(3s)    2. 카페라떼(5s)     3. 프라프치노(10s)\n>주문할 음료를 입력하세요.";
        this.check = 0;
        this.order = order;
        this.event = new events.EventEmitter();
        this.RunningWork = 0;
        this.orderList = {};
        this.checkList = {};
        this.start = 0;
        this.init();
    }

    outputPrint= ()=>{
        console.clear();
        console.log(this.output);
        process.stdout.write('>');
    }

    print=()=>{
        let str ="\n/";
        this.order.arr.forEach((element)=>{str +=element['name']+element['menu']+','});
        str.length != 2 ? this.output += str.substring(0,str.length-1) +'/' : str ="";
        this.outputPrint();
    }

    printEvent=()=>{
        setImmediate(()=>{this.event.emit('printEvent')});
    }

    add=(str)=>{
        this.output += '\n'+str;
        this.outputPrint();
    }

    addEvent=(str)=>{
        setImmediate(()=>{this.event.emit('addEvent',str)});
    }
    init=()=>{
        this.event.on('printEvent',()=>{this.print()});
        this.event.on('addEvent',(str)=>{this.add(str)});
    }
}

module.exports = DashBoard;