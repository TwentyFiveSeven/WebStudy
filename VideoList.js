//영상데이터 객체를 생성하고 반환하는 함수객체
let Node = function(id,title,time,next){
    let node ={};
    node.id = id;
    node.title = title;
    node.time = time;
    node.next = next;
    return node; //Node 객체를 반환한다.
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

//초기 영상데이터객체를 생성하고 출력하기 위한 Main 함수.
function main(){
    console.log("---영상클립---");
    for(let i=1; i<=13;i++){
        let node = Node(makeId(),"제목"+i.toString(),makeTime(),null);
        printNode(node);
    }
}

main();