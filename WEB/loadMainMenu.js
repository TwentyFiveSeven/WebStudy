function readfile(name){
  console.log(name);
  $.post('http://localhost:3000/readfile',{name : name}).done(function(data){
    if(data.success){
      $('article').html(data.text);
    }
  })
  // console.log(name);
  // fetch(name).then(function(response){
  //   response.text().then(function(text){
  //     $('article').html(text);
  //   });
  // });
}

function loadfiles(name){
  $.post('http://localhost:3000/loadfiles',{name : name}).done(function(data){
    if(data.success){
      var tags = '';
      var i = 0;
      while(i<data.message.length){
        var item = data.message[i];
        var mDate = data.Mtime[i];
        var tag = '<tr><td><a href="# style="text-decoration:none;" onclick ="readfile(\''+'./MainMenu/'+name+'/'+item+'\')">'+item+'</a></td><td>opo</td><td>'+mDate+'</td></tr>';
        tags = tags + tag;
        i++;
      }
      console.log(tags);
      $('#fileList').html(tags);
    }
  });
}

function loadLeftMenu(name){
  $.post('http://localhost:3000/severalMenu',{ name : name}).done(function(data){
    if(data.success){
      var tags = '';
      var i =0;
      while(i<data.message.length){
        var item = data.message[i].substr(1);
        item = item.trim();
        var retval = data.message[i].trim();
        var tag = '<li><div><a href="#" style="text-decoration: none;" onclick ="loadfiles(\''+name+'/'+retval+'\')">'+item+'</a></div></li>';
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
