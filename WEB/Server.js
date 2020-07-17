var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var downList = ['/colors.js','/loadMainMenu.js','/Newstyle.css','/banner1.jpg','/icon_allview.png'];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/',function(req,res){
  var _url = req.url;
  var queryData = url.parse(_url, true).query;
  if(queryData.id == undefined){
        _url = '/index.html';
        // console.log('in');
        res.writeHead(200);
        res.end(fs.readFileSync(__dirname+_url));
      }
});

app.post('/readfile',function(req,res){
  console.log("in?");
  fs.readFile(req.body.name, 'utf8', function(err, data){
    res.send({success : true, text : data});
  });
});

app.post('/loadfiles',function(req,res){
  var retlist = [];
  var day = [];
  fs.readdir('./MainMenu/'+req.body.name,function(error,filelist){
    console.log('./MainMenu/'+req.body.name);
    retlist = filelist;
    var i = 0;
    while(i<retlist.length){
      var statV = fs.statSync('./MainMenu/'+req.body.name+'/'+retlist[i]);
      day.push(statV.mtime.toDateString());
      i = i+1;
    }
    console.log(retlist);
    console.log(day);
    res.send({success : true, message : retlist, Mtime : day});
  });
});

app.post('/severalMenu',function(req,res){
  console.log(req.body.name);
  fs.readdir('./MainMenu/'+req.body.name,function(error,filelist){
    console.log('what');
    console.log(filelist);
    res.send({success : true, message : filelist});
  });
});

app.post('/mainMenu',function(req,res){
  console.log("checking");
  fs.readdir('./MainMenu',function(error,filelist){
    console.log('what');
    console.log(filelist);
    res.send({success : true, message : filelist});
  });
});

app.get(downList[0],function(req,res){
  res.end(fs.readFileSync(__dirname+downList[0]));
});

app.get(downList[1],function(req,res){
  res.end(fs.readFileSync(__dirname+downList[1]));
});

app.get(downList[2],function(req,res){
  res.end(fs.readFileSync(__dirname+downList[2]));
});
app.get(downList[3],function(req,res){
  res.end(fs.readFileSync(__dirname+downList[3]));
});
app.get(downList[4],function(req,res){
  res.end(fs.readFileSync(__dirname+downList[4]));
});
app.listen(3000);
// var app = http.createServer(function(request,response){
//   var _url = request.url;
//   console.log(url);
//   var queryData = url.parse(_url, true).query;
//   var path = url.parse(_url, true).pathname;
//   console.log(queryData.id);
//   if(path == '/'){
//     if(queryData.id == undefined){
//       _url = '/index.html';
//       // console.log('in');
//       response.writeHead(200);
//       response.end(fs.readFileSync(__dirname+_url));
//     }else if(queryData.id == 'mainMenu'){
//       console.log('check');
//       // fs.readdir('/MainMenu',function(error,filelist){
//       //   response.end(filelist);
//         // response.set(‘Content-Type’, ‘text/plain’);
//         // response.send({success : true, message : filelist});
//         var jsonData = "";
//
//    request.on('data', function (chunk){
//        jsonData += chunk;
//    });
//
//    request.on('end', function(){
//        var reqObj = JSON.parse(jsonData);
//        var resObj = {
//            message : "HELLO " + reqObj.name,
//            question: "ARE YOU A GOOD " + reqObj.occupation + "?"
//        };
//        response.writeHead(200);
//        response.end(JSON.stringify(resObj));
//       // });
//     });
//     }
//   }else if(_url =='/favicon.ico'){
//     // console.log('why');
//     return response.writeHead(404);
//     response.end();
//   }
//   else{
//     // console.log('what : '+ _url);
//     response.writeHead(200);
//     response.end(fs.readFileSync(__dirname+_url));
//   }
// });
// if(_url =='/requestMenu'){
//   response.writeHead(200);
//   // fs.readdir('/MainMenu',function(error, filelist){
//   //   response.send({success: true, message : filelist});
//   // });
//   response.writeHead(302, {Location: '/index.html'});
//   response.end();
// }
