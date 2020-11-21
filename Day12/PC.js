const readline = require("readline");
let mysql = require('mysql2');
const { resolve } = require("path");
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'Kang',
    password : 'dhkdlswks124',
    port : '3306',
    database : 'mydb'
});

class PC {
    constructor () {
        this.user_count = 0;
    }

    input=()=>{
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.rl.setPrompt(`> `);
        this.rl.prompt();
        this.processing();        
    }

    checkSeat = () =>{
        return new Promise((resolve, reject) =>{
            let sql = "SELECT * from pc_table;";
            connection.query(sql,(err,result)=>{
                if(err){
                    console.log(err);
                    console.log('pc_table 테이블 조회중 에러 발생');
                }else{
                    let pc_list = [];
                    for(let i=0;i<result.length;i++)
                        result[i]['user_key'] == -1 ? pc_list.push(result[i]['pc_key']) : undefined;
                    resolve(pc_list);
                }
            });
        })
    }

    RandomNum = (length) =>{
        return new Promise((resolve,reject)=>{
            length == 0 ? resolve(-100) : resolve(Math.floor(Math.random()*(length-1)));
        })
    }
    makeDate = () =>{return new Date().toISOString().substring(0,19).replace('T',' ');}

    printNew = (seat,list) =>{
        return new Promise((resolve,rejcet)=>{
            if(seat == -100) resolve();
            console.log(seat.toString()+"번 자리에 앉으세요 : #"+this.user_count.toString());
            let str = ' ';
            list.forEach(x => str += ' '+x.toString()+',');
            console.log('['+str.substring(0,str.length-1)+']\n');
            resolve();
        })
    }

    newTask = (list,RdNum) =>{
        return new Promise((resolve,reject) =>{
            if(RdNum == -100){
                console.log("앉을 자리가 없습니다.\n");
                resolve(-100);
            }else{
                let seat = list[RdNum];
                list.splice(RdNum,1);
                let sql = "insert into user_table(start_time, end_time, pc_num) values(?,?,?);";
                let params = [this.makeDate(),null,seat];
                connection.query(sql,params,(err,result,fields)=>{
                    if(err){
                        console.log(err);
                        console.log('user_table 테이블 입력중 에러 발생');
                    }else{
                        ++this.user_count;
                        sql = "update pc_table SET user_key = ? WHERE pc_key = ?;"
                        params = [this.user_count, seat];
                        connection.query(sql,params,(err,result,fields)=>{
                            if(err){
                                console.log(err);
                                console.log('pc_table 테이블 수정중 에러 발생');
                            }else{
                                resolve(seat);                    
                            }
                        });
                    }
                });
            }
        })
    }

    async new_function(){
        let list = await this.checkSeat();
        let RdNum = await this.RandomNum(list.length);
        let seat = await this.newTask(list,RdNum);
        await this.printNew(seat,list);
    }

    findSeat = (num) =>{
        return new Promise((resolve,reject)=>{
            let sql = 'select * from user_table where user_key = ?;'
            connection.query(sql,[num],(err,result,fields)=>{
                if(err){
                    console.log(err);
                    console.log('user_table 테이블 입력중 에러 발생');
                }else{
                    resolve(result[0]['pc_num']);
                }
            });
        })
    }

    updateUser = (num) =>{
        return new Promise((resolve,reject)=>{
            let sql = 'update user_table SET end_time = ? WHERE user_key = ?;'
            connection.query(sql,[this.makeDate(),num],(err,result,fields)=>{
                if(err){
                    console.log(err);
                    console.log('user_table 테이블 수정중 에러 발생');
                }else{
                    resolve();
                }
            });
        })
    }

    printStop = (list,seat) =>{
        return new Promise((resolve,rejcet)=>{
            console.log("이제 "+seat.toString()+"번 자리가 비었습니다.");
            let str = ' ';
            list.forEach(x => str += ' '+x.toString()+',');
            console.log('['+str.substring(0,str.length-1)+']\n');
            resolve();
        })
    }

    cleanSeat = (seat) =>{
        return new Promise((resolve,reject)=>{
            let sql = 'update pc_table SET user_key = ? WHERE pc_key = ?;'
            connection.query(sql,[-1,seat],(err,result,fields)=>{
                if(err){
                    console.log(err);
                    console.log('pc_table 테이블 수정중 에러 발생');
                }else{
                    let sql = "SELECT * from pc_table;";
                    connection.query(sql,(err,result)=>{
                        if(err){
                            console.log(err);
                            console.log('pc_table 테이블 조회중 에러 발생');
                        }else{
                            let pc_list = [];
                            for(let i=0;i<result.length;i++)
                                result[i]['user_key'] == -1 ? pc_list.push(result[i]['pc_key']) : undefined;
                            resolve(pc_list);
                        }
                    });
                }
            });
        })
    }

    async stop_function(num){
        let seat = await this.findSeat(num);
        await this.updateUser(num);
        let list = await this.cleanSeat(seat);
        await this.printStop(list,seat);
    }
    processing=()=>{
        this.rl.on("line", (line) => {
            line === 'new' ? this.new_function() : this.stop_function(Number(line.split(' ')[1]));
            this.rl.prompt();
        }).on('close', () => {
            process.exit();
        })
    }
}

module.exports = PC;