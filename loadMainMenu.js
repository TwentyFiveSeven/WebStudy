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

fetch('MainMenuList').then(function(response){
  response.text().then(function(text){
    var items = text.split(',');
    var tags = '';
    var i = 0;
    while(i<items.length){
      var item = items[i];
      item = item.trim();
      var tag = '<li><div class="label_public"><a class = "courselink" href="#" style="text-decoration: none;" onclick = "changeClass(\''+item+'\')">'+ item +'</a></div></li>';
      tags = tags+tag;
      i = i+1;
    }
    var a =$('.sub_nav');
    a.append(tags);
  })
});
