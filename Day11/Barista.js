let events = require('events');

const drinkMenu = { 1 : "아메리카노", 2 : "카페라떼", 3 : "프라프치노"};

class Barista{
    constructor(dashboard, id = "",num = 0,version = 1){
        this.id = id;
        this.drink = 0;
        this.status = 'afford';
        this.menu = num;
        this.dashboard = dashboard;
        this.count = 0;
        this.event = new events.EventEmitter();
        this.checkVersion = version;
        this.init();
    }

    makePrint=(drink)=>{
        let str = "====="+drink['name']+', ';
        let custom = this.dashboard.orderList[drink['name']];
        for(let id in custom){
            str += drinkMenu[id];
            if(custom[id] >1)
                str += '*'+custom[id].toString();
            str +=', ';
        }
        str= str.substring(0,str.length-2)+" 주문 완성"
        return str;
    }

    make=(drink)=>{
        let custom = this.dashboard.checkList[drink['name']], check =this.checkVersion;
        this.dashboard.addEvent(this.id+drink['name']+drinkMenu[drink['menu']]+" 시작");
        this.drink++;
        this.dashboard.RunningWork++;
        this.drink == 2 ? this.status = 'full' : this.status = 'afford';
        setTimeout(()=>{
            this.dashboard.addEvent(this.id+drink['name']+drinkMenu[drink['menu']]+" 완성");
            this.drink--;
            check == 0 ? custom[drink['menu']]-- : undefined;
            for(let id in custom) custom[id] != 0 ? check=1 :undefined;
            check == 0 ? this.dashboard.addEvent(this.makePrint(drink)): undefined;
            this.dashboard.RunningWork--;
            this.dashboard.RunningWork == 0? this.dashboard.addEvent("모든 메뉴가 완성되었습니다.") : undefined;
            this.drink == 2 ? this.status = 'full' : this.status = 'afford';
        },drink['time']*3000);
    }
    makeEvent=(drink)=>{
        setImmediate(()=>{this.event.emit('makeEvent',drink);});
    }

    init(){
        this.event.on('makeEvent',(drink)=>{this.make(drink)});
    }
}

module.exports = Barista;