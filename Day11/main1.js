const Cafe = require("./Cafe.js");

class Main{
    constructor(){}
    
    input = () =>{
        this.cafe = new Cafe();
        this.cafe.input();
    }
}

let main = new Main();
main.input();