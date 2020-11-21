let mysql = require('mysql');
const word = require('./word.js');

const makeNickname = () =>{
    const rdNum = Math.floor(Math.random()*99);
    const rdString = Math.random().toString(36).substr(2,3);
    let rdFournum = Math.random();
    while(rdFournum <1000) rdFournum = rdFournum*10;
    let nickname = word[rdNum]+rdString+Math.floor(rdFournum).toString();
    return nickname;
}

const makeMoney = () =>{
    return Math.floor((Math.random()*(100000-1))+1);
}

Date.prototype.addDays = () =>{
    let date = new Date('2020-07-15');
    date.setDate(date.getDate()+Math.floor(Math.random()*30));
    date.setHours(date.getHours()+Math.floor(Math.random()*23));
    date.setMinutes(date.getMinutes()+Math.floor(Math.random()*59));
    date.setSeconds(date.getSeconds()+Math.floor(Math.random()*59));
    return date;
}
const makeDate = () =>{
    let date = new Date();
    date = date.addDays();
    return date.toISOString().substring(0,19).replace('T',' ');
}

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'Kang',
    password : 'dhkdlswks124',
    port : '3306',
    database : 'mydb'
});


// let sql = "SELECT * from user_log;";
let sql = "insert into user_log(nickname,money,last_visit) values"+"(?,?,?),".repeat(10000);
const addmysql = (nickname,money,date,i) =>{
    let params = [nickname,money,date];
    connection.query(sql,params,(err,rows,fields)=>{
        if(err){
            console.log('i :',i);
            console.log(err);
            console.log('posts 테이블 조회중 에러 발생');
        }else{
            console.log('i :',i);
        }
    });
}
const startProgram = () =>{
    let list = [];
    for(let i=0;i<100000;i++){
        let nickname = makeNickname();
        let money = makeMoney();
        let date = makeDate();
        list.push(nickname);
        list.push(money);
        list.push(date);
    }
    for(let i=0;i<10;i++){
        addmysql();
    }
}

startProgram();
connection.end();
