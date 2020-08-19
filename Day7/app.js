const {ArrayParser} = require('./ArrayParser2.js');

const main = function(){
    const str = [
        "[[[[2,[5],61],'hell']]]",
        "[1, [2,[3]],'hello', 'world', null]",
        "['1a3',[22,23,[11,[112233],112],55],3d3]"
    ];
    
    const error = [
        "[[1,[2,[3],'hello']]",
        "['1a3,[22,23,[11,[112233],112],55],3d3]",
        "['1a'3',[22,23,[11,[112233],112],55],33]",
        "['wd\'[asdf,1234',null,4]"

    ];

    //정답출력
    str.map((x,i) => {
        const result = new ArrayParser(x);
        console.log("\n\n",i+1,"번째 답은 : ");
        console.dir(result, { depth: null })
    });

    //에러출력
    error.map((x,i) =>{
        try{
            console.log('\n');
            const result = new ArrayParser(x);
            console.log("\n\n",i+1,"번째 답은 : ");
            console.dir(result, { depth: null })
        }catch(e){
            console.log(e);
        }
    });
}

main();