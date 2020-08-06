const readline = require('readline-sync');
const main = require('./main.js');

function Run(){
    let check = 1;
    while(check){
        input = readline.question('> input.\n');
        console.log('\n');
        check = new main(input);
    }
}

Run();