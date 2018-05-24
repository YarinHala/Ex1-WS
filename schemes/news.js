var mongoose = require('mongoose');
    Schema   = mongoose.Schema;


/*news schema this is the second doc!*/

news = new mongoose.Schema({
    _dateT:{
        type: String,
        index: 1,
        required: true,
    },
    _topic:{
        type: String , 
        required: true
    },

},{collection : 'twitterNews'});



/*export scema*/
module.exports = news;