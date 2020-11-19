class Order{
    constructor(){
        this.arr = new Array();
        this.rear = 0;
        this.front = 0;
        this.size = 0;
    }
    push(elem){
        this.size++;
        this.arr.push(elem);
    }
    pop(){
        if(this.size <0) return null;
        this.size--;
        return this.arr.shift();
    }
    Size(){
        return this.size;
    }
    Empty(){
        return !this.size;
    }
    push_front(elem){
        this.size++;
        this.arr.splice(0,0,elem);
    }
}

module.exports = Order;