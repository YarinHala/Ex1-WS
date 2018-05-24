var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;
    news       = require('./news'); 

/*twitter news schema*/
var twitterNews = new mongoose.Schema({

    _newsID: {
        type: Number,
        index: 1,
        required: true,
    },
    _newsName: {
        type: String , 
        required: true
    },
    dates : [String],
    news : [news]
},{collection : 'twitterNews'})




/*export scema*/
var twitterNews = mongoose.model('TwitterNews' , twitterNews);
module.exports = twitterNews;