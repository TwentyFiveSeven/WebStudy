var http = require('http');
$.ajax({
    url: 'http://localhost:3000/?id=mainMenu',
    method:'POST'
  }).done(function(data){
    if(data.success){
      console.log(data.message);
    }
  });

// fs.readdir(path, function(error, filelist){
//   var tags = '';
//   var i = 0;
//   while(i<items.length){
//     var item = filelist[i];
//     item = item.trim();
//     var tag = '<li><div class="label_public"><a class = "courselink" href="#" style="text-decoration: none;" onclick = "changeClass(\''+item+'\');loadLeftMenu(\''+item+'\')">'+ item +'</a></div></li>';
//     tags = tags+tag;
//     i = i+1;
//   }
//   var a =$('.sub_nav');
//   a.append(tags);
// });
function changeClass(name){
  // console.log(obj);
  // console.log(obj.innerText);
  // console.log(obj.className);
  var items = $(".sub_nav > li > div > a");
  console.log(items);
  for(item of items){
    var check1 = item.innerText.trim();
    // var check2 = obj.innerText.trim();
    console.log("itme.text : "+check1 + ", item className : "+item.className);
    if(item.className == "selected"){
      item.className = "courselink";
    }
    if(item.innerText == name)
      item.className = "selected";
  }
}
function loadLeftMenu(name){
  var str = name + "_left_menu";
  fetch(str).then(function(response){
    response.text().then(function(text){
      var items = text.split(',');
      var tags = '';
      var i =0;
      while(i<items.length){
        var item = items[i];
        item = item.trim();
        var tag = '<li><div><a href="#" style="text-decoration: none;">'+item+'</a></div></li>';
        tags = tags + tag;
        i = i+1;
      }
      $('#load_left').html(tags);
      // console.log(tags);
      // a.html = tags;
    })
  });
}
//
// fetch('MainMenuList').then(function(response){
//   response.text().then(function(text){
//     var items = text.split(',');
//     var tags = '';
//     var i = 0;
//     while(i<items.length){
//       var item = items[i];
//       item = item.trim();
//       var tag = '<li><div class="label_public"><a class = "courselink" href="#" style="text-decoration: none;" onclick = "changeClass(\''+item+'\');loadLeftMenu(\''+item+'\')">'+ item +'</a></div></li>';
//       tags = tags+tag;
//       i = i+1;
//     }
//     var a =$('.sub_nav');
//     a.append(tags);
//   })
// });
