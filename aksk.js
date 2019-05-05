exports.handler = function (event, context, callback) {

    var _body=event.body;
    var jsonstring=  (new Buffer(_body, 'base64')).toString();;
    console.log(jsonstring);
    var jsonobj=JSON.parse(jsonstring);
    init(jsonobj,callback);
}
 
