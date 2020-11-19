let events = require('events');
const DashBoard = require('./DashBoard');

class Manager{
    constructor(order,dashBoard){
        this.order = order;
        this.event = new events.EventEmitter();
        this.count = 0;
        this.dashBoard = dashBoard;
        this.init();
    }
    checkorder=(baristas) =>{
        const inter = setInterval(()=>{
            this.dashBoard.print();
            if(this.order.size){
                let drink = this.order.pop();
                let check = 0;
                for(let i=0;i<baristas.length;i++){
                    if(baristas[i].status != 'full' && (baristas[i].menu == 0 || baristas[i].menu == drink['menu'])){
                        baristas[i].makeEvent(drink);
                        check =1;
                        break;
                    }
                }
                if(!check) this.order.push_front(drink);
            }else{
                this.dashBoard.RunningWork == 0 && this.dashBoard.start ? this.count++ : this.count = 0;
                this.count == 4 ? process.exit(1) : undefined;
            }
        } , 2000);
    }
    checkorderEvent =(baristas) =>{
        setImmediate(()=>{this.event.emit('checkorderEvent',baristas);});
    }
    init=()=>{
        this.event.on('checkorderEvent',(baristas)=>{this.checkorder(baristas)});
    }
}

module.exports = Manager;