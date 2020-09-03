const Process = require('./Process.js');
let processes = [];
let selected = [];
let ready_queue = [];

const randomTime = (min,max) =>{return Math.floor((Math.random()*(max-min))+min)};

 const makeProcesses = () =>{
    let count =0, time = 0;
    while(count !=4){
        time = randomTime(2,20);
        let process = new Process(String.fromCharCode(65+count),time,Math.floor(time/2));
        if(!processes.find(element => element.whole_time == process.whole_time)){
            count++;
            processes.push(process);
        }
    }
}

const selectProcesses =() =>{
    let select = randomTime(1,4);
    selected = Object.assign([],processes);
    selected.splice(select,1);
    ready_queue = Object.assign([],selected);
    str = "\n이 프로그램은\n";
    ready_queue.forEach((x,i) => {
        x.status = "waiting";
        str += "프로세스"+x.name+"("+x.whole_time+"초)"+" - 스레드 "+x.threads.length.toString()+"개\n"});
    console.log(str);
}

const printStatus = ()=>{
    selected.forEach(element =>{console.log(element.name.toString()+'('+element.status+'),',element.execute_time,'/',element.whole_time.toString()+'sec')});
    console.log(".");
}

const setpush = (now_process) =>{
    now_process.status = 'waiting';
    ready_queue.push(now_process);
}

const executeProcesses=()=>{
    const inter = setInterval(()=>{
        if(!ready_queue.length){
            printStatus();
            console.log("모든 프로세스가 종료되었습니다.");
            clearInterval(inter);
        }else{
            let now_process = ready_queue.shift();
            now_process.execute();
            printStatus();
            now_process.execute_time == now_process.whole_time ? now_process.status = 'terminated' : setpush(now_process);
        }
    } , 1000);
}

function main(){
    makeProcesses();
    selectProcesses();
    executeProcesses();
}

main();