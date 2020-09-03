class Thread{
    constructor(name){
        this.name = name;
        this.whole_time = 2;
        this.status = 'waiting';
    }
    
    execute = () =>{return this.status == 'terminate' ? undefined : this.status = 'terminate';}
}

module.exports = Thread