const readline = require('readline-sync');

//생성된 영상데이터를 Map에 {Node.id : Node} 형식으로 저장한다.
let VideoList = new Map();

//영상데이터 객체를 생성하고 반환하는 함수객체
let Node = function(id,title,time,next){
    let node ={};
    node.id = id;
    node.title = title;
    node.time = time;
    node.next = next;
    return node; //node 객체를 반환한다.
};

//LinkedList : list 객체를 반환하는 함수객체
let LinkedList = function (){
    let list = {}; //LinkedList를 위한 list 객체
    list.head = null;

    //Node를 Add할 때 Head의 유무를 파악하여 가장 끝에 붙여준다.
    list.executeAdd = function(node){
        let now;
        if(!this.head){
            this.head = node;
        }else{
            now = this.head;
            while(now.next){
                now = now.next;
            }
            now.next = node;
        }
    };

    //Add 명령어를 입력시에 LinkedList 가장 끝에 Node를 붙여준다.
    list.add = function(value){
        if(!VideoList.has(value))
            return;
        let node = Object.assign({},VideoList.get(value));
        list.executeAdd(node);
        list.printList();
    };

    //interpose : 끼워넣다.
    //Insert 명령어를 입력시에 0번째에 붙이기 위해 Head에 노드를 붙여준다.
    list.interposeHeadNode = function(node){
        let temp = this.head;
        this.head = node;
        node.next = temp;
    };

    //Insert 명령어를 입력시에 depth번째에 노드를 붙이고, depth가 LinkedList의 size보다 클경우에는 가장 마지막에 붙인다.
    list.interposeNode = function(depth){
        let now = this.head;
            depth -=1;
            while(depth-- && now.next){
                now = now.next;
            }
        return now;
    };

    //Insert 명령어에서 Node를 붙이기위한 함수
    list.executeInsert = function(node,depth){
        if(!this.head){
            this.head = node;
        }else if(!depth){
            list.interposeHeadNode(node);
        }else{
            let now = list.interposeNode(depth);
            let temp = now.next;
            now.next = node;
            node.next = temp;
        }
    };
    
    //Insert 명령어를 처리하기 위한 상위 함수
    list.insert = function(depth,value){
        if(!VideoList.has(value))
            return;
        let node = Object.assign({},VideoList.get(value));
        list.executeInsert(node,depth);
        list.printList();
    };

    //Delete명령어를 입력하였을 때 Node를 찾아 제거한다.
    list.executeDelete = function(now, value, before){
        if(now.id == value){
            if(before){
                before.next = now.next;
                now.next = null;
            }else{
                this.head = this.head.next;
            }
        }
    };

    //Delete 명령어를 입력했을 때 Node를 제거하기 위한 함수
    list.delete = function(value){
        if(!this.head) return;
        let now = this.head;
        let before = null;
        while(now){
            list.executeDelete(now,value,before);
            before = now;
            now = now.next;
        }
        list.printList();
    };

    //명령어를 수행할 때 마다 마지막에 현재 Linked List를 출력하여 보여준다.
    list.printList = function(){
        let now = this.head;
        process.stdout.write("|");
        while(now){
            let s = now.time.toString();
            process.stdout.write("---[ "+now.id+", "+s+"sec ]");
            now = now.next;
        }
        process.stdout.write("---[end]\n\n");
    }
    
  //LinkedList 함수객체를 사용하여 list객체를 반환
  return list;  
};

//ID를 중복되지 않는 랜덤한 영문8자로 생성하여 반환한다.
function makeId(){
    let text = "";
    const limit = 'abcdefghijklmnopqrstuvwxyz';
    for(let i=0;i<8;i++)
        text +=limit.charAt(Math.floor(Math.random() * limit.length));
    return text;
}

//1~15의 숫자로 랜덤하게 영상시간을 반환한다.
function makeTime(){
    return Math.floor((Math.random()*15)+1)
}

//생성된 영상데이터를 순서대로 출력하기 위한 함수.
function printNode(node){
    console.log(node.title+"("+node.id+")"+":"+node.time.toString());
}

//제일먼저 영상데이터객체를 순서대로 만들고 Map에 Set해준다음 양식에 맞게 출력하는 함수.
function firstStep(){
    console.log("---영상클립---");
    for(let i=1; i<=13;i++){
        let node = Node(makeId(),"제목"+i.toString(),makeTime(),null);
        VideoList.set(node.id,node);
        printNode(node);
    }
}

//Linked List의 전체를 탐색하면서 재생 시간및 영상수를 계산하고 출력하는 함수.
function render(PlayList){
    let time=0, count =0;
    let now = PlayList.head;
    while(now){
        count +=1;
        time += now.time;
        now = now.next;
    }
    console.log("영상클립: ",count.toString()+"개\n전체길이: "+time.toString()+"sec\n");
}

//입력한 값이 공백으로 구분되기 때문에 공백을 기준으로 몇번째인지 num으로 입력하면 해당 String을 반환한다.
function splitStr(input,num){
    let i = 0,check=0, ret = "";
    while(check != num)
        if(input[i++] == ' ') check +=1;
    while(i<input.length){
        ret += input[i++];
        if(input[i] ==' ') break;
    }
    return ret;
}

//입력받은 값을 파싱하여 명령어에 따라 해당 함수를 실행한다.
function Run(input,PlayList){
    const command = splitStr(input,0);
    if(command == "add"){
        PlayList.add(splitStr(input,1));
    }else if(command == "insert"){
        PlayList.insert(Number(splitStr(input,2)),splitStr(input,1));
    }else if(command == "delete"){
        PlayList.delete(splitStr(input,1));
    }else if(command == "render"){
        render(PlayList);
    }
}

//초기 영상데이터객체를 생성하고 입력을받아 처리하기 위한 Main 함수이다.
function main(){
    let PlayList = new LinkedList();
    firstStep();
    while(1){
        input = readline.question('> ');
        Run(input,PlayList);
    }
}

main();