exports.handler = function (event, context, callback) {

    var _body=event.body;
    var jsonstring=  (new Buffer(_body, 'base64')).toString();;
    console.log(jsonstring);
    var jsonobj=JSON.parse(jsonstring);
    getAKSK(jsonobj,callback);
}
 
var urlToken="https://iam.cn-north-1.myhwclouds.com/v3/auth/tokens";
var urlAksk="https://iam.cn-north-1.myhwclouds.com/v3.0/OS-CREDENTIAL/securitytokens";
var postdataToken={
    "auth": {
        "identity": {
        "methods": ["password"],
        "password": {
            "user": {
            "name": "用户名",
            "password": "口令"
            ,
            "domain": {
                "name": "根账号"
            }
            }
        }
        },
        "scope": {
        "domain": {
            "name": "根账号"
        }
        }
    }
};
function getPostdataOfSKSK(token){
    var data={
        "auth": {
            "identity": {
                "methods": [
                    "token"
                ],
                "token": {
                    "id": token,
                    "duration-seconds": "900"
                }
            }
        }
    };  
    return data;
}

function getAKSK(infoobj,callback){
    try {
        post(urlToken,postdataToken,callback,function(data){
            var tokenstr = data.headers["x-subject-token"];
            console.log("Token获取成功！");
            var postdata=getPostdataOfSKSK(tokenstr);
            post(urlAksk,postdata,callback,function(res){
                
                var _data='';
                res.on('data', function(chunk){
                    _data += chunk;
                });
                res.on('end', function(){
                    console.log("AK/SK获取成功！");
                    callback(null,reResponse(_data));
                });
                
                        
            });
                    
        });
        
    } catch (error) {
        var returnmess={"message":error};
        if(callback)
        callback(null,reResponse(JSON.stringify(returnmess)));
    }
    

}
function post(url,data,callback,fn){
    data=data||{};
    var content=JSON.stringify(data);
    var parse_u=require('url').parse(url,true);
    var isHttp=parse_u.protocol=='http:';
    var http=require(isHttp?'http':'https');
    var options={
        host:parse_u.hostname,
        port:parse_u.port||(isHttp?80:443),
        path:parse_u.path,
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Content-Length':Buffer.byteLength(content)
            }
        };
    console.log("post options:\n",options);
    console.log("content:",content);
    console.log("\n");
    var req = http.request(options,function(res){
        if(fn!=null){
            fn(res);
        }
    });
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
        if(callback!=null)
        {
            var returnmess={"message":e.message};
            callback(null,reResponse(JSON.stringify(returnmess)));
        }
    }); 
    req.write(content);
    req.end();
}
function reResponse(data){
    var   response = {
        'statusCode': 200,
        'isBase64Encoded': false,
        'headers': {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': data
    };
    return response;
  } 
