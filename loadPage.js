function fetchPage(name){
  fetch(name).then(function(response){
    response.text().then(function(text){
      $('article').html(text);
      // document.querySelector('article').innerHTML = text;
    })
  });
}
fetch('list').then(function(response){
  response.text().then(function(text){
    var items = text.split(',');
    var tags = '';
    var i =0;
    while(i<items.length){
      var item = items[i];
      item = item.trim();
      var tag = '<li><a href = "#!'+item+'" onclick ="fetchPage(\''+item+'\')">'+item+'</a></li>';
      tags = tags+tag;
      i = i+1;
    }
    var a = $('#navigation').html;
    $('#navigation').append(tags);
    // document.querySelector('#navigation').innerHTML = tags;
  })
});
if(location.hash){
  fetchPage(location.hash.substr(2));
}
