const CPU = require('./CPU.js');

describe('CPU TEST', function() {
    let input = "";
    it('첫번째 테스트', function(done) {
        input = "MOV R2, #0\nADD R1, R2, #30\nADD R2, R1, #0\nADD R3, R2, #0\nADD R4, R3, #0\nADD R5, R4, #0\nADD R6, R5, #0\nADD R7, R6, #0";
        answer = [30, 30, 30, 30, 30, 30, 30];
        console.log(input);
        CPU.input(input);
        let result = CPU.dump();
        if(JSON.stringify(result) === JSON.stringify(answer)){
            CPU.reset();
            done();
        }else{
            throw Error('정답 [30, 30, 30, 30, 30, 30, 30]와 다릅니다.');
        }
    });

    it('두번째 테스트', function(done) {
        input = "MOV R1, #7\nMOV R2, #3\nMOV R3, #0\nMOV R4, #0\nMOV R5, #0\nMOV R6, #0\nMOV R7, #0\nAND R3, R1, R2";
        answer = [7, 3, 3, 0, 0, 0, 0];
        console.log(input);
        CPU.input(input);
        let result = CPU.dump();
        if(JSON.stringify(result) === JSON.stringify(answer)){
            CPU.reset();
            done();
        }else{
            throw Error('정답 [7, 3, 3, 0, 0, 0, 0]와 다릅니다.');
        }
    });

    it('세번째 테스트', function(done) {
        input = "MOV R1, #20\nMOV R2, #30\nSTORE R1, R2, #30\nSTORE R2, R1, #30\nLOAD R3, R1, #30\nLOAD R4, R2, R2\nMOV R5, #0\nMOV R6, #0\nMOV R7, #0";
        answer = [20, 30, 30, 20, 0, 0, 0];
        console.log(input);
        CPU.input(input);
        let result = CPU.dump();
        if(JSON.stringify(result) === JSON.stringify(answer)){
            CPU.reset();
            done();
        }else{
            throw Error('정답 [20, 30, 30, 20, 0, 0, 0]와 다릅니다.');
        }
    });

    it('네번째 테스트', function(done) {
        input = "MOV R1, #1\nMOV R2, #6\nMOV R3, #0\nMOV R4, #0\nMOV R5, #0\nMOV R6, #0\nMOV R7, #0\nOR R3, R1, R2";
        answer = [1, 6, 7, 0, 0, 0, 0];
        console.log(input);
        CPU.input(input);
        let result = CPU.dump();
        if(JSON.stringify(result) === JSON.stringify(answer)){
            CPU.reset();
            done();
        }else{
            throw Error('정답 [1, 6, 7, 0, 0, 0, 0]와 다릅니다.');
        }
    });
});
