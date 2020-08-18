module.exports = class ArrayParser{
    constructor(){
        this.Stack = [];
        this.tokenStack = [];
        this.staticTokenType = {
            "[": "Lbracket",
            "]": "Rbracket",
            ",": "comma",
            null: "null"
          };
    }
    isSeperator = ( s => {return s ==='[' || s === ']' || s === ','; });
    isQuote = ( s => {return s ==='"' || s === "'";});
    
    selectPushPop(s){
        if(this.Stack.length === 0){
            this.Stack.push(s);
            return 0;
        }
        else
            if(this.Stack[this.Stack.length-1] === s){
                this.Stack.pop();
                return 1;
            }
    }

    tokenizer(str){
        const tokenArr = [];
        let tokenStack = [],check = 0;
        for(let s of str){
            if(check ==1 && s !== ',' && s !== ']'){
                tokenStack.push(s);
                continue;
            }else if((check ==1 && s == ',') || s == ']')
                check =0;
            if(this.isQuote(s))
                if(this.selectPushPop(s)&&!this.Stack.length){
                    check = 1;
                    tokenStack.push(s);
                    continue;
                }
            if(this.isSeperator(s) && this.Stack.length === 0){
                let token = tokenStack.join('').trim();
                tokenStack = [];
                if(token !== '') tokenArr.push(token);
                tokenArr.push(s);
                continue;
            }
            tokenStack.push(s);
        }
        return tokenArr;
    }

    decideType(token){
        if (token in this.staticTokenType) {
            return this.staticTokenType[token];
        }
        if(isFinite(Number(token)))
            return "number";
        else
            return "string";

    }

    makeLexer(token){
        const lexer ={
            type : this.decideType(token),
            value : token
        };
        return lexer;
    }

    lexer(tokenArr){
        const lexerArr = [];
        for(let token of tokenArr){
            let lexer = this.makeLexer(token);
            lexerArr.push(lexer);
        }
        console.log(lexerArr);
        return lexerArr;
    }

    checkString(str){
        const begin = str[0];
        const end = str[str.length-1];
        const one = str.match(/'/g);
        const two = str.match(/"/g);
        if((begin =="'" && end =="'" && !(one.length%2)) || (begin =='"' && end =='"' && !(two.length%2)))
            return 0;
        return 1;
    }

    pushTree(type,parseTree,retParseTree){
        parseTree.push({
            type : type,
            child : retParseTree
            });
    }
    pushvalue(type,parseTree,val){
        parseTree.push({
            type : type,
            value : val,
            child : []
            });
    }

    parserCheck(Arr){
        let stack = [], check = 0;
        for(let i=0;i< Arr.length;i++)
            if(i+1 < Arr.length && Arr[i].type === 'number' || Arr[i].type === 'string' || Arr[i].type === 'null' ){
                if(Arr[i+1].type !='comma' && Arr[i+1].type !='Rbracket')
                    return 1;
            }else if(Arr[i].type === 'Lbracket')
                stack.push('[');
            else if(Arr[i].type === 'Rbracket')
                if(stack[stack.length-1] === '['){
                    stack.pop();
                    check = 1;
                }else
                    stack.push(']');
        if(stack.length || !check)
            return 1;
    }

    parser(lexerArr){
        if(this.parserCheck(lexerArr)) return ["입력문장이 잘못되었습니다."];
        return this.parserRun(lexerArr);
    }
    parserRun(lexerArr,start = 0){
        const parseTree = [];
        for( let i = start;i < lexerArr.length;i++){
            const type = lexerArr[i].type, val = lexerArr[i].value;
            if(type === 'Lbracket'){
                const retParseTree =this.parserRun(lexerArr,i+1);
                this.pushTree('array',parseTree,retParseTree.length ? retParseTree[0] : []);
                i = retParseTree[1];
            }else if(type === 'Rbracket'){
                return [parseTree,i];
            }else if(type === 'comma'){
                continue;
            }else if(type === 'string'){
                if(this.checkString(val)) continue;
                this.pushvalue(type,parseTree,val);
            }else if(type === 'number'){
                this.pushvalue(type,parseTree,val);
            }else if(type === 'null'){
                this.pushvalue(type,parseTree,val);
            }
        }
        return parseTree;
    }

    Start(str){
        this.Stack = [];
        this.tokenStack = [];
        return this.parser(this.lexer(this.tokenizer(str)));
    }
};
