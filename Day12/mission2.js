const PC = require('./PC.js');

function main(){
    console.clear();
    console.log('> 빈 자리는 다음과 같습니다.\n[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16\n');
    let pc = new PC();
    pc.input();
}

main();