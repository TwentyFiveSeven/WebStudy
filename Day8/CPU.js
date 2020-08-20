const {StoB,ToNum} = require('./StoB.js');
const ALU = require('./ALU.js');
const CommandToB = {
    '0001': 'LOAD',
    '0010': 'LOAD2',
    '0011': 'STORE',
    '0100': 'STORE2' ,
    '0101': 'AND',
    '0110': 'OR',
    '0111': 'ADD',
    '1000': 'ADD2',
    '1001': 'SUB',
    '1010':'SUB2',
    '1011':'MOV'
}

class CPU{
    constructor(){
        this._Memory = [];
        this.Memory = new Map();
        this.Register ={ 
            1 : 0, 
            2 : 0, 
            3 : 0, 
            4 : 0, 
            5 : 0, 
            6 : 0, 
            7 : 0};
        this.PCvalue = 0;
    }
    input(programs){
        this.load(programs);
        for(let command of this._Memory){//fetch먼저
            let command = this.fetch();
            let binary = this.decode(command);
            this.execute(binary);
        }
    }
    load(programs){
        let line = programs.split('\n');
        this._Memory = line;
    }

    fetch(){
        let val = this._Memory[this.PCvalue++];
        return val;
    }

    decode(command){
        return StoB(command);
    }

    execute(binary){
        let dest=0,base=0,reg=0,value=0;
        let command = CommandToB[binary.substr(0,4)];
        base = ToNum(binary.substr(7,3));
        dest = ToNum(binary.substr(4,3));
        if(command != 'MOV'){
            reg = binary[10] == '1' ? ToNum(binary.substr(11,5)) : ToNum(binary.substr(13,3));
            switch(command){
                case 'LOAD':
                    ALU.LOAD(this,dest,base,reg);
                    break;
                case 'LOAD2':
                    ALU.LOAD2(this,dest,base,reg);
                    break;
                case 'STORE':
                    ALU.STORE(this,dest,base,reg);
                    break;
                case 'STORE2':
                    ALU.STORE2(this,dest,base,reg);
                    break;
                case 'AND':
                    ALU.AND(this,dest,base,reg);
                    break;
                case 'OR':
                    ALU.OR(this,dest,base,reg);
                    break;
                case 'ADD':
                    ALU.ADD(this,dest,base,reg);
                    break;
                case 'ADD2':
                    ALU.ADD2(this,dest,base,reg);
                    break;
                case 'SUB':
                    ALU.SUB(this,dest,base,reg);
                    break;
                case 'SUB2':
                    ALU.SUB2(this,dest,base,reg);
                    break;
            }
        }else{
            value = ToNum(binary.substr(7,9));
            ALU.MOV(this,dest,value);
        } 
    }
    reset(){
        this.Memory= new Map();
        this.PCvalue =0;
    }

    dump(){
        return Object.values(this.Register);
    }
}

module.exports = new CPU();
