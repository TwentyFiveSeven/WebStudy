function tokenizer(str){
    const operators = ['[',']','{','}',','];
    let _tmpStr = "";
    const tokenArr =[];

    for(let i=0;i<str.length;i++){
        let ch = str[i];

        if(ch === " ") continue;

        if(operators.indexOf(ch) > -1){
            tokenArr.push(ch);
            continue;
        }

        _tmpStr = str.substr(i).match(/^('[^']+')|(\d+)|(null)/);
        if(_tmpStr && (str[i+_tmpStr[0].length] === ',' ||str[i+_tmpStr[0].length] === ']')){
            tokenArr.push(_tmpStr[0]);
            i += _tmpStr[0].length-1;
        }else{
            if(/'\w+.*/.test(str.substr(i))){
                throw new Error("올바른 문자열형태가 아닙니다.");
            }
        }
    }
    return tokenArr;
}

function makeObj({type,value}){
    if(type === "array") return {type, child:[]};
    return{
        type : type,
        value : value,
        child : []
    };
}

function lexer(tokenArr){
    const lexerArr =[];
    for(token of tokenArr){
        if(token === "[")
            lexerArr.push(makeObj({ type : "array"}));
        else if(token === "]")
            lexerArr.push(makeObj({ type : "close", "value" : token}));
        else if(/^'.*'$/.test(token))
            lexerArr.push(makeObj({ type : "string", "value" : token}));
        else if(/\d+/.test(token))
            lexerArr.push(makeObj({ type : "number", "value" : token}));
        else if(token === 'null')
            lexerArr.push(makeObj({ type : "NULL", "value" : token}));
        else if(token === ','){
            lexerArr.push(makeObj({ type : "comma", "value" : token}));
        }
    }
    return lexerArr;
}

checkBracket = (lexerArr => (lexerArr.filter(({type}) => type ==='array').length !=lexerArr.filter(({type}) => type ==='close').length))

function findComma(lexerArr,i){
    if(i+1<lexerArr.length && lexerArr[i+1].type != "comma" && lexerArr[i+1].type != "close")
        throw new Error("콤마가 없습니다.");
}

function parser(lexerArr){
    if(checkBracket(lexerArr))
        throw new Error("괄호가 맞지 않습니다.")
    const result = {tpye : 'root',child : []};
    const parserArr = [];
    for(let i=0;i<lexerArr.length;i++){
        // console.log(lexerV);
        if(lexerArr[i].type ==="array") parserArr.push(lexerArr[i]);
        else if(lexerArr[i].type ==="string" || lexerArr[i].type ==="number" || lexerArr[i].type ==="NULL" ){
            parserArr[parserArr.length-1].child.push(lexerArr[i]);
            findComma(lexerArr,i);
        }
        else if(lexerArr[i].type === "close"){
            const before = parserArr.pop();
            if(!parserArr.length)
                result.child.push(before);
            else{
                parserArr[parserArr.length-1].child.push(before);
                findComma(lexerArr,i);
            }
        }
    }
    return result.child[0];
}

function ArrayParser(str){
    const tokenArr = tokenizer(str);
    const lexerArr = lexer(tokenArr);
    return result = parser(lexerArr);
}
module.exports={ArrayParser};
