const readline = require("readline-sync");
const Cafe = require("./Cafe.js");

class Main{
    constructor(){}
    
    input = () =>{
        let num = readline.question('Enter the number of baristas : ');
        this.cafe = new Cafe(Number(num));
        this.cafe.input();
    }
}

let main = new Main();
main.input();