const {ArrayParser} = require('./ArrayParser2.js');
const a = "[1, [2,[3]],'hello', 'world', null]";
const b = ["[[][]]",
"[[1,[2,[3],'hello']]",
"[[]",
"123",
"[[[",
"]]]",
"[1, 2, 'hi'"]
// const b = /^('[^']+')/;
b.map(x => console.dir(new ArrayParser(x), { depth: null }))

// "[[[[2,[5],61],'hell']]]",
// "[1, [2,[3]],'hello', 'world', null]",
// "['1a3,[22,23,[11,[112233],112],55],3d3]",
// "['1a3',[22,23,[11,[112233],112],55],3d3]",
// "['1a'3',[22,23,[11,[112233],112],55],33]"


    // makeToken(char) {
    //     if (this.isQuote(char)) {
    //       this.selectPushPop(char);
    //     }
    //     if (this.isSeperator(char) && !this.Stack.length) {
    //       let token = this.tokenStack.join("").trim();
    //       this.tokenStack = [];
    //       if (token !== "") return [token, char];
    //       return char;
    //     }
    //     this.tokenStack.push(char);
    //   }

    // tokenizer(str) {
    //     return str
    //       .split("")
    //       .reduce((tokenArr, char) => {
    //         return [...tokenArr].concat(this.makeToken(char));
    //       }, [])
    //       .filter(Boolean);
    //   }


    class Tokenizer{
        constructor(){}
        
        tokenize(str){
            let tokens = [];
            let token = "";
            for(let i=0; i<str.length; i++){
                if(str[i] == " ")
                    continue;
                if(seperators.includes(str[i])){
                    if(token != "")
                        tokens.push(token);
                    tokens.push(str[i]);
                    token = "";
                    continue;
                }
                token += str[i];
            }
            return tokens;
        }
    }