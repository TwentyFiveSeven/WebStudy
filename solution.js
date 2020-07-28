const readline = require('readline');
let x = 0, y = 0, answer = "";
const xi = [1,-1,0,0];
const yi = [0,0,-1,1];

function makeTB(valX){
    if(valX >0)
        answer += '^'.repeat(valX);
    else
        answer += '_'.repeat((-valX));
}

function makeLR(valY){
    if(valY >0)
        answer += '<'.repeat(valY);
    else
        answer += '>'.repeat((-valY));
}

function makeAnswer(valX, valY){
    makeTB(valX);
    makeLR(valY);
    answer +='@';
}

function checkValue(nx,ny,val,keyboard){
    if(keyboard[nx][ny] == val){
        makeAnswer(x - nx, y - ny);
        x = nx;
        y = ny;
        return 1;
    }
    return 0;
}

function checkDirections(mx,my,queue,keyboard,check){
    for(let i = 0;i<4;i++){
        let nx = mx + xi[i];
        let ny = my + yi[i];
        if(nx >=0 && nx <keyboard.length && ny>=0 && ny<keyboard[0].length)
            if(!check[nx][ny]){
                check[nx][ny] = 1;
                queue.push([nx,ny]);
            }
    }
}

function Bfs(a,b,val,keyboard,check){
    let queue = [];
    queue.push([a,b]);
    while(queue.length){
        let location = queue.shift();
        if(checkValue(location[0],location[1],val,keyboard)){
            return;
        }
        checkDirections(location[0],location[1],queue,keyboard,check);
    }
}

function resetArray(check){
    for(let i = 0; i<check.length;i++){
        for(let j = 0; j<check[0].length;j++){
            check[i][j] = 0;
        }
    }
}

function checkKeyboard(s,keyboard){
    for(let i = 0; i<keyboard.length;i++){
        for(let j = 0;j <keyboard[i].length;j++){
            if(keyboard[i][j] == s)
                return 0;
        }
    }
    console.log("키보드에 존재하지 않는 문자가 있습니다.");
    return 1;
}

function Run(keyboard,str,check){
    const size = str.length;
    for(let i = 0; i<size;i++){ // size 만큼 실행한다.
        if(checkKeyboard(str[i],keyboard)){
            return;
        }
        resetArray(check);
        Bfs(x,y,str[i],keyboard,check);
    }
    console.log(answer);
}

function makeCheckArray(keyboard){
    let check = new Array(keyboard.length);
    for(let i =0; i< keyboard.length;i++)
        check[i] = new Array(keyboard[i].length);
    return check;
}

function makeReadline(){
    let r = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        });
    return r;
}

function makeKeyboard(){
    const keyboard = [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
                ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
                ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "?"]];
    return keyboard;
}

function main(){
    const r = makeReadline(); //Create ReadLine Interface
    r.question('단어를 입력하세요 : ', input => { //단어 입력 및 실행
        const keyboard = makeKeyboard(); // 키보드 할당.
        let check = makeCheckArray(keyboard); // 키보드 값에 따른 Check 배열 할당
        Run(keyboard,input,check); 
        r.close();
    });
}

main();