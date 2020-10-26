class ALU{
    LOAD(cpu,dest,base,reg){
        base = cpu.Register[base];
        reg = cpu.Register[reg];
        let sum = cpu.Memory.has(base + reg) ? cpu.Memory.get(base+reg) : 0;
        cpu.Register[dest] = sum;
        console.log('LOAD',cpu.Register[dest]);
    }
    LOAD2(cpu,dest,base,reg){
        base = cpu.Register[base];
        let sum = cpu.Memory.has(base + reg) ? cpu.Memory.get(base+reg) : 0;
        cpu.Register[dest] = sum;
        console.log('LOAD2',cpu.Register[dest]);
    }
    STORE(cpu,dest,base,reg){
        base = cpu.Register[base];
        reg = cpu.Register[reg];
        let sum = base + reg;
        cpu.Memory.set(sum,cpu.Register[dest]);
        console.log('STORE',cpu.Memory.get(sum));
    }
    STORE2(cpu,dest,base,reg){
        base = cpu.Register[base];
        let sum = base + reg;
        cpu.Memory.set(sum,cpu.Register[dest]);
        console.log('STORE2',cpu.Memory.get(sum));
    }
    AND(cpu,dest,base,reg){
        base = cpu.Register[base];
        reg = cpu.Register[reg];
        let val = base&reg;
        cpu.Register[dest] = val;
        console.log('AND',cpu.Register[dest]);
    }
    OR(cpu,dest,base,reg){
        base = cpu.Register[base];
        reg = cpu.Register[reg];
        let val = base|reg;
        cpu.Register[dest] = val;
        console.log('OR',cpu.Register[dest]);
    }
    ADD(cpu,dest,base,reg){
        base = cpu.Register[base];
        reg = cpu.Register[reg];
        let val = base+reg;
        cpu.Register[dest] = val;
        console.log('ADD',cpu.Register[dest]);
    }
    ADD2(cpu,dest,base,reg){
        base = cpu.Register[base];
        let val = base+reg;
        cpu.Register[dest] = val;
        console.log('ADD2',cpu.Register[dest]);
    }
    SUB(cpu,dest,base,reg){
        base = cpu.Register[base];
        reg = cpu.Register[reg];
        let val = base - reg;
        cpu.Register[dest] = val;
        console.log('SUB',cpu.Register[dest]);
    }
    SUB2(cpu,dest,base,reg){
        base = cpu.Register[base];
        let val = base - reg;
        cpu.Register[dest] = val;
        console.log('SUB2',cpu.Register[dest]);
    }
    MOV(cpu,dest,value){
        cpu.Register[dest] = value;
        console.log('MOV',cpu.Register[dest]);
    }
}

module.exports = new ALU();