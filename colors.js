var Links = {
  setColor : function(color){
    // var alist = document.querySelectorAll('a');
    // var i = 0;
    // while(i<alist.length){
    //   alist[i].style.color = color;
    //   i = i+1;
    // }
    // ${'a'}.css('color',color);
    $('a').css('color',color);
  }
}
var BODY = {
  setColor : function (color){
    // document.querySelector('body').style.color = color;
    $('body').css('color',color);
  },
  setBackgroundColor : function(color){
    // document.querySelector('body').style.backgroundColor = color;
    $('body').css('backgroundColor',color);
  }
}
function Switch(self){
  var target = document.querySelector('body');
  if(self.value == 'morning'){
    BODY.setColor('white');
    BODY.setBackgroundColor('black');
    self.value = 'night'
    Links.setColor('powderblue');
  }else{
    BODY.setColor('black');
    BODY.setBackgroundColor('white');
    self.value = 'morning'
    Links.setColor('black');
  }
}
