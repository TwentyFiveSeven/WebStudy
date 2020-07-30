const readline = require('readline-sync');

//각 Storage안에서 값을 저장하기위한 LinkedList
let LinkedList = function (){
    let list = {}; //LinkedList를 위한 list 객체
    list.head = null;
    list.tail = null;
    list.size = 0;
    return list;
};

//객체를 만들어 반환한다.
let Node = function(k,v){
    let node ={};
    node.k = k;
    node.v = v;
    node.next = null;
    return node; //node 객체를 반환한다.
};

//HashMap을 생성합니다.
let HashMap = function () {
    this.bucket_size = 8;
    this.storage = Array(this.bucket_size);
}

//가장처음 HashMap의 각 Storage안에 LinkedList를 할당합니다.
HashMap.prototype.make = function () {
    for(let i = 0; i < this.storage.length; i++)
        this.storage[i] = new LinkedList();
};

//HashMap 전체를 초기화합니다.
HashMap.prototype.clear = function () {
    for(let i = 0; i < this.storage.length; i++)
        this.storage[i] = new LinkedList();
};

//해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
HashMap.prototype.contains = function (k) {
    let key = this.HashValue(k);
    let now = this.storage[key].head;
    while(now){
        if(now.k == k)
            return true;
        now = now.next;
    }
    return false;
};

//해당 키와 매치되는 값을 찾아서 리턴한다. 없으면 null을 리턴
HashMap.prototype.getValue = function (k) {
    let key = this.HashValue(k);
    let now = this.storage[key].head;
    if(!this.contains(k)){
        return null;
    }
    while(now){
        if(now.k == k)
            return now.v;
        now = now.next;
    }
};

//비어있는 맵인지 Bool 결과를 리턴한다.
HashMap.prototype.isEmpty = function () {
    for(let i=0;i<this.bucket_size;i++)
        if(this.storage[i].size)
            return false;
    return true;
};

//전체 키 목록을[String]배열로 리턴한다.
HashMap.prototype.keys = function () {
    let Keylist = [];
    for(let i=0;i<this.bucket_size;i++){
        let now = this.storage[i].head;
        while(now){
            Keylist.push(now.k);
            now = now.next;
        }
    }
    return Keylist;
};

//키-값을 추가한다. 기존에 Key가 이미 있으면 추가하지 않는다.
HashMap.prototype.put = function (k, v) {
    let key = this.HashValue(k);
    let now = this.storage[key].head;
    if(!now){
        this.storage[key].head = new Node(k,v);
        this.storage[key].tail = this.storage[key].head;
        this.storage[key].size +=1;
        return "입력완료";
    }else{
        while(now){
            if(now.k == k)
                break;
            now = now.next;
        }
        if(!now){
            let node = new Node(k,v);
            this.storage[key].tail.next = node;
            this.storage[key].tail = node;
            this.storage[key].size +=1;
        }
    }
};

//해당 키에 있는 값을 삭제한다. 기존에 key가 없으면 아무것도 하지 않는다.
HashMap.prototype.remove = function (k) {
    if(!this.contains(k)){
        return;
    }
    let key = this.HashValue(k);
    let now = this.storage[key].head;
    let before = null;
    while(now){
        if(now.k == k){
            if(before){
                before.next = now.next;
                if(!now.next) this.storage[key].tail = before;
                now.next = null;
                now = null;
                this.storage[key].size -=1;
            }else{
                let temp = this.storage[key].head;
                this.storage[key].head = this.storage[key].head.next;
                this.storage[key].size -=1;
            }
            break;
        }
        before = now;
        now = now.next;
    }
};

//키-값으로 기존 값을 대체한다. 만약 기존에 key가 없으면 새로 추가한다.
HashMap.prototype.replace = function (k, v) {
    let key = this.HashValue(k);
    let now = this.storage[key].head;
    if(!now){
        this.storage[key].head = new Node(k,v);
        this.storage[key].tail = this.storage[key].head;
        this.storage[key].size +=1;
    }else{
        while(now){
            if(now.k == k)
                break;
            now = now.next;
        }
        if(!now){
            let node = new Node(k,v);
            this.storage[key].tail.next = node;
            this.storage[key].tail = node;
            this.storage[key].size +=1;
        }else{
            now.v = v;
        }
    }
};

//전체 아이템 개수를 리턴한다.
HashMap.prototype.size = function () {
    let size = 0;
    for(let i=0;i<this.bucket_size;i++)
        size += this.storage[i].size;
    return size;
};

//입력한 문자열을 해시값으로 반환한다.
HashMap.prototype.HashValue = function (k) {
    let p = 0;
    for(let i = 0; i<k.length;i++)
        p += k.charCodeAt(i);
    return p%this.bucket_size;
};

module.exports = HashMap