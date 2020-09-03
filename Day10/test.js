const a = [13,214,123,512]
const cs = (l)=>{
 console.log(l)
}
const inter = setInterval(()=>{
    if(!a.length){
        clearInterval(inter);
    }else{
        cs(a.shift())
    }
} , 1000)


const sleep = (delay)=> {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
    
 }