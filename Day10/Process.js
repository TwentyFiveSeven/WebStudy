const Thread = require('./Thread.js');
class Process{
    constructor(name,time,thread_num){
        this.name = name;
        this.execute_time = 0;
        this.whole_time = time;
        this.status = 'ready';
        this.threads = this.makeThreads(thread_num);
    }

    execute = () =>{
        this.status = 'running';
        let check = this.threads.filter(element => element.execute()).reduce((sum,now)=>{return sum + now.whole_time},0);
        check ? this.execute_time += check : this.execute_time++;
    }

    makeThreads =(size) =>{
        let threads = [];
        for(let i=1;i<=size;i++) threads.push(new Thread(i));
        return threads;
    }
}

module.exports = Process;