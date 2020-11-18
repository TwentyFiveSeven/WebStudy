let events = require('events');

class Cashier{
    constructor(order){
        this.order = order;
        this.event = new events.EventEmitter();
        this.init();
    }
    addorder=(menu)=>{
        this.order.push(menu);
    }
    addorderEvent=(menu)=>{
        setImmediate(()=>{this.event.emit('checkorderEvent',menu);});
    }
    init=()=>{
        this.event.on('checkorderEvent',(menu)=>{this.addorder(menu)});
    }
}

module.exports = Cashier;