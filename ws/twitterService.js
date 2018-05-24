var _twitterNews = require('../schemes/twitterNews'),
    consts   = require('../consts'),
    //Import the mongoose module
    mongoose = require('mongoose'),
    //Set up default mongoose connection
    mongoDB = consts.MLAB_KEY;


console.log('connect to db');
mongoose.connect(mongoDB);


mongoose.Promise = global.Promise;

/*Get connection*/
var db = mongoose.connection;

/*Bind connection with error event*/
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = class twitterService{
    
    /*Return all data of twitter news from (mlab)db*/
    getAllNews(){
        return new Promise((resolve , reject)=>{
            _twitterNews.find({} , (err , data)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
                    console.log('getAllnews:\n' + data);
                    resolve(data);
                }
            });
        });

    }


     /*Return all data of twitter news by newsID from (mlab)db*/   
     getNewsByID(newsID){
        return new Promise((resolve , reject)=>{
            console.log(newsID);
            _twitterNews.find({_newsID : newsID} , (err , data)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
                    console.log('getNewsByID:\n');
                    resolve(data);
                }
            });
        });
  
    }
 
    /*Return all data of twitter news by newsID and date from (mlab)db*/   
    getNewsByDate(newsID , dateT){
      return new Promise((resolve , reject)=>{
        console.log(newsID , dateT);
            _twitterNews.find({
                    '_newsID': newsID ,
                     'news._date' : dateT } ,'news', (err , data)=>{
                if(err){
                    reject(`error : ${err}`);
                }else{
                    var news =  JSON.parse(JSON.stringify(data));
                        news = getObjects(news , '_dateT' , dateT);
                        
                    console.log('getNewsByDate:\n' + news);
                    resolve(data);
                }
            });
        });
    }


}

/*
*  function from : https://gist.github.com/iwek/3924925#file-find-in-json-js-L23
*  return an array of objects according to key, value, or key and value matching
*/
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));    
        } else 
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}