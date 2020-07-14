function loadLeftMenu(name){
  $.post('http://localhost:3000/severalMenu',{ name : name}).done(function(data){
    if(data.success){
      var tags = '';
      var i =0;
      while(i<data.message.length){
        var item = data.message[i].substr(1);
        item = item.trim();
        var tag = '<li><div><a href="#" style="text-decoration: none;">'+item+'</a></div></li>';
        tags = tags + tag;
        i = i+1;
      }
      $('#load_left').html(tags);
    }
  });
}

function changeClass(name){
  var items = $(".sub_nav > li > div > a");
  for(item of items){
    var check1 = item.innerText.trim();
    if(item.className == "selected"){
      item.className = "courselink";
    }
    if(item.innerText == name)
      item.className = "selected";
  }
}

$.ajax({
    url: 'http://localhost:3000/mainMenu',
    method:'POST'
  }).done(function(data){
    if(data.success){
      var tags = '';
      var i = 0;
      while(i<data.message.length){
        var item = data.message[i].substr(1);
        item = item.trim();
        var retval = data.message[i].trim();
        var tag = '<li><div class="label_public"><a class = "courselink" href="#" style="text-decoration: none;" onclick = "loadLeftMenu(\''+retval+'\');changeClass(\''+item+'\');">'+ item +'</a></div></li>';
        tags = tags+tag;
        i = i+1;
      }
      var a =$('.sub_nav');
      a.append(tags);
    }
  });
