const nodeMap = {
  abcd: {
    id: 'abcd',
    title: '제목1',
    time: 12,
  },
  afbc: {
    id: 'afbc',
    title: '제목2',
    time: 1,
  },
  bdfa: {
    id: 'bdfa',
    title: '제목3',
    time: 7,
  },
  afaf: {
    id: 'afaf',
    title: '제목4',
    time: 4,
  },
  abab: {
    id: 'abab',
    title: '제목5',
    time: 9,
  },
  acdc: {
    id: 'acdc',
    title: '제목6',
    time: 15,
  },
  bdbd: {
    id: 'bdbd',
    title: '제목7',
    time: 2,
  },
  baaa: {
    id: 'baaa',
    title: '제목8',
    time: 3,
  },
  cafe: {
    id: 'cafe',
    title: '제목9',
    time: 14,
  },
  ccef: {
    id: 'ccef',
    title: '제목10',
    time: 10,
  },
  afcd: {
    id: 'afcd',
    title: '제목11',
    time: 12,
  },
  fabc: {
    id: 'fabc',
    title: '제목12',
    time: 4,
  },
  dcba: {
    id: 'dcba',
    title: '제목13',
    time: 1,
  }
}

class Node{
  constructor({title, id, time}){
    this.element = {
      title,
      id,
      time,
    };
    this.next = null;
  }
}
class LinkedList{
  constructor(){
    this.cnt = 0;
    this.totalTime = 0;
    this.head = null;
    this.tail = null;
  }
  add(item) {
    let newNode = new Node(item);
    let currNode = this.tail;
    if (!(this.head)) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      currNode.next = newNode;
      this.tail = newNode;
    }
    this.cnt += 1;
    this.totalTime += item.time;
    this.display();
  }
  insert(newElement, idx){
    let newNode = new Node(newElement);
    if (!(this.head)) {
      this.head = newNode;
    } else {
      if (idx == 0) {
        const currNode = this.head;
        this.head = newNode;
        newNode.next = currNode;
      } else if (idx >= this.cnt) {
        this.tail.next = newNode;
        this.tail = newNode;
      } else {
        let pos = 0;
        let current = this.head;
        while(true) {
          pos += 1
          if (pos == idx){
            break;
          }
          current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
      }
    }
    this.cnt += 1;
    this.totalTime += newNode.element.time;
    this.display();
  }
  display(){
    let currNode = this.head;
    let string = '|---';
    while(!(currNode.next == null)){
      string += '[' + currNode.element.id + ', ' + currNode.element.time + 'sec' + ']' + '---';
      currNode = currNode.next;
    }
    string += '[' + currNode.element.id + ', ' + currNode.element.time + 'sec' + ']' + '---[end]';
    console.log(string);
  }
  findPrevious(id){
    let currNode = this.head;
    while(!(currNode.next == null) && (currNode.next.element.id != id)){
      currNode = currNode.next;
    }
    return currNode;
  }
  find(id){
    let currNode = this.head;
    while(currNode.element.id != id){
      currNode = currNode.next;
    }
    return currNode;
  }
  delete(id){
    let removeNode = this.find(id);
    let prevNode = this.findPrevious(id);
    if(!(prevNode.next == null)){
      prevNode.next = prevNode.next.next;
    }
    this.cnt -= 1;
    this.totalTime -= removeNode.element.time;
    this.display();
  }
  render(){
    console.log('영상클립 : ', this.cnt, '개')
    console.log('전체길이 : ', this.totalTime, 'sec')
  }
}
   
console.log('------영상클립------')
for(let i in nodeMap) {
  console.log(nodeMap[i].title + '(' + nodeMap[i].id + ')' + ' : ' + nodeMap[i].time)
}

function editor(command, ...data) {
  if (command === 'add') {
    if (!(nodeMap[data[0]])) {
      console.log('없는 영상입니다.');
    } else {
      if (data[1]) {
        console.log('잘못된 명령어 입니다.');
      } else {
        linked.add(nodeMap[data[0]]);
      }
    }
  } else if (command ==='insert') {
    if (!(nodeMap[data[0]])) {
      console.log('없는 영상입니다.');
    } else {
      if (!(data[1])) {
        console.log('잘못된 명령어 입니다.');
      } else {
        linked.insert(nodeMap[data[0]], data[1]);
      }
    }
  } else if (command === 'delete') {
    linked.delete(nodeMap[data[0]].id);
  } else if (command === 'render') {
    linked.render();
  } else {
    console.log('잘못된 명령어 입니다.')
  }
}
const linked = new LinkedList();
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('line', function (input) {
    input = input.split(' ')
    editor(...input)
  })
  .on('close', function () {
    process.exit();
});